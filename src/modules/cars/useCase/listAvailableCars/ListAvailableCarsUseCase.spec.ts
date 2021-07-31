import { CarsRepositoryInMemory } from "@modules/cars/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("List Available Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Bentayga",
      description: "High Luxury SUV",
      daily_rate: 9900,
      license_plate: "B3NTL3Y",
      fine_amount: 1029.99,
      brand: "Bentley",
      category_id: "suv_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await createCarUseCase.execute({
      name: "Bentayga",
      description: "High Luxury SUV",
      daily_rate: 9900,
      license_plate: "B3NTL3Y 2",
      fine_amount: 1029.99,
      brand: "Bentley",
      category_id: "suv_id",
    });

    // await createCarUseCase.execute({
    //   name: "Continental GT",
    //   description: "High Luxury Coupe",
    //   daily_rate: 8950,
    //   license_plate: "B3NTL3Y 305",
    //   fine_amount: 999.99,
    //   brand: "Bentley",
    //   category_id: "coupe_id",
    // });

    const cars = await listAvailableCarsUseCase.execute({ name: "Bentayga" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await createCarUseCase.execute({
      name: "Bentayga",
      description: "High Luxury SUV",
      daily_rate: 9900,
      license_plate: "B3NTL3Y 200",
      fine_amount: 1029.99,
      brand: "Bentley",
      category_id: "suv_id",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Bentley" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category_id", async () => {
    const car = await createCarUseCase.execute({
      name: "Bentayga",
      description: "High Luxury SUV",
      daily_rate: 9900,
      license_plate: "B3NTL3Y 201",
      fine_amount: 1029.99,
      brand: "Bentley",
      category_id: "suv_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "suv_id",
    });

    expect(cars).toEqual([car]);
  });
});
