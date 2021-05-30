import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
  AfterUpdate,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";
import { encrypt, decrypt } from "../services/encryption";
import * as crypto from "crypto";
import { KEY } from "../utils/constants";

@Entity({ name: "medical_record" })
export default class MedicalRecord extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalRecord, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  doctor!: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.medicalRecord, {
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
  title!: string;

  @Column()
  @Length(1, 1024)
  medicalHistory!: string;

  @Column()
  @Length(1, 1024)
  physicalExamination!: string;

  @Column()
  @Length(1, 1024)
  diagnosis!: string;

  @Column()
  @Length(1, 1024)
  treatment!: string;

  @Column()
  @Length(1, 1024)
  recommendation!: string;

  @Column({ nullable: true })
  @Length(0, 1024)
  additionalNote!: string;

  @Column({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  salt!: string;

  @BeforeInsert()
  encryptFields() {
    this.createdAt = new Date();

    this.salt = crypto.randomBytes(64).toString("base64");

    const key = crypto.pbkdf2Sync(
      KEY,
      Buffer.from(this.salt, "base64"),
      10000,
      32,
      "sha512"
    );

    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.title = encrypt(this.title, AAD, key);
    this.medicalHistory = encrypt(this.medicalHistory, AAD, key);
    this.physicalExamination = encrypt(this.physicalExamination, AAD, key);
    this.diagnosis = encrypt(this.diagnosis, AAD, key);
    this.treatment = encrypt(this.treatment, AAD, key);
    this.recommendation = encrypt(this.recommendation, AAD, key);
    this.additionalNote = encrypt(this.additionalNote, AAD, key);
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

    this.title = decrypt(this.title, AAD, key);
    this.medicalHistory = decrypt(this.medicalHistory, AAD, key);
    this.physicalExamination = decrypt(this.physicalExamination, AAD, key);
    this.diagnosis = decrypt(this.diagnosis, AAD, key);
    this.treatment = decrypt(this.treatment, AAD, key);
    this.recommendation = decrypt(this.recommendation, AAD, key);
    this.additionalNote = decrypt(this.additionalNote, AAD, key);
  }

  @BeforeUpdate()
  encryptUpdate() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    const key = crypto.pbkdf2Sync(
      KEY,
      Buffer.from(this.salt, "base64"),
      10000,
      32,
      "sha512"
    );

    this.additionalNote = encrypt(this.additionalNote, AAD, key);
  }
  @AfterUpdate()
  decryptUpdate() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    const key = crypto.pbkdf2Sync(
      KEY,
      Buffer.from(this.salt, "base64"),
      10000,
      32,
      "sha512"
    );

    this.additionalNote = decrypt(this.additionalNote, AAD, key);
  }
}
