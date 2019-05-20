import { ReaderService } from '../../services/ReaderService';
import { IncomingMessage, ServerResponse } from 'http';
var readerService: ReaderService;

export var get = async (req: IncomingMessage, res: ServerResponse) => {
    readerService = new ReaderService;
    if (/^\/readers\W?$/.test(req.url)) {
        try {
            readerService = new ReaderService();
            res.end(JSON.stringify(readerService.getReadersList()));
        }
        catch (err) { res.emit("error") };
    } else if (/^\/readers\/\d+\W?$/.test(req.url)) {
        try {
            var id: number = + req.url.match(/\d+/g)[0];
            readerService = new ReaderService();
            res.end(JSON.stringify(readerService.getReaderById(id)));
        }
        catch (err) { res.emit("error") };
    };

    console.log("I am here");
  
    console.log(/^\/readers\/\d+\/books\W?/.test(req.url));
    if (/^\/readers\/\d+\/books\W?/.test(req.url)) {//get readers/id/books
        try {
            var id: number = + req.url.match(/\d+/g)[0];
            readerService = new ReaderService();
            var result = (await readerService.getReaderBooks(id));
            var toSend = {
                books : result
            }
            res.end(JSON.stringify(toSend));
        }
        catch (err) { res.emit("error") };
    };

}