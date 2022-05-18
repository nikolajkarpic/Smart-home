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
exports.SensorDataService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const prisma_service_1 = require("../prisma/prisma.service");
let SensorDataService = class SensorDataService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    setData(dto) {
    }
};
__decorate([
    (0, common_1.Post)('setData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SensorDataDto]),
    __metadata("design:returntype", void 0)
], SensorDataService.prototype, "setData", null);
SensorDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SensorDataService);
exports.SensorDataService = SensorDataService;
//# sourceMappingURL=sensorData.service.js.map