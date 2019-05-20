import * as bodyParser from 'body-parser';

export default (app)=>{
    app.use(bodyParser.json());
};