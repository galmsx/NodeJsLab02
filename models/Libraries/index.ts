import {ILibrary,ILibraryData,ILibraryModel} from './library.model.interfaces';
import * as fs from 'fs';
import {promisify} from 'util';

var writeFile = promisify(fs.writeFile);

export default class LibraryModel implements ILibraryModel{
    private LibrariesData : ILibraryData;
    constructor(){
        this.LibrariesData = this.getData();

    }
    getLibraryById(id : number) : ILibrary{
        return this.LibrariesData.libraries.find(e=>e.id == id);
    }
    getAlllibraries() : ILibrary[]{
        return this.LibrariesData.libraries;
    }
    private getData() : ILibraryData{
        return JSON.parse(fs.readFileSync("./models/Libraries/libraries.json","utf-8"));
    }
    saveData() : Promise<void>{
        return writeFile("./models/Libraries/libraries.json",JSON.stringify(this.LibrariesData));

    }
   
}