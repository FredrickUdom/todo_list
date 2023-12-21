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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../todo/entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const login_dto_1 = require("../dto/login.dto");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepo, jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }
    async signUp(payload) {
        const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
        const userEmail = await this.userRepo.findOne({ where: { email: email } });
        if (userEmail) {
            throw new common_1.HttpException('sorry email already exist', 400);
        }
        ;
        const hashPassword = await bcrypt.hash(password, 10);
        try {
            const user = await this.userRepo.save(Object.assign({ email, password: hashPassword }, rest));
            await this.userRepo.save(user);
            delete user.password;
            return user;
        }
        catch (err) {
            if (err.code === '22P02') {
                throw new common_1.BadRequestException('admin role should be lower case');
            }
            return err;
        }
    }
    async signIn(payload, req, res) {
        const { email, password } = payload;
        const user = await this.userRepo.createQueryBuilder("user")
            .addSelect("user.password")
            .where("user.email = :email", { email: payload.email }).getOne();
        if (!user) {
            throw new common_1.HttpException('No email found', 400);
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new common_1.HttpException('sorry password not exist', 400);
        }
        const token = await this.jwtService.signAsync({
            email: user.email,
            id: user.id
        });
        res.cookie('isAuthenticated', token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000
        });
        delete user.password;
        return res.send({
            success: true,
            userToken: token
        });
    }
    async logout(req, res) {
        const clearCookie = res.clearCookie('isAuthenticated');
        const response = res.send(` user successfully logout`);
        return {
            clearCookie,
            response
        };
    }
    async findEmail(email) {
        const mail = await this.userRepo.findOneByOrFail({ email });
        if (!mail) {
            throw new common_1.UnauthorizedException();
        }
        return mail;
    }
    async user(headers) {
        const authorizationHeader = headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer ', '');
            const secret = process.env.JWT_SECRET;
            try {
                const decoded = this.jwtService.verify(token);
                let id = decoded["id"];
                let user = await this.userRepo.findOneBy({ id });
                return { id, name: user.userName, email: user.email, role: user.role };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        else {
            throw new common_1.UnauthorizedException('Invalid or missing Bearer token');
        }
    }
    async updateUser(headers, updateUser) {
        const authorizationHeader = headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer ', '');
            const secret = process.env.JWT_SECRET;
            try {
                const decoded = this.jwtService.verify(token);
                let id = decoded["id"];
                let user = await this.findEmail(id);
                return { id, name: user.userName, email: user.email, role: user.role };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        else {
            throw new common_1.UnauthorizedException('Invalid or missing Bearer token');
        }
    }
    async findAllUser() {
        return await this.userRepo.find();
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.loginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signIn", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "logout", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map