export const validateEmail = (email: string) => {
  const validMail = /\S+@\S+\.\S+/;
  return validMail.test(email);
};
