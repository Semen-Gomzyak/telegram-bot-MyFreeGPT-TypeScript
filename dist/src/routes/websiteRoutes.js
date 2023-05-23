"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlwares_1 = __importDefault(require("../middlwares"));
const controllers_1 = __importDefault(require("../controllers"));
const validations_1 = __importDefault(require("../validations"));
const websiteRoutes = express_1.default.Router();
websiteRoutes.get('/exchange', middlwares_1.default.tryCatchWrapper(controllers_1.default.getCurrentExchange));
websiteRoutes.get('/weather', middlwares_1.default.tryCatchWrapper(controllers_1.default.weatherForecast));
websiteRoutes.post('/register', middlwares_1.default.tryCatchWrapper(controllers_1.default.userRegistartion));
websiteRoutes.get('/products', middlwares_1.default.tryCatchWrapper(controllers_1.default.getProducts));
websiteRoutes.post('/products', middlwares_1.default.upload.single('image'), middlwares_1.default.tryCatchWrapper(controllers_1.default.addProduct));
websiteRoutes.post('/tasks', middlwares_1.default.validateBody(validations_1.default.taskValidateSchema), middlwares_1.default.tryCatchWrapper(controllers_1.default.updateTask));
websiteRoutes.put('/tasks', middlwares_1.default.tryCatchWrapper(controllers_1.default.updateTask));
websiteRoutes.get('tasks', middlwares_1.default.tryCatchWrapper(controllers_1.default.getTasks));
websiteRoutes.delete('tasks', middlwares_1.default.tryCatchWrapper(controllers_1.default.deleteTask));
exports.default = websiteRoutes;
//# sourceMappingURL=websiteRoutes.js.map