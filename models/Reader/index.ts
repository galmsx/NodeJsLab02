import {IReaderData, IReaderModel, IReader} from './reader.model.interfaces';
import * as fs from 'fs';
import {promisify} from 'util';

var writeFile = promisify(fs.writeFile);

export default class ReaderModel implements IReaderModel{
   private ReaderData : IReaderData;
    constructor(){
        this.ReaderData = this.getData();

    }
    getNameById(id : number) : string {
        return this.ReaderData.readers.filter((e=>e.id == id))[0].name;
    }
    findById(id : number) : IReader{//находит читателя по id
      return  this.ReaderData.readers.find((e)=>e.id == id);
    }
    getAllReaders() : IReader[]{
        return this.ReaderData.readers;
    }
    private getData() : IReaderData{ //читает json
        return JSON.parse(fs.readFileSync("./models/Reader/readers.json","utf-8"));
    }
    saveData(): Promise<void>{ //cсохраняет изменения в json
       return writeFile("./models/Reader/readers.json",JSON.stringify(this.ReaderData));
    }
    
}