import { define, factory } from "typeorm-seeding";
import { Appointment, Doctor, Patient } from "../entities";
import * as Faker from "faker";

const time = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

define(Appointment, (faker: typeof Faker) => {
  let date = faker.date.recent(-90);
  while (date.getDay() === 6 || date.getDay() === 0) {
    date = faker.date.recent(-90);
  }
  const appointment = new Appointment();
  appointment.date = date;

  const slot = time[
    faker.random.number({ min: 0, max: time.length - 1 })
  ] as unknown;

  const dateTime = slot as Date;

  appointment.time = dateTime;

  return appointment;
});
