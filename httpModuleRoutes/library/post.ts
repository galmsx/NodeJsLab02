
import { LibraryService } from '../../services/LibraryService';
import { IncomingMessage, ServerResponse } from 'http';
var service: LibraryService;
export var post = async (req: IncomingMessage, res: ServerResponse) => {
    var json: string = '';
    req.on('data', (data) => {
        json += data;
    });

    req.on('end', async () => {
        //var data = JSON.parse(json);
        try{

        if (/^\/libraries\W?$/.test(req.url)) { // post /libraries/
          
                service = new LibraryService();
                await service.createLibrary();
                res.end("ok");

        } else{res.end('"ërror" : "endpoint does not exist"')}
        }catch(err){
            res.end(`"error" : "${err.message}"`)
        }

    });



}