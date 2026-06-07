import crypto from 'crypto';

/**
 * Generates a random, secure, uppercase alphanumeric slug.
 * Example format: AB12CD34 (length = 8)
 */
export function generateSlug(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = crypto.randomBytes(length);
  let slug = '';
  for (let i = 0; i < length; i++) {
    slug += chars[bytes[i] % chars.length];
  }
  return slug;
}
