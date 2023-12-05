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
exports.TwofaService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const qrcode_1 = require("qrcode");
const otplib_1 = require("otplib");
const config_1 = require("@nestjs/config");
let TwofaService = class TwofaService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, user) {
        return otplib_1.authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorSecret
        });
    }
    async generateTwoFactorAuthenticationSecret(user) {
        try {
            const secret = otplib_1.authenticator.generateSecret();
            const otpauthUrl = otplib_1.authenticator.keyuri(user.email, this.configService.get('APP_NAME'), secret);
            await this.prismaService.user.update({
                where: { id: user.id },
                data: { twoFactorSecret: secret },
            });
            return {
                secret,
                otpauthUrl
            };
        }
        catch (_a) {
            throw new common_1.BadRequestException();
        }
    }
    async pipeQrCodeStream(stream, otpauthUrl) {
        return (0, qrcode_1.toFileStream)(stream, otpauthUrl);
    }
};
exports.TwofaService = TwofaService;
exports.TwofaService = TwofaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], TwofaService);
