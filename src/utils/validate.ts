export function validatePassword(password: string): boolean {
  // Check if password length is at least 8 characters
  if (password.length < 8) {
    return false;
  }

  // Check if password contains at least one number
  if (!/\d/.test(password)) {
    return false;
  }

  // Check if password contains at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }

  // Password is valid
  return true;
}

export function validateUsername(username: string): boolean {
  // Check if username length is between 3 and 20 characters
  if (username.length < 3 || username.length > 20) {
    return false;
  }

  // Check if username contains only letters, numbers, underscores, periods, or hyphens
  if (!/^[a-zA-Z0-9_-.]+$/.test(username)) {
    return false;
  }

  // Username is valid
  return true;
}

export function validateName(name: string): boolean {
  // Check if name contains only letters, spaces, and special characters in the French language
  if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/.test(name)) {
    return false;
  }

  // Check if name length is between 2 and 50 characters
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Name is valid
  return true;
}
