import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/uploadConfig";

import CreateUserService from "../services/CreateUserService";
import ensureAuthentication from "../middlewares/ensureAuthentication";
import UpdateAvatarService from "../services/UpdateAvatarService";

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

usersRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const createUserService = new CreateUserService();

  await createUserService.run({
    name,
    email,
    password,
  });

  return res.status(201).send();
});

usersRouter.patch(
  "/avatar",
  ensureAuthentication,
  uploadAvatar.single("avatar"),
  async (req, res) => {
    const updateAvatarService = new UpdateAvatarService();

    const avatar = await updateAvatarService.run({
      user_id: req.user.id,
      file: req.file,
    });

    return res.json(avatar);
  },
);

export default usersRouter;
