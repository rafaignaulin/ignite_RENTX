import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./createSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificationsRepository();

const specificationsUseCase = new CreateSpecificationUseCase(specificationsRepository);

export const specificationController = new CreateSpecificationController(specificationsUseCase);