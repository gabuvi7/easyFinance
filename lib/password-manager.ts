import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const keyLength = 32;
const ivLength = 16;
const saltLength = 16;

if (!process.env.ENCRYPT_PHRASE) {
  throw new Error('ENCRYPT_PHRASE environment variable is not set');
}

const passphrase = process.env.ENCRYPT_PHRASE as string;

function getKey(salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(passphrase, salt, 100000, keyLength, 'sha256', (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve(key);
      }
    });
  });
}

export async function encryptPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(saltLength);
  const key = await getKey(salt);
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const cipherText = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);

  return Buffer.concat([salt, iv, cipherText]).toString('base64');
}

export async function decryptPassword(encryptedPassword: string): Promise<string> {
  const data = Buffer.from(encryptedPassword, 'base64');
  const salt = data.subarray(0, saltLength);
  const iv = data.subarray(saltLength, saltLength + ivLength);
  const cipherText = data.subarray(saltLength + ivLength);

  const key = await getKey(salt);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  return decrypted.toString('utf8');
}
