import AppError from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const SpecificationAlreadyExists = await this.specificationsRepository.findByName(
      name
    );

    if (SpecificationAlreadyExists)
      throw new AppError("Specification Already Exists!");

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}
