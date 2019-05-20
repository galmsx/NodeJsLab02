import { ReaderService } from '../../services/ReaderService';
var readerService: ReaderService;

export var ReaderRoute = (express) => {
    var router = express.Router();

    router.get("/", (req, res, next) => {
        try {
            readerService = new ReaderService();
            res.json(readerService.getReadersList());
        }
        catch (err) { next(err) };
    })
    router.post('/', async (req, res, next) => {
        try {
            readerService = new ReaderService();
            await readerService.createReader(req.body.name);
            res.status(200).send("ok");
        }
        catch (err) { next(err) }

    })
    router.delete('/:id', async (req, res, next) => {
        try {
            readerService = new ReaderService();
            await readerService.deleteReader(req.params.id);
            res.status(200).send("ok");
        }
        catch (err) { next(err) }
    });
    router.patch('/:id', async (req, res, next) => {
        try {
            readerService = new ReaderService();
            await readerService.apdateReaderName(req.params.id, req.body.name);
            res.status(200).send("ok");
        }
        catch (err) { next(err) }
    });

    router.get('/:id', (req, res, next) => {
        try {
            readerService = new ReaderService();
            res.json(readerService.getReaderById(req.params.id));
        }
        catch (err) { next(err) };
    })
    router.get('/:id/books', async (req, res, next) => {
        try {
            readerService = new ReaderService();
            res.send(await readerService.getReaderBooks(req.params.id));
        }
        catch (err) { next(err) }
    });
    router.post('/:id/books', async (req, res, next) => {
        try {
            readerService = new ReaderService();
            await readerService.setRentToReader(req.body.library, req.params.id, req.body.bookName);
            res.status(200).send("ok");
        }
        catch (err) { next(err) }
    });
    router.delete('/:us/books/:bookid', async (req, res, next) => {
        try {
            readerService = new ReaderService();
            await readerService.delBookRent(req.params.bookid);
            res.status(200).send("ok");
        }
        catch (err) { next(err) }
    });

    return router;
}