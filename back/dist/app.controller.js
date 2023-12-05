"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AppController = class AppController {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    Bienvenue() {
    }
    getConnected() {
        console.log('test atteint');
        return (process.env.INTRA_42);
    }
    connect() {
        console.log('42 atteint');
        return (process.env.INTRA_42);
    }
    ft_transcendence() {
        console.log('2fa atteint');
        return (() => process.env.INTRA_42);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Redirect)('' + process.env.URL_LOCAL_FRONT + '/') //auth
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Bienvenue", null);
__decorate([
    (0, common_1.Get)('test'),
    (0, common_1.Redirect)(process.env.REDIRECT_URL_2) //auth/test
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getConnected", null);
__decorate([
    (0, common_1.Get)('42'),
    (0, common_1.Redirect)(process.env.REDIRECT_URL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "connect", null);
__decorate([
    (0, common_1.Get)('2fa'),
    (0, common_1.Redirect)(process.env.REDIRECT_URL_3),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ft_transcendence", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AppController);
