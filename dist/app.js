"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const error_1 = require("./error");
const users_routes_1 = require("./routes/users.routes");
const login_routes_1 = require("./routes/login.routes");
const codes_routes_1 = require("./routes/codes.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/users', users_routes_1.userRoutes);
app.use('/login', login_routes_1.loginRoutes);
app.use('/codes', codes_routes_1.codesRoutes);
app.use(error_1.handleErrors);
exports.default = app;
