import { Module } from "@nestjs/common";
import { SherlockController } from "./sherlock.controller";

@Module({
    controllers: [SherlockController],
})
export class SherlockModule {}
