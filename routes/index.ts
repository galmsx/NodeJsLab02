import { ReaderRoute } from './reader';
import { LibraryRouter } from './library';
var dateOfStart: string;
export var routes = (express, app) => {
    dateOfStart = new Date().toISOString();
    app.use('/readers', ReaderRoute(express));
    app.use('/libraries', LibraryRouter(express));
    app.all('/healthcheck', (req, res, next) => {
        try {
            var toSend = {
                dateOfStart,
                "howLong(ms)": new Date().getTime() - new Date(dateOfStart).getTime()
            };
            res.send(toSend);
        } catch (e) { next(e) };
    })

    app.use("/*", (req, res, next) => {
        next(new Error("endpoint does not exist"));
    })
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(500).send(err.message);
    })

}