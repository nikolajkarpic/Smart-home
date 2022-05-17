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
exports.ThermostatController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto");
const thermostat_service_1 = require("./thermostat.service");
let ThermostatController = class ThermostatController {
    constructor(thermostatService) {
        this.thermostatService = thermostatService;
    }
    setPrefTemp(dto) {
        return this.thermostatService.setPrefTemp(dto);
    }
};
__decorate([
    (0, common_1.Post)('setPrefTemp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.thermostatDto]),
    __metadata("design:returntype", void 0)
], ThermostatController.prototype, "setPrefTemp", null);
ThermostatController = __decorate([
    (0, common_1.Controller)('thermostat'),
    __metadata("design:paramtypes", [thermostat_service_1.ThermostatService])
], ThermostatController);
exports.ThermostatController = ThermostatController;
//# sourceMappingURL=thermostat.controller.js.map