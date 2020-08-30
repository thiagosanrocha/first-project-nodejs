import { getRepository } from "typeorm";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

import Avatar from "../models/Avatar";
import User from "../models/User";
import uploadConfig from "../config/uploadConfig";

interface RequestDTO {
  user_id: string;
  file: Express.Multer.File;
}

class UpdateAvatarService {
  public async run({ file, user_id }: RequestDTO): Promise<Avatar> {
    async function removeAvatarFile(pathDir: string, filename: string) {
      const avatarFileExists = await fs.promises.stat(
        path.join(pathDir, filename),
      );

      if (avatarFileExists) {
        await fs.promises.unlink(path.join(pathDir, filename));
      }
    }

    if (!file) {
      throw Error("Avatar/User Id don't send");
    } else if (!user_id) {
      await removeAvatarFile(uploadConfig.directory, file.filename);

      throw Error("Avatar/User Id don't send");
    }

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id },
    });

    if (!user) {
      await removeAvatarFile(uploadConfig.directory, file.filename);

      throw new Error("Only authenticated users can change avatar");
    }

    const avatarRepository = getRepository(Avatar);

    const checkAvatarExists = await avatarRepository.findOne({
      where: { user_id },
    });

    if (checkAvatarExists) {
      try {
        const avatarFileExists = await fs.promises.stat(checkAvatarExists.path);

        if (avatarFileExists) {
          await fs.promises.unlink(checkAvatarExists.path);
        }

        await avatarRepository.remove(checkAvatarExists);
      } catch (err) {
        await removeAvatarFile(uploadConfig.directory, file.filename);

        throw new Error("Internal Error");
      }
    }

    const createAvatar = avatarRepository.create({
      id: uuid(),
      path: path.join(uploadConfig.directory, file.filename),
      filename: file.filename,
      user_id,
    });

    await avatarRepository.save(createAvatar);

    return createAvatar;
  }
}

export default UpdateAvatarService;
