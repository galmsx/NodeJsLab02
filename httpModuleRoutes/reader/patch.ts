import { ReaderService } from '../../services/ReaderService';
import { IncomingMessage, ServerResponse } from 'http';
var readerService: ReaderService;

export var patch = async (req: IncomingMessage, res: ServerResponse) => {
    var json: string = '';
    req.on('data', (data) => {
        json += data;
    });

    req.on('end', async () => {
        var data = JSON.parse(json);

        if (/^\/readers\/\d+\W?/.test(req.url)) {//patch readers/id/
            try {
                var id: number = + req.url.match(/\d+/g)[0];
                readerService = new ReaderService();
                await readerService.apdateReaderName(id, data.name);;
                res.end("ok");
            }
            catch (err) { res.emit("error") };
        };

    });



}