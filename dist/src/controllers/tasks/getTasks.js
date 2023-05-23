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
const models_1 = __importDefault(require("../../models"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 20, search, sort, id, username, status, priority } = req.query;
    const query = {};
    const checkOwnership = yield models_1.default.User.findOne({ username });
    if (checkOwnership) {
        const ownerUserId = checkOwnership._id;
        query.owner = ownerUserId;
        if (search) {
            const searchValue = { $regex: String(search), $options: 'i' };
            query.$or = [
                { id: searchValue },
                { description: searchValue },
                { title: searchValue },
                { status: searchValue },
                { priority: searchValue },
            ];
        }
        if (status) {
            query.status = String(status);
        }
        if (priority) {
            query.priority = String(priority);
        }
        const sortOptions = {};
        switch (sort) {
            case 'oldest':
                sortOptions.createdAt = 1;
                break;
            case ' az':
                sortOptions.title = 1;
                break;
            case 'za':
                sortOptions.title = -1;
                break;
            default:
                sortOptions.createdAt = -1;
                break;
        }
        const skip = (Number(page) - 1) * Number(limit);
        let tasks;
        if (id) {
            tasks = yield models_1.default.Task.findById(id);
        }
        else {
            tasks = yield models_1.default.Task.find(query)
                .sort(sortOptions)
                .collation({ locale: 'en' })
                .skip(skip)
                .limit(Number(limit))
                .lean();
        }
        res.status(200).json(tasks);
    }
    else {
        res.status(403).json({ message: 'Access denied' });
    }
});
exports.default = getTasks;
//# sourceMappingURL=getTasks.js.map