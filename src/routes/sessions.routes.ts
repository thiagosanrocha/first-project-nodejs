import { Router } from "express";

import CreateSessionService from "../services/CreateSessionService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const { user, token } = await createSession.run({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
