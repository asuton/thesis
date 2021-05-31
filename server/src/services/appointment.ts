import { createQueryBuilder } from "typeorm";
import { getCurrentDate } from "../helpers/date";
import { Appointment } from "../entities";

interface Form {
  date: Date;
  time: Date;
}

export const getAppointmentsQuery = async (
  id: string
): Promise<Appointment[] | undefined> => {
  return await createQueryBuilder<Appointment>("Appointment")
    .where("Appointment.doctorId = :id OR Appointment.patientId = :id", {
      id: id,
    })
    .leftJoinAndMapOne(
      "Appointment.doctor",
      "Doctor",
      "Doctor",
      "Appointment.doctorId = Doctor.id"
    )
    .leftJoinAndMapOne(
      "Appointment.patient",
      "Patient",
      "Patient",
      "Appointment.patientId = Patient.id"
    )
    .select([
      "Appointment.id",
      "Appointment.doctorId",
      "Appointment.patientId",
      "Appointment.date",
      "Appointment.time",
      "Appointment.createdAt",
      "Doctor.name",
      "Doctor.surname",
      "Patient.name",
      "Patient.surname",
    ])
    .getMany();
};

export const getTaken = async (doctorId: string) => {
  const { date, time } = getCurrentDate();
  return await createQueryBuilder<Appointment>("Appointment")
    .where("Appointment.doctorId = :id", { id: doctorId })
    .andWhere(
      "Appointment.date > :currentDate OR (Appointment.date = :currentDate AND Appointment.time > :currentTime)",
      { currentDate: date, currentTime: time }
    )

    .select(["Appointment.date", "Appointment.time"])
    .getMany();
};

export const insertAppointment = async (
  form: Form,
  patientId: string,
  doctorId: string
): Promise<Appointment> => {
  let appointment = new Appointment();
  appointment.patientId = patientId;
  appointment.doctorId = doctorId;
  appointment.date = form.date;
  appointment.time = form.time;
  return appointment;
};

export const validateSlot = async (
  appointment: Appointment
): Promise<{ validate: boolean; errorMsg: string }> => {
  const hour = appointment.time.toString();
  let errorMsg = "";

  if (hour.slice(-2) !== "00" && hour.slice(-2) !== "30") {
    errorMsg = "Invalid slot";
  }
  const { date, time } = getCurrentDate();

  if (appointment.date.toString() < date) {
    errorMsg = "Past event";
    return { validate: false, errorMsg };
  } else if (
    appointment.date.toString() === date &&
    appointment.time.toString() < time
  ) {
    errorMsg = "Past event";
    return { validate: false, errorMsg };
  }
  const day = new Date(appointment.date.toString());
  if (day.getDay() === 6 || day.getDay() === 0) {
    errorMsg = "Clinic is closed during weekends";
    return { validate: false, errorMsg };
  }
  if (
    appointment.time.toString() < "08:00" ||
    appointment.time.toString() >= "16:00"
  ) {
    errorMsg = "Closed";
    return { validate: false, errorMsg };
  }
  const apps = await getTaken(appointment.doctorId);
  if (apps && apps.length > 0) {
    const found = apps.some(
      (app) =>
        app.date === appointment.date &&
        app.time.toString().substring(0, 5) ===
          appointment.time.toString().substring(0, 5)
    );
    if (found) {
      errorMsg = "Appointment already booked";
      return { validate: false, errorMsg };
    } else return { validate: true, errorMsg };
  }
  return { validate: true, errorMsg };
};

export const findOneAndValidateForRemoval = async (id: string) => {
  const appointment = await Appointment.findOne(id);
  let errorMsg = "";
  if (!appointment) {
    errorMsg = "Could not find appointment";
    return { validate: false, errorMsg };
  }
  const { date, time } = getCurrentDate();
  if (appointment.date.toString() < date) {
    errorMsg = "Can't delete past event";
    return { validate: false, errorMsg };
  } else if (
    appointment.date.toString() === date &&
    appointment.time.toString() < time
  ) {
    errorMsg = "Can't delete past event";
    return { validate: false, errorMsg };
  } else {
    return { validate: true, errorMsg, appointment };
  }
};
