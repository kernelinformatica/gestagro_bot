"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("./routes/message"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
// Rutas
app.use('/send-message', message_1.default);
// Puerto desde .env o default
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`📡 API escuchando en http://10.0.0.204:${PORT}`);
});
