import * as express from 'express';

import {recommend} from 'compassql/build/src/recommend';
import {Data} from 'vega-lite/build/src/data';
import {fetchCompassQLRecommend, Schema} from 'voyager/build/src/api/api';
import {serializeGroup} from './utils';

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

export = router;
