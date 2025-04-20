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
exports.ServersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const servers_service_1 = require("../services/servers.service");
const create_server_dto_1 = require("../dtos/create-server.dto");
const update_server_dto_1 = require("../dtos/update-server.dto");
let ServersController = class ServersController {
    serversService;
    constructor(serversService) {
        this.serversService = serversService;
    }
    findAll() {
        return this.serversService.findAll();
    }
    findById(id) {
        return this.serversService.findById(id);
    }
    create(dto) {
        return this.serversService.create(dto);
    }
    update(id, dto) {
        return this.serversService.update(id, dto);
    }
    delete(id) {
        return this.serversService.delete(id);
    }
};
exports.ServersController = ServersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all registered servers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of servers returned' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get server by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Server found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Server not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create/register a new server' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Server created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_server_dto_1.CreateServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: "Update a server's information" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Server updated' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_server_dto_1.UpdateServerDto]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a server' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Server deleted' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServersController.prototype, "delete", null);
exports.ServersController = ServersController = __decorate([
    (0, swagger_1.ApiTags)('Servers'),
    (0, swagger_1.ApiSecurity)('api-key'),
    (0, common_1.Controller)('servers'),
    __metadata("design:paramtypes", [servers_service_1.ServersService])
], ServersController);
//# sourceMappingURL=servers.controller.js.map