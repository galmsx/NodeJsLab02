import { ReaderService } from '../../services/ReaderService';
import { IncomingMessage, ServerResponse } from 'http';
var readerService: ReaderService;

export var get = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (/^\/readers\W?$/.test(req.url)) {
            readerService = new ReaderService();
            res.end(JSON.stringify(readerService.getReadersList()));

        } else if (/^\/readers\/\d+\W?$/.test(req.url)) {

            var id: number = + req.url.match(/\d+/g)[0];
            readerService = new ReaderService();
            res.end(JSON.stringify(readerService.getReaderById(id)));
        } else
            if (/^\/readers\/\d+\/books\W?/.test(req.url)) {//get readers/id/books

                var id: number = + req.url.match(/\d+/g)[0];
                readerService = new ReaderService();
                var result = (await readerService.getReaderBooks(id));
                var toSend = {
                    books: result
                }
                res.end(JSON.stringify(toSend));

            } else { res.end('"ërror" : "endpoint does not exist"') }
    } catch (err) {
        res.end(`"error" : "${err.message}"`);
    }

}