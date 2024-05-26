export function generateVerificationCode(): number {
  return Math.floor(100000 + Math.random() * 900000); // 6 digit code
}

export function generateVerificationExpiry(): Date {
  return new Date(Date.now() + 60 * 60 * 1000); // 60 minutes from now
}
