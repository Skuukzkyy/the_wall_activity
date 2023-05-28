import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import session from 'express-session';
import { PORT_NUMBER, SESSION_CONFIG } from './configs/constants.js';
import router from './routes/routes.js';


const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session(SESSION_CONFIG));
app.use(router);

app.listen(PORT_NUMBER);