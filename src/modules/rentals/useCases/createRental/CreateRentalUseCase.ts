import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    // Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable");
    }

    // Nao deve ser possivel cadastrar um novo aluguel caso ja exista um aberto para o mesmo usuario
    const userUnavailable = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userUnavailable) {
      throw new AppError("There is a rental in progress for this user!");
    }

    // O aluguel deve ter duracao minima de 24 horas

    const dateNow = this.dateProvider.dateNow();
    const compareDate = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compareDate < 24) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
