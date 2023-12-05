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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const dotenv_1 = require("dotenv");
const twofa_service_1 = require("../twofa/twofa.service");
(0, dotenv_1.config)();
const axios = require('axios');
const client_id = process.env.UID_42;
const clientSecret = process.env.SECRET_42;
const redirect_url = process.env.REDIRECT_URL;
let AuthService = class AuthService {
    constructor(prisma, // Injectez le client Prisma
    userService, jwtService, TwofaService) {
        this.prisma = prisma;
        this.userService = userService;
        this.jwtService = jwtService;
        this.TwofaService = TwofaService;
    }
    async connexion(userData, token, res) {
        try {
            let user = await this.prisma.user.findUnique({ where: { email: userData.email } });
            if (!user) {
                res.redirect(`` + process.env.URL_LOCAL_FRONT + `/nickname?token=${token}`); //Vers le front
            }
            else {
                if (user.twoFactorEnabled) {
                    res.redirect(`` + process.env.URL_LOCAL_FRONT + `/2fa?id=${user.id}`);
                }
                else {
                    //console.log("YEEEEEEEEEEEA ");
                    await this.prisma.user.update({
                        where: { id: user.id },
                        data: { state: 'ONLINE' },
                    });
                    // console.log("user: ", this.prisma.user);
                    const newToken = await this.generateAndSetAccessToken(user);
                    res.cookie("accessToken", newToken);
                    //console.log("newToken: ", newToken);
                    res.redirect(process.env.URL_LOCAL + `/`);
                }
            }
            return user;
        }
        catch (error) {
            console.log("La raison du probleme : ", error);
            throw new common_1.BadRequestException(error);
        }
    }
    async getAccessToken(code) {
        try {
            const response = await axios.post(process.env.TOKEN_42, {
                client_id: client_id,
                client_secret: clientSecret,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirect_url,
            });
            const accessToken = response.data.access_token;
            //console.log("Access token valeur: ", accessToken);
            return accessToken;
        }
        catch (error) {
            if (error.response && error.response.data) {
                console.error("Error from 42 API:", error.response.data);
            }
            else {
                console.error("Unexpected error:", error);
            }
            throw new common_1.HttpException('Failed to retrieve access token', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async connexionPostNickname(token, nickname, res) {
        const userData = await this.getUserData(token);
        const user = await this.userService.createUser(userData, nickname);
        const newToken = await this.generateAndSetAccessToken(user);
        res.cookie("accessToken", newToken);
        res.status(200).json({ message: 'Connexion réussie' });
    }
    async getUserData(accessToken) {
        try {
            const userResponse = await axios.get(process.env.ME_42, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            return {
                id: userResponse.data.id,
                name: userResponse.data.login,
                email: userResponse.data.email,
                code: userResponse.data.code,
                pfp: userResponse.data.image.link,
            };
        }
        catch (_a) {
            throw new common_1.HttpException('Failed to get user data', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generateAndSetAccessToken(user) {
        try {
            const jwtPayload = { username: user.name, sub: user.id };
            //console.log("jwtPayload: ", jwtPayload);
            const newToken = this.jwtService.sign(jwtPayload);
            console.log("newToken: ", newToken);
            return newToken;
        }
        catch (_a) {
            throw new common_1.BadRequestException();
        }
    }
    async apiConnexion2fa(user, res) {
        try {
            if (!user)
                throw new common_1.BadRequestException("user doesn't exist");
            else {
                const newToken = await this.generateAndSetAccessToken(user);
                res.cookie("accessToken", newToken);
            }
        }
        catch (_a) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService,
        twofa_service_1.TwofaService])
], AuthService);
