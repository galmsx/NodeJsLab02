import * as express from "express";
import middlewares from './middlewares';
import {routes } from './routes';
import {ReaderService} from './services/ReaderService';
var port : number = require('./config/config.json').port;

var reader : ReaderService = new ReaderService();


const app : express.Application = express();
middlewares(app);
routes(express,app);

app.listen(port,()=>console.log(`listen in ${port}!`));