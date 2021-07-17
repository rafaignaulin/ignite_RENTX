import AppError from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/repositories/dtos/ICreateUserDTO";
import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "../CreateUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";



let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  })

  it("should be able to authenticate an user ", async () => {
    const user: ICreateUserDTO = {
      driver_license: "123456789",
      email: "email@email.com",
      password: "1234",
      name: "John Doe",
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty("token")

  })


  it("should be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234",
      })
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO ={
        driver_license: "9999",
        email: "user@user.com",
        password: "1234",
        name: "John Doe 2"
      }

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect-password",
      })
    }).rejects.toBeInstanceOf(AppError);
  });

  

})