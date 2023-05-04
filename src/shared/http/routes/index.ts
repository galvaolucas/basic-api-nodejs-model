import { Router } from 'express';
import { Controller } from '../../../controllers';

const routes = Router();
const controller = new Controller()

routes.get('/', function(req, res) {
    res.json({
      health: 'OK'
    }) 
});

routes.get('/asBuiltAndTVO/:codigo', async (req, res): Promise<any> => {
  const { codigo } = req.params;
  const data = await controller.getAsBuiltAndTVO(codigo);
  return res.json(data);
})

export default routes;
