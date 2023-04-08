import { firestoreAdmin } from '../../../firebase/firebase.admin.config';
import { AfipData } from '../../../utils/interfaces/afip.interface';

export async function GET() {
  const monotributoRef = firestoreAdmin.collection('monotributo');

  try {
    const monotributoCategories = await monotributoRef.get();
    const monotributoCategoriesArray: AfipData[] = [];
    monotributoCategories.forEach((doc) => {
      monotributoCategoriesArray.push({
        category: doc.id,
        anualBilling: doc.data().anualBilling,
        monthlyPayment: doc.data().monthlyPayment,
      });
    });

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
