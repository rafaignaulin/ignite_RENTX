import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Category[]> {
    const specifications = await this.specificationsRepository.list();

    return specifications;
  }
}
