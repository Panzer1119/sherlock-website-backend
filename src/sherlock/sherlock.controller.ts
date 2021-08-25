import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SherlockService } from "./sherlock.service";

@ApiTags("sherlock")
@Controller("sherlock")
export class SherlockController {
    constructor(private readonly sherlockService: SherlockService) {}

    @ApiOperation({
        summary: "Look Up a Username",
    })
    @Get("user/:username")
    lookUp(@Param("username") username: string): void {
        this.sherlockService.lookUp(username);
    }
}
