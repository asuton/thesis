import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";

@Entity({ name: "medicalRecords" })
export default class MedicalRecord extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor)
  doctor!: Doctor;

  @ManyToOne(() => Patient, (patient) => patient)
  patient!: Patient;

  @Column()
  @Length(1, 255)
  title!: string;

  @Column()
  @Length(1, 500)
  medicalHistory!: string;

  @Column()
  @Length(1, 500)
  physicalExamination!: string;

  @Column()
  @Length(1, 500)
  diagnosis!: string;

  @Column()
  @Length(1, 500)
  treatment!: string;

  @Column()
  @Length(1, 500)
  recommendation!: string;

  @Column({ nullable: true })
  @Length(1, 500)
  additionalNote!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
