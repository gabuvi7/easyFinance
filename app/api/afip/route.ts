import { firestoreAdmin } from '../../../firebase/firebase.admin.config';
import { AfipData } from '../../../utils/interfaces/afip.interface';

export async function GET() {
  try {
    const monotributoRef = firestoreAdmin.collection('monotributo');
    const monotributoCategories = await monotributoRef.get();
    const monotributoCategoriesArray = monotributoCategories.docs.map((doc) => {
      const { anualBilling, monthlyPayment } = doc.data();
      return {
        category: doc.id,
        anualBilling,
        monthlyPayment,
      };
    }) as AfipData[];

    const response = new Response(JSON.stringify({ monotributoCategoriesArray }), {
      status: 200,
    });

    return response;
  } catch (error) {
    const response = new Response(`Error getting documents: ${error}`, {
      status: 500,
    });
    return response;
  }
}
