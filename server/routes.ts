import * as express from 'express';

import {fetchCompassQLBuildSchema, fetchCompassQLRecommend, Schema} from 'datavoyager/build/src/api/api';
import {Data} from 'vega-lite/build/src/data';
import {serializeSchema} from './utils';

const router = express.Router();

/**
 * Root Route
 * Just returns dummy JSON to indicate server is responsive
 */
router.route('/').get((req: express.Request, res: express.Response) => {
  res.status(200).send({ready: true});
});

/**
 * recommend route
 * Returns results from fetchCompassQLRecommend in serialized JSON.
 */
router.route('/recommend').post((req: express.Request, res: express.Response) => {
  const query = req.body.query;
  const fieldSchemas = req.body.schema;
  const data = (req.body.data as Data);
  const schema: Schema = new Schema({fields: fieldSchemas});

  fetchCompassQLRecommend(query, schema, data).then(
    result => {
      res.status(200).send(result);
    }
  );
});

/**
 * build route
 * Returns from fetchCompassQLBuildSchema in serialzied JSON.
 */
router.route('/build').post((req: express.Request, res: express.Response) => {
  const data = req.body.data;

  fetchCompassQLBuildSchema(data).then(
    result => {
      res.status(200).send(serializeSchema(result));
    }
  );
});

export = router;
