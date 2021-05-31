import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import {
  Admin,
  Appointment,
  DiagnosticTesting,
  Doctor,
  MedicalRecord,
  Patient,
} from "../entities";

export default class Seed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const patients = await factory(Patient)().createMany(10);
    const doctors = await factory(Doctor)().createMany(5);
    const admin = await factory(Admin)().create();
    const appointment = await factory(Appointment)()
      .map(async (app) => {
        app.doctorId = doctors[Math.floor(Math.random() * doctors.length)].id;
        app.patientId = patients[Math.floor(Math.random() * doctors.length)].id;
        return app;
      })
      .createMany(20);
    const medicalRecord = await factory(MedicalRecord)()
      .map(async (record) => {
        record.doctorId =
          doctors[Math.floor(Math.random() * doctors.length)].id;
        record.patientId =
          patients[Math.floor(Math.random() * doctors.length)].id;
        return record;
      })
      .createMany(20);
    const diagnosticTesting = await factory(DiagnosticTesting)()
      .map(async (test) => {
        test.doctorId = doctors[Math.floor(Math.random() * doctors.length)].id;
        test.patientId =
          patients[Math.floor(Math.random() * doctors.length)].id;
        return test;
      })
      .createMany(20);
  }
}
