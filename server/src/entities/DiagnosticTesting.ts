import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  AfterLoad,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";
import { encrypt, decrypt } from "../services/encryption";
import * as crypto from "crypto";
import { KEY } from "../utils/constants";

@Entity({ name: "diagnostic_testing" })
export default class DiagnosticTesting extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.diagnosticTesting, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  doctor!: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.diagnosticTesting, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  patient!: Patient;

  @Column()
  doctorId!: string;

  @Column()
  patientId!: string;

  @Column()
  @Length(1, 255)
  test!: string;

  @Column()
  @Length(1, 500)
  result!: string;

  @Column({ type: "timestamp" })
  createdAt!: Date;

  @Column()
  salt!: string;

  @BeforeInsert()
  encryptFields() {
    this.createdAt = new Date();

    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.salt = crypto.randomBytes(64).toString("base64");
    const key = crypto.pbkdf2Sync(
      KEY,
      Buffer.from(this.salt, "base64"),
      10000,
      32,
      "sha512"
    );

    this.test = encrypt(this.test, AAD, key);
    this.result = encrypt(this.result, AAD, key);
  }

  @AfterLoad()
  decryptFields() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    const key = crypto.pbkdf2Sync(
      KEY,
      Buffer.from(this.salt, "base64"),
      10000,
      32,
      "sha512"
    );

    this.test = decrypt(this.test, AAD, key);
    this.result = decrypt(this.result, AAD, key);
  }
}
