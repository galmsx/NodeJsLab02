import { ReaderService } from '../../services/ReaderService';
import { IncomingMessage, ServerResponse } from 'http';
var readerService: ReaderService;

export var post = async (req: IncomingMessage, res: ServerResponse) => {
    var json: string = '';
    req.on('data', (data) => {
        json += data;
    });

    req.on('end', async () => {
        try {
            var data = JSON.parse(json);

            if (/^\/readers\/\d+\/books\W?$/.test(req.url)) {//post readers/id/books
                var id: number = + req.url.match(/\d+/g)[0];
                readerService = new ReaderService();
                await readerService.setRentToReader(data.library, id, data.bookName);
                res.end("ok");

            } else if (/^\/readers\W?$/.test(req.url)) { // post /readers/
                readerService = new ReaderService();
                await readerService.createReader(data.name);
                console.log(data);
                res.end("ok");
            }
            else { res.end('"ërror" : "endpoint does not exist"') }
        } catch (err) {
            res.end(`"error" : "${err.message}"`)
        }

    });



}