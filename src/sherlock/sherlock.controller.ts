import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("sherlock")
@Controller("sherlock")
export class SherlockController {
    @ApiOperation({
        summary: "Look Up a Username",
    })
    @Get("lookUp")
    lookUp(): string {
        return "Test";
    }
}
