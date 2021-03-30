import { Entity } from "typeorm";
import User from "./User";

@Entity({ name: "admin" })
export default class Admin extends User {}
