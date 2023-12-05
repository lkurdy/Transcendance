"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// src/app.module.ts
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const user_service_1 = require("./user/user.service"); // Assurez-vous d'importer votre service UserService
const app_controller_1 = require("./app.controller");
const user_controller_1 = require("./user/user.controller");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_service_1 = require("./auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("./user/user.module");
const passport_1 = require("@nestjs/passport");
const app_service_1 = require("./app.service");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const config_1 = require("@nestjs/config");
const twofa_service_1 = require("./twofa/twofa.service");
const twofa_module_1 = require("./twofa/twofa.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule, prisma_module_1.PrismaModule, auth_module_1.AuthModule, twofa_module_1.TwofaModule, passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),
            /*     ServeStaticModule.forRoot({
                  rootPath: join(__dirname, '..'),
                }), */
        ],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [
            prisma_service_1.PrismaService, app_service_1.AppService, auth_service_1.AuthService, user_service_1.UserService, twofa_service_1.TwofaService, config_1.ConfigService, jwt_strategy_1.JwtStrategy
        ],
    })
], AppModule);
