import axios from 'axios';
import { Request, Response } from 'express';

const responseExchangeCourses = async (coursid: number): Promise<object> => {
    const response = await axios.get(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=${coursid}`);
    return response.data
};

const getCurrentExchange = async (_req: Request, res: Response): Promise<void> => {
    const courses = await Promise.all([
        responseExchangeCourses(5),
        responseExchangeCourses(4),
    ]);

    const resCourses = courses.flatMap((course: object) => course);
    res.status(200).json(resCourses);
}

export default getCurrentExchange;