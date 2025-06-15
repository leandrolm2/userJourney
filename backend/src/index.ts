import express from 'express';
import data from './route';

const app = express();
app.use(data);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});