import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory";
import AppError from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("CreateCar", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Bentayga",
      description: "High Luxury SUV",
      daily_rate: 9900,
      license_plate: "B3NTL3Y",
      fine_amount: 1029.99,
      brand: "Bentley",
      category_id: "High Luxury SUV",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Bentayga",
        description: "High Luxury SUV",
        daily_rate: 9900,
        license_plate: "B3NTL3Y",
        fine_amount: 1029.99,
        brand: "Bentley",
        category_id: "High Luxury SUV",
      });

      await createCarUseCase.execute({
        name: "Bentayga2",
        description: "High Luxury SUV",
        daily_rate: 9900,
        license_plate: "B3NTL3Y",
        fine_amount: 1029.99,
        brand: "Bentley",
        category_id: "High Luxury SUV",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Bentayga",
      description: "High Luxury SUV",
      daily_rate: 9900,
      license_plate: "B3NTL3Y",
      fine_amount: 1029.99,
      brand: "Bentley",
      category_id: "High Luxury SUV",
    });

    expect(car.available).toBe(true);
  });
});
