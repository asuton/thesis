import { define } from "typeorm-seeding";
import { Admin } from "../entities";
import * as Faker from "faker";
import { ADMIN_MAIL, ADMIN_PASSWORD } from "../utils/constants";

define(Admin, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const name = faker.name.firstName(gender);
  const surname = faker.name.lastName(gender);
  const admin = new Admin();
  admin.name = name;
  admin.surname = surname;
  admin.phone = faker.phone.phoneNumber("+385 ### ####");
  admin.OIB = faker.random
    .number({
      min: 10000000000,
      max: 99999999999,
    })
    .toString();
  admin.email = ADMIN_MAIL;
  admin.password = ADMIN_PASSWORD;
  return admin;
});
