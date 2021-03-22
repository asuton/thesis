import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
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

  @Column({ type: "varchar", length: 50 })
  title!: string;

  @Column({ type: "text" })
  medicalHistory!: string;

  @Column({ type: "text" })
  physicalExamination!: string;

  @Column({ type: "text" })
  diagnosis!: string;

  @Column({ type: "text" })
  treatment!: string;

  @Column({ type: "text" })
  recommendation!: string;

  @Column({ type: "text" })
  additionalNote!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
