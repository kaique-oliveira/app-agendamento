import express, { Application, Request, Response } from 'express';
import router from './routers';

const app: Application = express();
const port = 3000;

// Middleware para parser JSON
app.use(express.json());

app.use('/api', router);
// Rota de exemplo
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API UP' });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
