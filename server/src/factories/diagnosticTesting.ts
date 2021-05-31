import { define, factory } from "typeorm-seeding";
import { DiagnosticTesting, Doctor, Patient } from "../entities";
import * as Faker from "faker";

define(DiagnosticTesting, (faker: typeof Faker) => {
  const diagnosticTest = new DiagnosticTesting();
  diagnosticTest.test = faker.lorem.words(3);
  diagnosticTest.result = faker.lorem.lines(5);
  return diagnosticTest;
});
