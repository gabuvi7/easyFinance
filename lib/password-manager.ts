import crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const keyLength = 32;
const ivLength = 16;
const authTagLength = 16;

if (!process.env.ENCRYPT_PHRASE) {
  throw new Error('ENCRYPT_PHRASE environment variable is not set');
}

const passphrase = process.env.ENCRYPT_PHRASE as string;

function getKey(): Buffer {
  return crypto.createHash('sha256').update(passphrase).digest().subarray(0, keyLength);
}

export function encryptPassword(password: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const cipherText = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, cipherText]).toString('base64');
}

export function decryptPassword(encryptedPassword: string): string {
  try {
    const data = Buffer.from(encryptedPassword, 'base64');
    const iv = data.subarray(0, ivLength);
    const authTag = data.subarray(ivLength, ivLength + authTagLength);
    const cipherText = data.subarray(ivLength + authTagLength);

    const key = getKey();
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
    return decrypted.toString('utf8');
  } catch (error) {
    console.error(error);
    return '';
  }
}
