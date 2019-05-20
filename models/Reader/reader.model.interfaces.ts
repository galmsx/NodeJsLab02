export interface IReader{
    id : number;
    name : string;
    libraries : number[];
}

export interface IReaderData{
    readers : IReader[];
}

export interface IReaderModel{
    
    getNameById( id : number) : string;
    findById(id : number) : IReader;
    saveData() : Promise<void>;
    getAllReaders() : IReader[];
  
}