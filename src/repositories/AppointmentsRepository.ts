// import { isEqual } from "date-fns";
import { EntityRepository, Repository } from "typeorm";

import Appointment from "../models/Appointment";

interface findByAppointmentDTO {
  provider_id: string;
  date: Date;
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByAppointment({
    provider_id,
    date,
  }: findByAppointmentDTO): Promise<Appointment | null> {
    const appointment = await this.findOne({
      where: { provider_id, date },
    });

    return appointment || null;
  }

  public async listAppoitmentsByProvider(
    provider_id: string,
  ): Promise<Appointment[]> {
    const appointments = await this.find({
      where: { provider_id },
    });

    return appointments;
  }
}

export default AppointmentsRepository;
