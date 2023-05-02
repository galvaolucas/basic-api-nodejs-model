import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import routes from './shared/http/routes';
import { driveAuth } from './driveAuth';
import { createFile } from './uploadToFolder';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    return (res.json('API up!'))
});

app.use(routes);

app.listen(process.env.PORT || 3333, async () => {
    console.log('Server running!')
    await createFile();
});

//realiza autenticação e lista os arquivos do diretório
// driveAuth.authorize().then((res: any) => {
//     console.log('autorizado!')
// }).then(() => createFile());

export default app;





