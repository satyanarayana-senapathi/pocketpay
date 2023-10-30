export const evaluatePasswordStrength = (password: string): string => {
  const MIN_LENGTH = 8
  const SPECIAL_CHARS_REGEX = /[!@#$%^&*(),.?":{}|<>]/
  const NUMBER_REGEX = /\d/
  const LOWERCASE_REGEX = /[a-z]/
  const UPPERCASE_REGEX = /[A-Z]/

  if (password.length < MIN_LENGTH) {
    return 'Password should have at least 8 characters.'
  }

  if (!SPECIAL_CHARS_REGEX.test(password)) {
    return 'Password should contain at least one special character (!@#$%^&*(),.?":{}|<>).'
  }

  if (!NUMBER_REGEX.test(password)) {
    return 'Password should contain at least one number (0-9).'
  }

  if (!LOWERCASE_REGEX.test(password)) {
    return 'Password should contain at least one lowercase letter (a-z).'
  }

  if (!UPPERCASE_REGEX.test(password)) {
    return 'Password should contain at least one uppercase letter (A-Z).'
  }

  return ''
}
