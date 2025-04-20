"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const prisma_exception_filter_1 = require("./utils/prisma-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.set('trust proxy', 1);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new prisma_exception_filter_1.PrismaExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Server Monitoring API')
        .setDescription('Central service for tracking server metrics and alerts')
        .setVersion('1.0')
        .addTag('Servers')
        .addTag('Metrics')
        .addTag('Auth')
        .addApiKey({
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
    }, 'api-key')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(9080);
}
bootstrap().catch((err) => {
    console.error('Error during bootstrap:', err);
});
//# sourceMappingURL=main.js.map