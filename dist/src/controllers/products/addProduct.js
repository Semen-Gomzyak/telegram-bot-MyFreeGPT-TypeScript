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
const middlwares_1 = __importDefault(require("../../middlwares"));
const models_1 = __importDefault(require("../../models"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, payment, description, characteristics } = req.body;
    const imageURL = yield middlwares_1.default.updateCloudinaryImage(req, res);
    const savedProduct = yield models_1.default.Product.create(Object.assign(Object.assign({ name, price, payment, description }, characteristics), { image: imageURL }));
    res.status(200).json(savedProduct);
});
exports.default = addProduct;
//# sourceMappingURL=addProduct.js.map