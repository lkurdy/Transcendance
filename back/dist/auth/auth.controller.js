"use strict";
// auth.controller.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const twofa_service_1 = require("../twofa/twofa.service");
let AuthController = class AuthController {
    constructor(authService, prisma, jwtService, UserService, twoFaService) {
        this.authService = authService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.UserService = UserService;
        this.twoFaService = twoFaService;
    }
    connec(req, response) {
        response.redirect("https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-a228a2e48d13cbf096678ab23b5fdde386ab001c018ca545a98b49ba8b9b7661&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Flogin&response_type=code");
        console.log('42 atteint');
    }
    async login(req, response) {
        const code = req.query.code;
        //console.log("voici la valeur de code : ",code);
        if (!code) {
            throw new common_1.BadRequestException('Code is missing');
        }
        try {
            console.log("0. On va passé le access Token");
            const accessToken = await this.authService.getAccessToken(code); //ok
            console.log("Pour login 1.voici la valeur de accessToken : ", accessToken);
            const userData = await this.authService.getUserData(accessToken);
            console.log("Pour login 2.voici la valeur de userData : ", userData);
            await this.authService.connexion(userData, accessToken, response);
            //console.log("Pour login 3.voici la valeur de response : ",response);
        }
        catch (error) {
            console.log("La raison du probleme : ", error);
            throw new common_1.BadRequestException(error);
        }
    }
    async checkNickname(res, body) {
        const { nickname, token } = body;
        console.log("voici la valeur de nickname : ", nickname);
        console.log("voici la valeur de token : ", token);
        try {
            const user = await this.prisma.user.findUnique({ where: { nickname: nickname } });
            if (user !== null) {
                throw new common_1.BadRequestException("already used");
            }
            const regex = /^[a-zA-Z0-9\s\-\_]{2,20}$/;
            if (!regex.test(nickname))
                throw new common_1.BadRequestException("wrong regex");
            await this.authService.connexionPostNickname(token, nickname, res);
        }
        catch (err) {
            throw err;
        }
    }
    async connect2fa(req, res) {
        const code = req.query.code;
        console.log("voici la valeur de code 1: ", code);
        const id = req.query.id;
        console.log("voici la valeur de id 2: ", id);
        try {
            const user = await this.UserService.getUserById(id);
            if (!user.twoFactorSecret || !user.twoFactorEnabled) {
                throw new common_1.BadRequestException('2Fa is not enabled for this user');
            }
            const isCodeValid = this.twoFaService.isTwoFactorAuthenticationCodeValid(code, user);
            if (!isCodeValid) {
                throw new common_1.BadRequestException('Wrong authentication code');
            }
            await this.authService.apiConnexion2fa(user, res);
            await this.prisma.user.update({
                where: { id: 1 },
                data: { state: 'ONLINE' },
            });
            res.status(200).json({ message: 'Connexion réussie' });
        }
        catch (_a) {
            throw new common_1.BadRequestException();
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "connec", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)('checkNickname'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkNickname", null);
__decorate([
    (0, common_1.Get)('connect2fa'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "connect2fa", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        user_service_1.UserService,
        twofa_service_1.TwofaService])
], AuthController);
