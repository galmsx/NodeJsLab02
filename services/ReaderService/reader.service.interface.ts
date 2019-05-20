import {IBook, ILibrary} from '../../models/Libraries/library.model.interfaces';
import { IReader } from '../../models/Reader/reader.model.interfaces';
export interface IReaderService{
    setRentToReader(libId : number, readerId : number,book :string) : Promise<void>;
    getReaderById(id : number) : IReader;
    getReaderBooks(id : number): Promise<IBook[]>;
    apdateReaderName(id : number, name : string) : Promise<void>;
    createReader(name : string) : Promise<void>;
    getReadersList() : IReader[];
    deleteReader(id : number) : Promise<void>;
    delBookRent(bookId : number) : Promise<void>;


}