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
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 20, search, sort, id } = req.query;
    const query = {};
    if (search) {
        query.id = { $regex: String(search), $options: 'i' };
    }
    const sortOptions = {};
    switch (sort) {
        case 'oldest':
            sortOptions.createdAt = 1;
            break;
        case 'az':
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
    let products;
    if (id) {
        products = yield models_1.default.Product.findById(id);
    }
    else {
        products = yield models_1.default.Product.findOneAndDelete(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));
    }
    res.status(200).json(products);
});
exports.default = getProducts;
//# sourceMappingURL=getProducts.js.map