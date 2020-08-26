import { Router } from "express";
import { parseISO, startOfHour, isEqual } from "date-fns";

import Appointment from "../models/Appointments";

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const hasAppointment = appointments.find(
    appointment =>
      appointment.provider === provider &&
      isEqual(appointment.date, parsedDate),
  );

  if (hasAppointment) {
    return res
      .status(400)
      .json({ error: "This appointment is already booked" });
  }

  const newAppointment = new Appointment(provider, parsedDate);

  appointments.push(newAppointment);

  return res.json(newAppointment);
});

export default appointmentsRouter;
