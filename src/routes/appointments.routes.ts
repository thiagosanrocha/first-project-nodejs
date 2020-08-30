import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import ensureAuthentication from "../middlewares/ensureAuthentication";
import CreateAppointmentService from "../services/CreateAppointmentService";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentication);

appointmentsRouter.get("/all", async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.get("/", async (req, res) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.listAppoitmentsByProvider(
      String(req.user.id),
    );

    return res.json(appointments);
  } catch (err) {
    return res.status(400).send();
  }
});

appointmentsRouter.post("/", async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const createAppointment = new CreateAppointmentService();

    const newAppointment = await createAppointment.run({
      provider_id,
      date: parseISO(date),
    });

    return res.json(newAppointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
