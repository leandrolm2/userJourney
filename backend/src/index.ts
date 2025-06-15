// Exemplo de uso no app principal (app.js ou index.js)
import express from 'express';
import data from './userJourney/route';

const app = express();
app.use(data);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});