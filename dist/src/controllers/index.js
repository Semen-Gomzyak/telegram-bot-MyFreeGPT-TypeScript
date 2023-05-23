"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegram_1 = __importDefault(require("./telegram"));
const getExchange_1 = __importDefault(require("./exchange/getExchange"));
const userRegistration_1 = __importDefault(require("./userRegistration.ts/userRegistration"));
const getWeather_1 = __importDefault(require("./weather/getWeather"));
const addProduct_1 = __importDefault(require("./products/addProduct"));
const getProducts_1 = __importDefault(require("./products/getProducts"));
const getTasks_1 = __importDefault(require("./tasks/getTasks"));
const addTask_1 = __importDefault(require("./tasks/addTask"));
const updateTask_1 = __importDefault(require("./tasks/updateTask"));
const deleteTask_1 = __importDefault(require("./tasks/deleteTask"));
const controllers = {
    telegramController: telegram_1.default,
    getCurrentExchange: getExchange_1.default,
    userRegistartion: userRegistration_1.default,
    weatherForecast: getWeather_1.default,
    addProduct: addProduct_1.default,
    getProducts: getProducts_1.default,
    getTasks: getTasks_1.default,
    addTask: addTask_1.default,
    updateTask: updateTask_1.default,
    deleteTask: deleteTask_1.default
};
exports.default = controllers;
//# sourceMappingURL=index.js.map