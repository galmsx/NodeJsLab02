 import {ReaderService} from '../../services/ReaderService'
 export class ReaderController{
     private readerService : ReaderService;
     constructor(){
         this.readerService = new ReaderService();
     }
 }