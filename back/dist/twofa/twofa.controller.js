"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwofaController = void 0;
const common_1 = require("@nestjs/common");
const twofa_service_1 = require("./twofa.service");
const jwt_guard_guard_1 = __importDefault(require("../jwt-guard/jwt-guard.guard"));
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const common_2 = require("@nestjs/common");
const qrcode = __importStar(require("qrcode"));
const get_user_decorator_1 = require("../auth/decorator/get-user.decorator");
let TwofaController = class TwofaController {
    constructor(twofaService, jwtService, userService) {
        this.twofaService = twofaService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async generateTwoFactorAuthenticatio(user, response) {
        try {
            const { otpauthUrl } = await this.twofaService.generateTwoFactorAuthenticationSecret(user);
            const code = await qrcode.toDataURL(otpauthUrl);
            response.json({ code: code });
        }
        catch (_a) {
            throw new common_2.BadRequestException();
        }
    }
    async turnOnTwoFactorAuthentication(user, body) {
        try {
            const { code } = body;
            if (!user.twoFactorSecret) {
                throw new common_2.BadRequestException('2FA is not enabled for this user');
            }
            const isCodeValid = this.twofaService.isTwoFactorAuthenticationCodeValid(code, user);
            if (!isCodeValid) {
                throw new common_2.BadRequestException('Wrong authentication code');
            }
            await this.userService.turnOnTwoFactorAuthentication(user.id);
        }
        catch (_a) {
            throw new common_2.BadRequestException();
        }
    }
};
exports.TwofaController = TwofaController;
__decorate([
    (0, common_1.Get)('generate'),
    (0, common_1.UseGuards)(jwt_guard_guard_1.default),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwofaController.prototype, "generateTwoFactorAuthenticatio", null);
__decorate([
    (0, common_1.Post)('turn-on'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_guard_guard_1.default),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwofaController.prototype, "turnOnTwoFactorAuthentication", null);
exports.TwofaController = TwofaController = __decorate([
    (0, common_1.Controller)('twofa'),
    __metadata("design:paramtypes", [twofa_service_1.TwofaService,
        jwt_1.JwtService,
        user_service_1.UserService])
], TwofaController);
