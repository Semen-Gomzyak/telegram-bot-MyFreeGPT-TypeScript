import telegramController from "./telegram";
import getCurrentExchange from "./exchange/getExchange";
import userRegistartion from "./userRegistration.ts/userRegistration";
import weatherForecast from "./weather/getWeather";
import addProduct from "./products/addProduct";
import getProducts from "./products/getProducts";
import getTasks from "./tasks/getTasks";
import addTask from "./tasks/addTask";
import updateTask from "./tasks/updateTask";
import deleteTask from "./tasks/deleteTask";

const controllers = {
    telegramController,
    getCurrentExchange,
    userRegistartion,
    weatherForecast, 
    addProduct,
    getProducts,
    getTasks,
    addTask,
    updateTask,
    deleteTask
}

export default controllers;