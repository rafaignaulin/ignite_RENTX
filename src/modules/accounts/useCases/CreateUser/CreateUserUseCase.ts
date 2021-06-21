import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import AppError from "../../../../errors/AppError";

@injectable()
export default class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){}

  async execute({name, password, driver_license, email}: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists){
      throw new AppError("User Already Exists")
    }


    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      password: passwordHash,
      driver_license,
      email
    })
  }
}