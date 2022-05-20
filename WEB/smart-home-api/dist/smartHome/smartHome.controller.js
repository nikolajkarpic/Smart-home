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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartHomeController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const dto_1 = require("./dto");
const create_smartHome_dto_1 = require("./dto/create-smartHome.dto");
const smartHome_service_1 = require("./smartHome.service");
let SmartHomeController = class SmartHomeController {
    constructor(smartHomeService) {
        this.smartHomeService = smartHomeService;
    }
    createSmartHome(dto, userId) {
        return this.smartHomeService.createSmartHome(userId, dto);
    }
    getSmartHomes(userId) {
        return this.smartHomeService.getSmartHomes(userId);
    }
    getSmartHomeById(userId, smartHomeId) {
        return this.smartHomeService.getSmartHomeById(userId, smartHomeId);
    }
    editSmartHomeById(userId, smartHomeId, dto) {
        return this.smartHomeService.editSmartHomeById(userId, smartHomeId, dto);
    }
    deleteSmartHomeById(userId, smartHomeId) {
        return this.smartHomeService.deleteSmartHomeById(userId, smartHomeId);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_smartHome_dto_1.CreateSmartHomeDto, Number]),
    __metadata("design:returntype", void 0)
], SmartHomeController.prototype, "createSmartHome", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SmartHomeController.prototype, "getSmartHomes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SmartHomeController.prototype, "getSmartHomeById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dto_1.EditSmartHomeDto]),
    __metadata("design:returntype", void 0)
], SmartHomeController.prototype, "editSmartHomeById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], SmartHomeController.prototype, "deleteSmartHomeById", null);
SmartHomeController = __decorate([
    (0, common_1.Controller)('smartHome'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [smartHome_service_1.SmartHomeService])
], SmartHomeController);
exports.SmartHomeController = SmartHomeController;
//# sourceMappingURL=smartHome.controller.js.map