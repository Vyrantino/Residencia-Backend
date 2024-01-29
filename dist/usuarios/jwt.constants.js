"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstant = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.jwtConstant = {
    secret: process.env.SECRET,
};
//# sourceMappingURL=jwt.constants.js.map