import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import routes from './shared/http/routes';
import { drive } from '.';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    return (res.json('API up!'))
});

app.use(routes);

app.listen(process.env.PORT || 3333, () => {
    console.log('Server running!')
});

//realiza autenticação e lista os arquivos do diretório
drive.authorize().then((res: any) => {
    drive.listFiles(res);
});

export default app;





