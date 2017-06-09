import * as express from 'express';

import {recommend} from 'compassql/build/src/recommend';
import {fetchCompassQLBuildSchema, fetchCompassQLRecommend, Schema} from 'datavoyager/build/src/api/api';
import {Data} from 'vega-lite/build/src/data';
import {serializeGroup, serializeSchema} from './utils';

const router = express.Router();

router.route('/').get((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', {
    title: 'Voyager-Server'
  });
});


router.route('/recommend').post((req: express.Request, res: express.Response) => {
  const query = req.body.query;
  const fieldSchemas = req.body.schema;
  const data = (req.body.data as Data);
  const schema: Schema = new Schema(fieldSchemas);

  fetchCompassQLRecommend(query, schema, data).then(
    result => {
      res.status(200).send(serializeGroup(result));
    }
  )
});

router.route('/build').post((req: express.Request, res: express.Response) => {
  const data = req.body.data;

  fetchCompassQLBuildSchema(data).then(
    result => {
      res.status(200).send(serializeSchema(result));
    }
  )
});

export = router;
