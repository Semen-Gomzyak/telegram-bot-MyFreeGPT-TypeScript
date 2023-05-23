"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { WEATHER_KEY } = process.env;
const getWeatherImage = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_KEY}`);
    return response.data;
});
const weatherForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getWeatherImage(req.query.city);
    const city = data.city.name;
    const country = data.city.country;
    const weatherData = data.list.map((item) => ({
        date: item.dt_txt,
        main: item.weather[0].main,
        description: item.weather[0].description,
        clouds: item.clouds.all,
        wind_speed: item.wind.speed,
        image: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
        min_temp: Math.round(item.main.temp_min - 273.15),
        max_temp: Math.round(item.main.temp_max - 273.15),
    }));
    res.status(200).json({ city, country, weatherData, });
});
exports.default = weatherForecast;
//# sourceMappingURL=getWeather.js.map