import database from './database';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConhecimentoController from './controllers/conhecimento';

// Initialize DB
(async () => {
  await database.db.initialize();
  //   await database.db.synchronize();
})();

const controllers = {
  conhecimento: new ConhecimentoController(),
};
const port = 3000;
const defaultPath = '/api';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${defaultPath}/conhecimento`, controllers.conhecimento.router);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log('Running on port: ' + port);
});
