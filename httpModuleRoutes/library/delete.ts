
import { LibraryService } from '../../services/LibraryService';
var service: LibraryService;
import { IncomingMessage, ServerResponse } from 'http';


export var del = async (req: IncomingMessage, res: ServerResponse) => {

    var json: string = '';
    req.on('data', (data) => {
        json += data;
    });

    req.on('end', async () => {
        try {
        //    var data = JSON.parse(json);
        }
        catch (e) {
            res.emit("error");
            return;
        }

        if (/^\/libraries\/\d+\W?$/.test(req.url)) {
            try {
                var id: number = + req.url.match(/\d+/g)[0];
                service = new LibraryService();
                await service.deleteLibrary(id);
                res.end("ok");
            }
            catch (e) {
                res.emit("error");
            }
        }
        else if (/^\/libraries\/\d+\/books\/\d+W?$/.test(req.url)) {
            try {
                var id: number = + req.url.match(/\d+/g)[1];
                service = new LibraryService();
                await service.delBookRent(id);
                res.end("ok");
            }
            catch (e) {
                res.emit("error");
            }
        }

    });
}