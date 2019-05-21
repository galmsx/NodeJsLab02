import * as http from 'http';
var port: number = require('./config/config.json').port;
import { ReaderRouter } from './httpModuleRoutes/reader';
import { libraryRouter } from './httpModuleRoutes/library';

var dateOfstart: string;

let server = new http.Server(async function (req: http.IncomingMessage, res: http.ServerResponse) {
  try {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.method);
    console.log(req.url);


    if (/^\/readers/.test(req.url)) {
      await ReaderRouter(req, res);
    } else if (/^\/libraries/.test(req.url)) {
      await libraryRouter(req, res);
    } else if (/^\/healthcheck\W?$/.test(req.url)) {

      var toSend = {
        dateOfstart,
        "howLong(ms)": new Date().getTime() - new Date(dateOfstart).getTime()
      }
      res.end(JSON.stringify(toSend));

    } else {
      throw Error("endpoint does not exist!");

    }

  } catch (err) {
    console.log(err);
    res.end(`"error":"${err.message}"`)
  }
});
server.listen(port, () => {
  console.log(`Http module listen on port ${port}!`);
  dateOfstart = new Date().toISOString();
});
