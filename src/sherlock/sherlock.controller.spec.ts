import { Test, TestingModule } from "@nestjs/testing";
import { SherlockController } from "./sherlock.controller";

describe("SherlockController", () => {
    let controller: SherlockController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SherlockController],
        }).compile();

        controller = module.get<SherlockController>(SherlockController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
