
import { IReader } from '../../models/Reader/reader.model.interfaces';
import ReaderModel from '../../models/Reader';
import LibraryModel from '../../models/Libraries';
import { IBook, ILibrary } from '../../models/Libraries/library.model.interfaces';
import { IReaderService } from './reader.service.interface';


export class ReaderService implements IReaderService {
    private readerModel: ReaderModel;
    private libraryModel: LibraryModel;
    private isUniqueId(id: number): boolean {
        if (this.readerModel.getAllReaders().find(e => e.id == id))
            return false;

        return true;
    }
    private getUniqueId(): number {
        var id: number = 1;
        while (!this.isUniqueId(id)) {
            id = Math.floor(Math.random() * (999 - 1)) + 1;
        }
        return id;
    }
    private isUniqueBookId(id: number): boolean {
        var isUnique: boolean = true;
        this.libraryModel.getAlllibraries().forEach(el => {
            if (el.books.find(e => e.bookId == id)) isUnique = false;
        });
        return isUnique;
    }
    private getUniqueBookId(): number {
        var id: number = 1;
        while (!this.isUniqueBookId(id)) {
            id = Math.floor(Math.random() * (999 - 1)) + 1;
        }
        return id;
    }
    private readersBookAmount(readerId: number): number {
        var amount: number;
        amount = 0;
        this.libraryModel.getAlllibraries().forEach(el => {
            amount += el.books.filter(e => e.readerId == readerId).length;
        });
        return amount;
    }

    constructor() {
        this.readerModel = new ReaderModel();
        this.libraryModel = new LibraryModel();
    }



    async setRentToReader(libId: number, readerId: number, book: string): Promise<void> {

        if (this.readersBookAmount(readerId) == 15) return Promise.reject(new Error("too much books"));
        if (!this.libraryModel.getLibraryById(libId)) return Promise.reject(new Error("library doesnot exist"));
        if (!this.readerModel.findById(readerId)) return Promise.reject(new Error("reader doesnot exist"));

        this.libraryModel.getLibraryById(libId).books.push({
            bookId: this.getUniqueBookId(),
            readerId,
            book,
            date: new Date().toISOString()
        });
        if (!this.readerModel.findById(readerId).libraries.includes(libId))
            this.readerModel.findById(readerId).libraries.push(libId);
        await this.readerModel.saveData();
        return this.libraryModel.saveData();

    }

    getReaderById(id: number): IReader {
        return this.readerModel.findById(id);
    }
    async getReaderBooks(id: number): Promise<IBook[]> {
        var books: IBook[] = [];
        var libs: ILibrary[] = this.libraryModel.getAlllibraries();
        var reader: IReader = this.readerModel.findById(id);
        if (!reader) return Promise.reject(new Error("reader does not exist"));
        libs = libs.filter(l => reader.libraries.includes(l.id));
        libs.forEach(lib => {
            books = books.concat(lib.books.filter(b => b.readerId = id));
        })
        return Promise.resolve(books.map(b => {
            var date1 = new Date().getTime();
            var date2 = new Date(b.date).getTime();
            b.howLong = ((Math.ceil((date2 - date1) / 8.64e7) * -1) + 1).toString();
            return b;
        }))

    }
    apdateReaderName(id: number, name: string): Promise<void> {
        var reader: IReader = this.readerModel.findById(id);
        if (!reader) return Promise.reject(new Error('reader doesnot exist'));
        reader.name = name;
        return this.readerModel.saveData();
    }

    createReader(name: string): Promise<void> {
        this.readerModel.getAllReaders().push({
            id: this.getUniqueId(),
            name,
            libraries: []
        });
        return this.readerModel.saveData();

    }
    getReadersList(): IReader[] {
        return this.readerModel.getAllReaders();
    }
    deleteReader(id: number): Promise<void> {
        var readers: IReader[] = this.readerModel.getAllReaders();
        var index: number = readers.indexOf(readers.find(r => r.id == id));
        if (index == -1) return Promise.reject(new Error("reader does not exist"));
        readers.splice(index, 1);
        return this.readerModel.saveData();
    }
    delBookRent(bookId: number): Promise<void> {
        //all books have unique id
        var lib: ILibrary = this.libraryModel.getAlllibraries().find(lib => lib.books.find(b => b.bookId == bookId) != undefined);
        if (!lib) return Promise.reject(new Error("book does not exist"));
        lib.books = lib.books.filter(b => b.bookId != bookId);
        return this.libraryModel.saveData();
    }


}