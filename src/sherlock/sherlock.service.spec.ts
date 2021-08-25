import { Test, TestingModule } from "@nestjs/testing";
import { SherlockService } from "./sherlock.service";

describe("SherlockService", () => {
    let service: SherlockService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SherlockService],
        }).compile();

        service = module.get<SherlockService>(SherlockService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
