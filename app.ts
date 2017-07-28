import * as express from 'express';

import * as root from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as path from 'path';
import * as routes from './server/routes';

const ENV = process.env.ENV || 'development';

const app = express();

app.set('env', ENV);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use server/routes.ts for handling responses
app.use('/', routes);

// // catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    // tslint:disable-next-line:no-console
    console.error("ERROR", err);

    res.status(err.status || 500).send({
      message: err.message,
      error: err
    });

  });
} else {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}


export = app;
