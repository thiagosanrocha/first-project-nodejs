import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

import User from "../models/User";
import AppError from "../errors/AppError";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({ name, email, password }: RequestDTO): Promise<User> {
    if (!name) {
      throw new AppError("Name not send");
    } else if (!email) {
      throw new AppError("Email not send");
    } else if (!password) {
      throw new AppError("Password not send");
    }

    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError("Email already registered");
    }

    const hashPassword = await hash(password, 8);

    const newUser = usersRepository.create({
      id: uuid(),
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
