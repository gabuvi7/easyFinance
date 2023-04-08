import { firestoreAdmin } from '../firebase/firebase.admin.config';

const encryptionKey = new Uint8Array(32); // Replace with a secure 32-byte (256-bit) encryption key
const algorithm = 'AES-CBC';

async function encryptPassword(password: string): Promise<string> {
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const key = await window.crypto.subtle.importKey(
    'raw',
    encryptionKey,
    { name: algorithm },
    false,
    ['encrypt']
  );
  const encryptedPassword = await window.crypto.subtle.encrypt(
    { name: algorithm, iv },
    key,
    new TextEncoder().encode(password)
  );

  return `${Buffer.from(iv).toString('hex')}:${Buffer.from(encryptedPassword).toString('hex')}`;
}

async function decryptPassword(encryptedPassword: string): Promise<string> {
  const [ivHex, encryptedHex] = encryptedPassword.split(':');
  const iv = Uint8Array.from(Buffer.from(ivHex, 'hex'));
  const encrypted = Uint8Array.from(Buffer.from(encryptedHex, 'hex'));
  const key = await window.crypto.subtle.importKey(
    'raw',
    encryptionKey,
    { name: algorithm },
    false,
    ['decrypt']
  );
  const decryptedPassword = await window.crypto.subtle.decrypt(
    { name: algorithm, iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decryptedPassword);
}

async function storePassword(username: string, password: string): Promise<void> {
  const encryptedPassword = await encryptPassword(password);
  await firestoreAdmin.collection('users').doc(username).set({
    password: encryptedPassword,
  });
}

async function getPassword(username: string): Promise<string | null> {
  const userDoc = await firestoreAdmin.collection('users').doc(username).get();
  if (!userDoc.exists) {
    return null;
  }

  const encryptedPassword = userDoc.data()!.password as string;
  return decryptPassword(encryptedPassword);
}

// Usage
(async () => {
  const username = 'user1';
  const password = 'password123';

  await storePassword(username, password);
  const decryptedPassword = await getPassword(username);

  console.log('The decrypted password is:', decryptedPassword); // Output: "The decrypted password is: password123"
})();
