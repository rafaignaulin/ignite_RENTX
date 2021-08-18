import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepository,

    @inject("CarsRepository")
    private carsRepository: CarsRepository
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const verifyIfCarExists = await this.carsRepository.findById(car_id);
    if (!verifyIfCarExists) {
      throw new AppError("This car doesnt exists");
    }

    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}
