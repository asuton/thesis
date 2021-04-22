import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
