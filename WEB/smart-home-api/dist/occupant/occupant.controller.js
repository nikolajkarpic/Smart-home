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
exports.OccupantController = void 0;
const common_1 = require("@nestjs/common");
const guard_1 = require("../auth/guard");
const occupant_service_1 = require("./occupant.service");
let OccupantController = class OccupantController {
    constructor(occupantService) {
        this.occupantService = occupantService;
    }
};
OccupantController = __decorate([
    (0, common_1.Controller)('occupants'),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    __metadata("design:paramtypes", [occupant_service_1.OccupantService])
], OccupantController);
exports.OccupantController = OccupantController;
//# sourceMappingURL=occupant.controller.js.map