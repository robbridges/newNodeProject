"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const task_1 = __importDefault(require("./routers/task"));
require('./db/mongoose'); // we actually don't need to do anything with this import, so we can just require it as we never expect to call it. It just injects  Mongoose
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a word document'));
        }
        cb(null, true);
        // cb(new Error('File must be a pdf'));
        // cb(null, true);
        // cb(null, false);
    }
});
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});
app.use(express_1.default.json());
app.use(user_1.default);
app.use(task_1.default);
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
