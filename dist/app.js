"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./db/connect"));
const checkList_1 = __importDefault(require("./routes/checkList"));
//configure port and hostnames
const port = 3000;
const host = 'localhost';
// main express app 
const app = express_1.default();
//json parse middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//routes
app.use('/checkList', checkList_1.default);
//error handling
app.use((req, res, next) => {
    const error = new Error("Not Found");
    next(error);
});
app.use((error, req, res, next) => {
    res.status(500);
    res.json({
        message: error.message,
    });
});
//db connection and app start message
app.listen(port, host, () => {
    console.log(`Server Running at http://${host}:${port}`);
    connect_1.default();
});
