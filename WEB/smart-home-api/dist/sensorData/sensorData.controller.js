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
exports.SensorDataController = void 0;
const common_1 = require("@nestjs/common");
const sensorData_service_1 = require("./sensorData.service");
const dto_1 = require("../dto");
let SensorDataController = class SensorDataController {
    constructor(sensorDataService) {
        this.sensorDataService = sensorDataService;
    }
    setData(dto) {
        console.log({ dto });
        return this.sensorDataService.setData(dto);
    }
};
__decorate([
    (0, common_1.Post)('setData'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SensorDataDto]),
    __metadata("design:returntype", void 0)
], SensorDataController.prototype, "setData", null);
SensorDataController = __decorate([
    (0, common_1.Controller)('sensorData'),
    __metadata("design:paramtypes", [sensorData_service_1.SensorDataService])
], SensorDataController);
exports.SensorDataController = SensorDataController;
//# sourceMappingURL=sensorData.controller.js.map