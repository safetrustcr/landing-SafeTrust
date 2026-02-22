import validator from 'validator';

export function isValidEmail(email: string): boolean {
  return validator.isEmail(email, { allow_utf8_local_part: false });
}
