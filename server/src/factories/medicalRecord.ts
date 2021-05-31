import { define, factory } from "typeorm-seeding";
import { Doctor, MedicalRecord, Patient } from "../entities";
import * as Faker from "faker";

define(MedicalRecord, (faker: typeof Faker) => {
  const add = faker.random.number(1);
  const medicalRecord = new MedicalRecord();
  medicalRecord.title = faker.lorem.words(3);
  medicalRecord.medicalHistory = faker.lorem.lines(3);
  medicalRecord.physicalExamination = faker.lorem.lines(5);
  medicalRecord.diagnosis = faker.lorem.lines(3);
  medicalRecord.treatment = faker.lorem.lines(2);
  medicalRecord.recommendation = faker.lorem.lines(2);
  medicalRecord.additionalNote = add === 1 ? faker.lorem.lines(2) : "";
  return medicalRecord;
});
