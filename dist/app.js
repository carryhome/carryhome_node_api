"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("../env");
const app = express_1.default();
app.get('/', (req, res, next) => {
    res.send('Hello');
});
app.listen(process.env.PORT, () => console.log(`server running on port: ${process.env.PORT}`));
