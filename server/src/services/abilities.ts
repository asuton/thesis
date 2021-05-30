import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  RawRuleOf,
  ForcedSubject,
} from "@casl/ability";
import { Authorization } from "../utils/constants";

interface User {
  id: string;
  authorization: Authorization;
}

type Actions = "create" | "read" | "update" | "delete";
type Subjects =
  | "Patient"
  | "Doctor"
  | "MedicalRecord"
  | "DiagnosticTesting"
  | "Appointment";

export type AppAbilities = [
  Actions,
  Subjects | ForcedSubject<Exclude<Subjects, "all">>
];

export type AppAbility = Ability<AppAbilities>;
const AppAbility = Ability as AbilityClass<AppAbility>;

export const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  new Ability<AppAbilities>(rules);

export const defineRulesFor = (user: User): RawRuleOf<AppAbility>[] => {
  const { can, rules } = new AbilityBuilder<AppAbility>(AppAbility);

  can("read", "Doctor");

  if (user.authorization === Authorization.Patient) {
    can("read", "Patient", { id: user.id });
    can("update", "Patient", { id: user.id });
    can("read", ["MedicalRecord", "DiagnosticTesting"], { patientId: user.id });
    can(["read", "create", "delete"], "Appointment", { patientId: user.id });
  }

  if (user.authorization === Authorization.Doctor) {
    can("read", "Patient");
    can("update", "Doctor", { id: user.id });
    can(["read", "create"], ["MedicalRecord", "DiagnosticTesting"]);
    can("update", "MedicalRecord", { doctorId: user.id });
    can(["read", "delete"], "Appointment", { doctorId: user.id });
  }

  if (user.authorization === Authorization.Admin) {
    can("create", "Doctor");
  }

  return rules;
};
