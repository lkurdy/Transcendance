"use strict";
// auth.module.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../user/user.module");
const passport_1 = require("@nestjs/passport");
const prisma_module_1 = require("../prisma/prisma.module");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const jwt_strategy_1 = require("../strategy/jwt.strategy");
const twofa_service_1 = require("../twofa/twofa.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({
                defaultStrategy: 'bearer'
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule
        ],
        providers: [auth_service_1.AuthService, config_1.ConfigService, prisma_service_1.PrismaService, jwt_strategy_1.JwtStrategy, user_service_1.UserService, twofa_service_1.TwofaService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
