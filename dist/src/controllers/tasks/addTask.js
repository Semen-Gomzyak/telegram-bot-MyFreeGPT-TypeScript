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
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, title, description, expired_at, priority } = req.body;
    const storedUser = yield models_1.default.User.findOne({ username });
    if (!storedUser) {
        return res.status(409).json("User not found, please try again later");
    }
    const task = {
        title,
        description,
        expired_at,
        priority
    };
    const savedTask = yield models_1.default.Task.create(Object.assign(Object.assign({}, task), { owner: { _id: storedUser._id } }));
    res.status(201).json(savedTask);
});
exports.default = addTask;
//# sourceMappingURL=addTask.js.map