export const cleanEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};
