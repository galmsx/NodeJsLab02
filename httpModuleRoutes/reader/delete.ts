import { ReaderService } from '../../services/ReaderService';
import { IncomingMessage, ServerResponse } from 'http';
var readerService: ReaderService;

export var del = async (req : IncomingMessage,res : ServerResponse)=>{

    var json: string = '';
    req.on('data', (data) => {
        json += data;
    });

    req.on('end', async () => {
        var data = JSON.parse(json);

        if (/^\/readers\/\d+\W?$/.test(req.url)) {
            try {
                var id: number = + req.url.match(/\d+/g)[0];
                readerService = new ReaderService();
                await readerService.deleteReader(id);
                res.end("ok");
            }
            catch(e){
                req.emit("error");
            }
        }
        else if(/^\/readers\/\d+\/books\/\d+W?$/.test(req.url)){
            try {
                var id: number = + req.url.match(/\d+/g)[1];
                readerService = new ReaderService();
                await readerService.delBookRent(id);
                res.end("ok");
            }
            catch(e){
                req.emit("error");
            }
        }

    });
}