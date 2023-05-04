import { Router } from 'express';
import { Controller } from '../../../controllers';

const routes = Router();
const controller = new Controller()

routes.get('/', function(req, res) {
    res.json({
      health: 'OK'
    }) 
});

routes.get('/asBuiltAndTVO', async (req, res): Promise<any> => {
  const data = await controller.getAsBuiltAndTVO();
  return res.json(data);
})

export default routes;
