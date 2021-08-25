import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    const globalPrefix = "api";
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    app.enableCors();
    const config = new DocumentBuilder()
        .setTitle("Sherlock Website")
        .setDescription("The Sherlock API Description")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(globalPrefix, app, document);
    await app.listen(port, () => console.log(`Listening at http://localhost:${port}/${globalPrefix}`));
}

bootstrap().catch(console.error);
