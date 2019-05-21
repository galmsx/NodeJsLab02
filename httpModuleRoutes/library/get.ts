
import { LibraryService } from '../../services/LibraryService';
import { IncomingMessage, ServerResponse } from 'http';
var service: LibraryService;

export var get = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        if (/^\/libraries\W?$/.test(req.url)) {
            service = new LibraryService();
            res.end(JSON.stringify(service.getLibrariesList()));

        } else if (/^\/libraries\/\d+\W?$/.test(req.url)) {
            var id: number = + req.url.match(/\d+/g)[0];
            service = new LibraryService();
            res.end(JSON.stringify(await service.getAllReaders(id)));
        } else

            if (/^\/libraries\/\d+\/readers\W?/.test(req.url)) {//get libraries/id/reader
                var id: number = + req.url.match(/\d+/g)[0];
                service = new LibraryService();
                res.end(JSON.stringify(await service.getAllReaders(id)));

            } else
                if (/^\/libraries\/\d+\/readers\/\d+W?$/.test(req.url)) {
                    var readerId: number = + req.url.match(/\d+/g)[1];
                    var libId: number = + req.url.match(/\d+/g)[0];
                    service = new LibraryService();
                    res.end(JSON.stringify(await service.getLibrarysReaderBookList(libId, readerId)));

                } else { res.end('"ërror" : "endpoint does not exist"') }
    } catch (err) {
        res.end(`"error" : "${err.message}"`)
    }

}