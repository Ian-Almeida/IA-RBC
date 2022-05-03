import database from './database';
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ConhecimentoController from './controllers/conhecimento';

// Conecta nas configs de banco de dados definidos
(async () => {
  await database.db.initialize();
  // Descomentar quando mudar ou adicionar alguma entidade, realiza a sincronização do banco com as entidade encontradas
  //   await database.db.synchronize();
})();

// Instancia dos controllers para plugar ao app express (ENDPOINTS)
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

// Pluga o controller no app express
app.use(`${defaultPath}/conhecimento`, controllers.conhecimento.router);

app.get('/', (req: Request, res: Response) => {
  res.send('Index');
});

app.listen(port, () => {
  console.log('Running on port: ' + port);
});
