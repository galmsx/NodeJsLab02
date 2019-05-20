export interface IBook{
    bookId : number;
    readerId : number;
    book : string;
    date : string;
    howLong? : string;
}
export interface ILibrary{
    id : number;
    books : IBook[];
}
export interface ILibraryData{
    libraries : ILibrary[];
}
export interface ILibraryModel{
    getLibraryById(id : number) : ILibrary;
    getAlllibraries() : ILibrary[];
    saveData() : Promise<void>;

}