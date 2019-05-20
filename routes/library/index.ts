import { LibraryService } from '../../services/LibraryService';
var service: LibraryService;
export var LibraryRouter = (express) => {
    var router = express.Router();
    router.get("/", (req, res, next) => {
        try {
            service = new LibraryService();
            res.json(service.getLibrariesList());
        }
        catch (err) { next(err) };
    });
    router.post("/", async (req, res, next) => {
        try {
            service = new LibraryService();
            await service.createLibrary();
            res.status(200).send('ok');
        }
        catch (err) { next(err) };
    });

    router.delete("/:id", async (req, res, next) => {
        try {
            service = new LibraryService();
            await service.deleteLibrary(req.params.id);
            res.status(200).send('ok');
        }
        catch (err) { next(err) };
    });

    router.get("/:id", async (req, res, next) => {
        try {
            service = new LibraryService();
            res.status(200).send(await service.getAllReaders(req.params.id));
        }
        catch (err) { next(err) };
    });

    router.get("/:id/readers", async (req, res, next) => {
        try {
            service = new LibraryService();
            res.status(200).send(await service.getAllReaders(req.params.id));
        }
        catch (err) { next(err) };
    });
    router.get("/:lib/readers/id/books", async (req, res, next) => {
        try {
            service = new LibraryService();
            res.status(200).send(await service.getLibrarysReaderBookList(req.params.lib, req.params.id));
        }
        catch (err) { next(err) };
    });

    router.delete("/:lib/books/:id", async (req, res, next) => {
        try {
            service = new LibraryService();
            await service.delBookRent(req.params.id);
            res.status(200).send("ok");
        }
        catch (err) { next(err) };
    });

    return router;
}