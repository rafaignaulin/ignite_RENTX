import AppError from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository ";
import { injectable, inject } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {}


  async execute({name, description} : IRequest): Promise<void> {

    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
  
    if(categoryAlreadyExists) throw new AppError("Category Already Exists!");
  
    await this.categoriesRepository.create({
      name,
      description
    })
  
  }
}