"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const terminus_1 = require("@nestjs/terminus");
const servers_service_1 = require("./services/servers.service");
const servers_controller_1 = require("./controllers/servers.controller");
const morgan_middleware_1 = require("./middlewares/morgan.middleware");
const auth_service_1 = require("./services/auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const metrics_module_1 = require("./modules/metrics.module");
const prisma_service_1 = require("./services/prisma.service");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const alerts_service_1 = require("./services/alerts.service");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(morgan_middleware_1.MorganMiddleware, auth_middleware_1.ApiKeyMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            terminus_1.TerminusModule,
            metrics_module_1.MetricsModule,
        ],
        controllers: [servers_controller_1.ServersController, auth_controller_1.AuthController],
        providers: [alerts_service_1.AlertsService, prisma_service_1.PrismaService, servers_service_1.ServersService, auth_service_1.AuthService],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map