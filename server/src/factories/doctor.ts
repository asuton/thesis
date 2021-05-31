import { define } from "typeorm-seeding";
import { Doctor } from "../entities";
import * as Faker from "faker";
import { medicalQualifications } from "../utils/constants";

define(Doctor, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);
  const surname = faker.name.lastName(gender);

  const doctor = new Doctor();
  doctor.name = name;
  doctor.surname = surname;
  doctor.phone = faker.phone.phoneNumber("+385 ### ####");
  doctor.license = faker.random
    .number({
      min: 1000000,
      max: 9999999,
    })
    .toString();
  doctor.OIB = faker.random
    .number({
      min: 10000000000,
      max: 99999999999,
    })
    .toString();
  const qualification = faker.random.number({
    min: 0,
    max: medicalQualifications.length - 1,
  });
  doctor.qualification = medicalQualifications[qualification];
  doctor.email = faker.internet.email(name, surname, "medclinic.hr");
  doctor.password = faker.internet.password(10);
  return doctor;
});
