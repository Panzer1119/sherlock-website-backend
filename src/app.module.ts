import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SherlockService } from "./sherlock/sherlock.service";
import { SherlockModule } from "./sherlock/sherlock.module";

@Module({
    imports: [SherlockModule],
    controllers: [AppController],
    providers: [AppService, SherlockService],
})
export class AppModule {}
