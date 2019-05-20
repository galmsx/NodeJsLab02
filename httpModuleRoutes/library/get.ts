
import { LibraryService } from '../../services/LibraryService';
import { IncomingMessage, ServerResponse } from 'http';
var service : LibraryService;

export var get = async (req: IncomingMessage, res: ServerResponse) => {
    if (/^\/libraries\W?$/.test(req.url)) {
        try {
            service = new LibraryService();
            res.end(JSON.stringify(service.getLibrariesList()));
        }
        catch (err) { res.emit("error") };
    } else if (/^\/libraries\/\d+\W?$/.test(req.url)) {
        try {
            var id: number = + req.url.match(/\d+/g)[0];
            service = new LibraryService();
            res.end(JSON.stringify(await service.getAllReaders(id)));
        }
        catch (err) { res.emit("error") };
    };

    if (/^\/libraries\/\d+\/readers\W?/.test(req.url)) {//get libraries/id/reader
        try {
            var id: number = + req.url.match(/\d+/g)[0];
            service = new LibraryService();
            res.end(JSON.stringify(await service.getAllReaders(id)));
        }
        catch (err) { res.emit("error") };
    };
    if(/^\/libraries\/\d+\/readers\/\d+W?$/.test(req.url)){
        try {
            var readerId: number = + req.url.match(/\d+/g)[1];
            var libId: number = + req.url.match(/\d+/g)[0];
            service = new LibraryService();
            res.end(JSON.stringify(await service.getLibrarysReaderBookList(libId,readerId)));
        }
        catch (err) { res.emit("error") };

    }

}