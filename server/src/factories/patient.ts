import { define } from "typeorm-seeding";
import { Patient } from "../entities";
import Faker from "faker";

define(Patient, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);
  const surname = faker.name.lastName(gender);

  const patient = new Patient();
  patient.name = name;
  patient.surname = surname;
  patient.phone = faker.phone.phoneNumber("+385 ## ### ####");
  patient.address = faker.address.streetAddress();
  patient.OIB = faker.random
    .number({
      min: 10000000000,
      max: 99999999999,
    })
    .toString();
  patient.dateOfBirth = faker.date.between("1920-01-01", "2021-05-31");
  patient.email = faker.internet.email(name, surname);
  patient.password = faker.internet.password(10);
  return patient;
});
