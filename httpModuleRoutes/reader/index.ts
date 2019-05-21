import { IncomingMessage, ServerResponse } from "http";
import {del} from './delete';
import {get} from './get';
import {patch} from './patch';
import {post} from './post';


export var ReaderRouter = async (req : IncomingMessage ,res : ServerResponse)=>{
   switch(req.method){
       case "GET" : return await get(req,res); break;
       case "POST" : return await post(req,res); break;
       case "DELETE" : return await del(req,res); break;
       case "PATCH" : return await patch(req,res); break;
       default : throw Error("endpoint does not exist!");
   }

}