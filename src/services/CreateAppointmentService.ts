import { startOfHour } from "date-fns";
import { v4 as uuid, validate } from "uuid";

import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import AppError from "../errors/AppError";

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async run({ provider_id, date }: RequestDTO): Promise<Appointment> {
    if (!provider_id) {
      throw new AppError("Provider ID don't send");
    }

    if (!validate(provider_id)) {
      throw new AppError("Invalid Provider Id");
    }

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const hasAppointment = await appointmentsRepository.findByAppointment({
      provider_id,
      date: appointmentDate,
    });

    if (hasAppointment) {
      throw new AppError("This appointment is already booked");
    }

    const newAppointment = appointmentsRepository.create({
      id: uuid(),
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}

export default CreateAppointmentService;
