import * as crypto from 'crypto';
import { firestore } from '../firebase/firebase.admin.config';

const encryptionKey = 'your-32-byte-encryption-key'; // Reemplazar con una clave de 32 bytes (256 bits) segura
const algorithm = 'aes-256-cbc';

function encryptPassword(password: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey, 'hex'), iv);
  const encryptedPassword = Buffer.concat([
    cipher.update(Buffer.from(password, 'utf8')),
    cipher.final(),
  ]);

  return `${iv.toString('hex')}:${encryptedPassword.toString('hex')}`;
}

function decryptPassword(encryptedPassword: string): string {
  const [iv, encrypted] = encryptedPassword.split(':').map((part) => Buffer.from(part, 'hex'));
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey, 'hex'), iv);
  const decryptedPassword = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return decryptedPassword.toString('utf8');
}

async function storePassword(username: string, password: string) {
  const encryptedPassword = encryptPassword(password);
  await firestore.collection('users').doc(username).set({
    password: encryptedPassword,
  });
}

async function getPassword(username: string): Promise<string | null> {
  const userDoc = await firestore.collection('users').doc(username).get();
  if (!userDoc.exists) {
    return null;
  }

  const encryptedPassword = userDoc.data()!.password as string;
  return decryptPassword(encryptedPassword);
}

// Uso del algoritmo
(async () => {
  const username = 'user1';
  const password = 'password123';

  await storePassword(username, password);
  const decryptedPassword = await getPassword(username);

  console.log('La contraseña descifrada es:', decryptedPassword); // Salida: "La contraseña descifrada es: password123"
})();
