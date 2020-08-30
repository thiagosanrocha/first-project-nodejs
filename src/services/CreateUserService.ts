import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcryptjs";

import User from "../models/User";

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({ name, email, password }: RequestDTO): Promise<User> {
    if (!name) {
      throw Error("Name not send");
    } else if (!email) {
      throw Error("Email not send");
    } else if (!password) {
      throw Error("Password not send");
    }

    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw Error("Email already registered");
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
