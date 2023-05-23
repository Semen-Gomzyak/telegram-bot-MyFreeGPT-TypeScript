
import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const { WEATHER_KEY } = process.env;

const getWeatherImage = async (city: string) => {
const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_KEY}`
);
    return response.data;
};

const weatherForecast = async (req: Request, res: Response) => {
const data = await getWeatherImage(req.query.city as string);
const city = data.city.name;
const country = data.city.country;
const weatherData = data.list.map((item: any) => ({
    date: item.dt_txt,
    main: item.weather[0].main,
    description: item.weather[0].description,
    clouds: item.clouds.all,
    wind_speed: item.wind.speed,
    image: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
    min_temp: Math.round(item.main.temp_min - 273.15),
    max_temp: Math.round(item.main.temp_max - 273.15),
}));

    res.status(200).json({city,country,weatherData,});
};

export default weatherForecast;
