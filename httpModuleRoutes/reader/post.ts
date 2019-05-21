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
        }
        catch (e) {
            res.emit("error");
            return;
        }

        if (/^\/readers\/\d+\/books\W?$/.test(req.url)) {//post readers/id/books
            try {
                var id: number = + req.url.match(/\d+/g)[0];
                readerService = new ReaderService();
                await readerService.setRentToReader(data.library, id, data.bookName);
                res.end("ok");
            }
            catch (err) { res.emit("error") };
        } else if (/^\/readers\W?$/.test(req.url)) { // post /readers/
            try {
                readerService = new ReaderService();
                await readerService.createReader(data.name);
                console.log(data);
                res.end("ok");
            }
            catch (err) { res.emit("error") };
        }
        else{res.end('"ërror" : "endpoint does not exist"')}

    });



}