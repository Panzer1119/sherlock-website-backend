import { Module } from "@nestjs/common";
import { SherlockController } from "./sherlock.controller";
import { SherlockService } from "./sherlock.service";

@Module({
    controllers: [SherlockController],
    providers: [SherlockService],
})
export class SherlockModule {}
