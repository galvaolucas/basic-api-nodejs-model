import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import routes from './shared/http/routes';
import dotenv from 'dotenv';
import { getAsBuiltAndTVO } from './methods/getAsBuildAndTVO';
import { driveAuth } from './auth/driveAuth';

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    return (res.json('API up!'))
});

app.use(routes);

app.listen(process.env.PORT || 3333, async () => {
    console.log('Server running!')
    // await getAsBuiltAndTVO(process.env.TEAM_DRIVE_ID);
});

export default app;





