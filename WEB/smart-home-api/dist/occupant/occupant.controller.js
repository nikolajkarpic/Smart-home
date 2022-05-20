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
exports.OccupantController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const decorator_1 = require("../auth/decorator");
const dto_1 = require("./dto");
const create_occupant_dto_1 = require("./dto/create-occupant.dto");
const occupant_service_1 = require("./occupant.service");
let OccupantController = class OccupantController {
    constructor(occupantService) {
        this.occupantService = occupantService;
    }
    createNewOccupant(userId, dto) {
        return this.occupantService.createOccupant(userId, dto);
    }
    getOccupants(userId, smartHomeId) {
        return this.occupantService.getOccupants(userId, smartHomeId);
    }
    getOccupantById(userId, smartHomeId, occupantId) {
        return this.occupantService.getOccupantById(userId, smartHomeId, occupantId);
    }
    editOccupantById(userId, smartHomeId, occupantId, dto) {
        return this.occupantService.editOccupantById(userId, smartHomeId, occupantId, dto);
    }
    deleteOccupantById(userId, smartHomeId, occupantId) {
        return this.occupantService.deleteOccupantById(userId, smartHomeId, occupantId);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_occupant_dto_1.CreateOccupantDto]),
    __metadata("design:returntype", void 0)
], OccupantController.prototype, "createNewOccupant", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)('smartHomeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], OccupantController.prototype, "getOccupants", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)('smartHomeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], OccupantController.prototype, "getOccupantById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)('smartHomeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)('dto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, dto_1.EditOccupantDto]),
    __metadata("design:returntype", void 0)
], OccupantController.prototype, "editOccupantById", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)('smartHomeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], OccupantController.prototype, "deleteOccupantById", null);
OccupantController = __decorate([
    (0, common_1.Controller)('occupants'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [occupant_service_1.OccupantService])
], OccupantController);
exports.OccupantController = OccupantController;
//# sourceMappingURL=occupant.controller.js.map