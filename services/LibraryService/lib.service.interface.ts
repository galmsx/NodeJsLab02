import { IBook, ILibrary } from '../../models/Libraries/library.model.interfaces';
export interface ILibService{
    getLibrarysReaderBookList(libId: number, readerId: number): Promise<IBook[]>;
    getAllReaders(libId: number): Promise<IBook[]>;
    delBookRent(bookId: number): Promise<void>;
    createLibrary(): Promise<void>;
    getLibrariesList(): ILibrary[];
    deleteLibrary(id: number): Promise<void>
}