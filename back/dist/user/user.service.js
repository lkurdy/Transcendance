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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
const otplib_1 = require("otplib");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(userData, nickname) {
        try {
            const user = await this.prisma.user.create({
                data: {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    nickname: nickname,
                    state: 'ONLINE',
                    twoFactorSecret: otplib_1.authenticator.generateSecret(),
                    //pfp_url: userData.pfp,
                }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw new common_2.HttpException('Failed to create user', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.prisma.user.delete({
                where: { id: id }
            });
            return user;
        }
        catch (error) {
            console.error(error);
            throw new common_2.HttpException('Failed to delete user', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findUserByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: {
                    email
                },
            });
        }
        catch (_a) {
            throw new common_1.BadRequestException();
        }
    }
    async turnOnTwoFactorAuthentication(userId) {
        try {
            return this.prisma.user.update({
                where: { id: userId },
                data: { twoFactorEnabled: true },
            });
        }
        catch (_a) {
            throw new common_1.BadRequestException();
        }
    }
    async getUserById(userId) {
        if (!userId) {
            throw new common_1.BadRequestException('User ID is missing');
        }
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: parseInt(userId.toString()) },
            });
            return user;
        }
        catch (error) {
            console.error("User error 1: ", error);
            throw new common_1.BadRequestException();
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
