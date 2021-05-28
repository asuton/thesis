import { ability } from "../../config/ability";
import { createContext } from "react";
import { createContextualCan } from "@casl/react";

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);
