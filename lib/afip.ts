import { firestoreAdmin } from '../firebase/firebase.admin.config';

export async function getMonotributoInfo(category: string) {
  const monotributoRef = firestoreAdmin.collection('monotributo').doc(category!);
  const monotributoDoc = await monotributoRef.get();
  return monotributoDoc.data();
}
