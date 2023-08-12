import { firestoreAdmin } from '../firebase/firebase.admin.config';

export async function getMonotributoInfo(category: string) {
  const monotributoRef = firestoreAdmin.collection('monotributo').doc(category!);
  const monotributoDoc = await monotributoRef.get();
  return monotributoDoc.data();
}

export async function getIIBBInfo(type: string) {
  const iibbRef = firestoreAdmin.collection('iibb').doc(type!);
  const iibbDoc = await iibbRef.get();
  return iibbDoc.data();
}
