import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  RawRuleOf,
  ForcedSubject,
} from "@casl/ability";

interface User {
  id: string;
}

type Actions = "create" | "read" | "update" | "delete";
type Subjects = "Patient" | "Doctor" | "MedicalRecord";

export type AppAbilities = [
  Actions,
  Subjects | ForcedSubject<Exclude<Subjects, "all">>
];

export type AppAbility = Ability<AppAbilities>;
const AppAbility = Ability as AbilityClass<AppAbility>;

export const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  new Ability<AppAbilities>(rules);

export const defineRulesForPatient = (user: User): RawRuleOf<AppAbility>[] => {
  const { can, rules } = new AbilityBuilder<AppAbility>(AppAbility);
  can("read", "Patient", { id: user.id });
  can("read", "Doctor");
  can("update", "Patient");
  can("read", "MedicalRecord", { patientId: user.id });
  return rules;
};

export const defineRulesForDoctor = (user: User): RawRuleOf<AppAbility>[] => {
  const { can, rules } = new AbilityBuilder<AppAbility>(AppAbility);
  can("read", "Patient");
  can("read", "Doctor");
  can("update", "MedicalRecord", { doctorId: user.id });
  can("read", "MedicalRecord");
  return rules;
};
