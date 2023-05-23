import express, { Router} from 'express';
import middlwares from '../middlwares';
import controllers from '../controllers';
import validationsSchema from '../validations';

const websiteRoutes: Router = express.Router();

websiteRoutes.get('/exchange', middlwares.tryCatchWrapper(controllers.getCurrentExchange));

websiteRoutes.get('/weather', middlwares.tryCatchWrapper(controllers.weatherForecast));

websiteRoutes.post('/register', middlwares.tryCatchWrapper(controllers.userRegistartion));

websiteRoutes.get('/products', middlwares.tryCatchWrapper(controllers.getProducts));

websiteRoutes.post('/products', middlwares.upload.single('image'),
middlwares.tryCatchWrapper(controllers.addProduct))

websiteRoutes.post('/tasks', middlwares.validateBody(validationsSchema.taskValidateSchema),
    middlwares.tryCatchWrapper(controllers.updateTask));

websiteRoutes.put('/tasks', middlwares.tryCatchWrapper(controllers.updateTask));

websiteRoutes.get('/tasks', middlwares.tryCatchWrapper(controllers.getTasks));

websiteRoutes.delete('/tasks', middlwares.tryCatchWrapper(controllers.deleteTask));

export default websiteRoutes;