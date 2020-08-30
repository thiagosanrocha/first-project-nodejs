import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "../models/User";
import tokenConfig from "../config/tokenConfig";
import AppError from "../errors/AppError";

interface RequestDTO {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionServide {
  public async run({ email, password }: RequestDTO): Promise<Response> {
    if (!email || !password) {
      throw new AppError("Email/Password not send");
    }

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError("Email/Password invalid");
    }

    const passwordsMatched = await compare(password, user.password);

    if (!passwordsMatched) {
      throw new AppError("Email/Password invalid");
    }

    delete user.password;

    const { secureKey, expiresIn } = tokenConfig.jwt;

    const token = sign({}, secureKey, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionServide;
