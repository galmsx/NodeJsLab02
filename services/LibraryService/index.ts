
import LibraryModel from '../../models/Libraries';
import ReaderModel from '../../models/Reader';
import { IBook, ILibrary } from '../../models/Libraries/library.model.interfaces';
import {ILibService} from './lib.service.interface';

export class LibraryService implements ILibService {
    private libraryModel: LibraryModel;
    private readerModel: ReaderModel;

    private isUniqueLibId(id: number): boolean {
        if (this.libraryModel.getAlllibraries().find(e => e.id == id)) return false;
        return true;
    }
    private getUniqueLibId() {
        var id: number = 1;
        while (!this.isUniqueLibId(id)) {
            id = Math.floor(Math.random() * (999 - 1)) + 1;
        }
        return id;
    }
    constructor() {
        this.libraryModel = new LibraryModel();
        this.readerModel = new ReaderModel();
    }


    getLibrarysReaderBookList(libId: number, readerId: number): Promise<IBook[]> {
        var lib: ILibrary = this.libraryModel.getLibraryById(libId);
        if (!lib) return Promise.reject(new Error("lib dotsnot exist"));

        return Promise.resolve(lib.books.filter(e => e.readerId == readerId)
            .map(b => {
                var date1 = new Date().getTime();
                var date2 = new Date(b.date).getTime();
                b.howLong = ((Math.ceil((date2 - date1) / 8.64e7) * -1) + 1).toString();
                return b;
            }));
    };
    getAllReaders(libId: number): Promise<IBook[]> {
        var lib: ILibrary = this.libraryModel.getLibraryById(libId);
        if (!lib) return Promise.reject(new Error("lib dotsnot exist"));
        return Promise.resolve(lib.books.map(b => {
            var date1 = new Date().getMilliseconds();
            var date2 = new Date(b.date).getMilliseconds();
            b.howLong = Math.ceil((date2 - date1) / 8.64e7).toString();
            return b;
        }));

    }
    delBookRent(bookId: number): Promise<void> {
        //all books have unique id
        var lib: ILibrary = this.libraryModel.getAlllibraries().find(lib => lib.books.find(b => b.bookId == bookId) != undefined);
        if (!lib) return Promise.reject(new Error("book does not exist"));
        lib.books = lib.books.filter(b => b.bookId != bookId);
        return this.libraryModel.saveData();
    }

    createLibrary(): Promise<void> {
        this.libraryModel.getAlllibraries().push({
            id: this.getUniqueLibId(),//дописать
            books: []
        });
        return this.libraryModel.saveData();

    }
    getLibrariesList(): ILibrary[] {
        return this.libraryModel.getAlllibraries();
    }
    async deleteLibrary(id: number): Promise<void> {
        var libs: ILibrary[] = this.libraryModel.getAlllibraries();
        var index: number = libs.indexOf(libs.find(l => l.id == id));
        if (index == -1) return Promise.reject(new Error("library does not exist"));
        libs.splice(index, 1);

        this.readerModel.getAllReaders().forEach(reader => {
            reader.libraries = reader.libraries.filter(lib => lib != id);
        });
        await this.readerModel.saveData();
        return this.libraryModel.saveData();
    }

}