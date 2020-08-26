import { Router } from "express";
import { parseISO, startOfHour } from "date-fns";

import AppointmentsRepositories from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepositories();

appointmentsRouter.get("/", (req, res) => {
  const { provider } = req.query;

  const appointments = appointmentsRepository.listAppointments(
    String(provider),
  );

  return res.json(appointments);
});

appointmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const hasAppointment = appointmentsRepository.findByAppointment(
    provider,
    parsedDate,
  );

  if (hasAppointment) {
    return res
      .status(400)
      .json({ error: "This appointment is already booked" });
  }

  const newAppointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(newAppointment);
});

export default appointmentsRouter;
