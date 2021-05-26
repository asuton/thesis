import { Column, Entity, OneToMany, BeforeInsert } from "typeorm";
import { Length } from "class-validator";
import User from "./User";
import MedicalRecord from "./MedicalRecord";
import DiagnosticTesting from "./DiagnosticTesting";
import { Authorization } from "../utils/constants";
import Authenticator from "./Authenticator";
import Appointment from "./Appointment";

@Entity({ name: "doctors" })
export default class Doctor extends User {
  @Column()
  @Length(1, 255)
  qualification!: string;

  @Column()
  @Length(1, 255)
  license!: string;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.doctor)
  medicalRecord!: MedicalRecord[];

  @OneToMany(
    () => DiagnosticTesting,
    (diagnosticTesting) => diagnosticTesting.doctor
  )
  diagnosticTesting!: DiagnosticTesting[];

  @OneToMany(() => Authenticator, (authenticator) => authenticator.doctor)
  authenticator!: Promise<Authenticator[]>;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointment!: Appointment[];

  @BeforeInsert()
  setAuthorization() {
    this.authorization = Authorization.Doctor;
  }
}
