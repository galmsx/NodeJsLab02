import { IncomingMessage, ServerResponse } from "http";
import {del} from './delete';
import {get} from './get';
import {post} from './post';


export var libraryRouter = async (req : IncomingMessage ,res : ServerResponse)=>{
   switch(req.method){
       case "GET" : await get(req,res); break;
       case "POST" : await post(req,res); break;
       case "DELETE" : await del(req,res); break;
       default : res.emit("error");
   }

}