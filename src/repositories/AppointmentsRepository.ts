import { isEqual } from "date-fns";

import Appointment from "../models/Appointment";

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment {
    const newAppointment = new Appointment(provider, date);

    this.appointments.push(newAppointment);

    return newAppointment;
  }

  public findByAppointment(provider: string, date: Date): Appointment | null {
    const findByAppointment = this.appointments.find(
      appointment =>
        appointment.provider === provider && isEqual(appointment.date, date),
    );

    return findByAppointment || null;
  }

  public listAppointments(provider: string): Appointment[] {
    const filterAppointmentsByProvider = this.appointments.filter(
      appointment => appointment.provider === provider,
    );

    return filterAppointmentsByProvider;
  }
}

export default AppointmentsRepository;
