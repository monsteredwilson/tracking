"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const login_schema_1 = require("../schemas/login.schema");
exports.loginRoutes = (0, express_1.Router)();
exports.loginRoutes.post('', (0, validate_middleware_1.validateDataMiddleware)(login_schema_1.loginSchemaRequest), login_controllers_1.loginController);
