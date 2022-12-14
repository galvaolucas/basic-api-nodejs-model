import { Router } from 'express';

const routes = Router();

routes.get('/', function(req, res) {
    res.json({
      health: 'OK'
    }) 
});

export default routes;
