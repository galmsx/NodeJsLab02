import {ReaderRoute} from './reader';
import {LibraryRouter} from './library';
export var routes = (express, app)=>{
    app.use('/readers',ReaderRoute(express));
    app.use('/libraries',LibraryRouter(express));

    app.use("/*",(req,res,next)=>{
        next(new Error("endpoint does not exist"));
    })
    app.use((err,req,res,next)=>{
        console.log(err);
        res.status(500).send(err.message);
    })

}