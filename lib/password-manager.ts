import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
if (!process.env.ENCRYPT_PHRASE) {
  throw new Error('ENCRYPT_PHRASE environment variable is not set');
}

const phrase = process.env.ENCRYPT_PHRASE;
const encryptionKey = crypto.createHash('sha256').update(phrase).digest();
const iv = crypto.randomBytes(16);

export function encryptPassword(password: string): string {
  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
  const encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

export function decryptPassword(encryptedPassword: string): string {
  const [ivHex, encryptedHex] = encryptedPassword.split(':');
  const decipher = crypto.createDecipheriv(algorithm, encryptionKey, Buffer.from(ivHex, 'hex'));
  const decrypted = decipher.update(encryptedHex, 'hex', 'utf8') + decipher.final('utf8');

  return decrypted;
}
