import * as express from "express";
import middlewares from './middlewares';
import { routes } from './routes';
var port: number = require('./config/config.json').port;



const app  = express();
middlewares(app);
routes(express, app);

app.listen(port, () => {
    console.log(`listen in ${port}!`);

});