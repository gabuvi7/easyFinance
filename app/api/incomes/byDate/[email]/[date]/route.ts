import { type NextRequest } from 'next/server';
import { firestoreAdmin } from '../../../../../../firebase/firebase.admin.config';

export async function GET(req: NextRequest, { params }: any) {
  const { email, date } = params;
  const incomeByDateRef = firestoreAdmin
    .collection('users')
    .doc(email)
    .collection('Income')
    .doc(date);

  try {
    const incomeByDate = await incomeByDateRef.get();
    const incomeByDateArray: any[] = [];
    incomeByDate.data()?.forEach((doc: { incomeSources: any; month: any; totalIncome: any }) => {
      incomeByDateArray.push({
        incomeSources: doc.incomeSources,
        month: doc.month,
        totalIncome: doc.totalIncome,
      });
    });

    const response = new Response(JSON.stringify({ incomeByDateArray }), {
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

export async function POST(req: NextRequest, { params }: any) {
  const data = await req.json();
  const { amount, sourceName } = data;
  const { email, date } = params;

  // Get a reference to the Income Month document
  const incomeByDateRef = firestoreAdmin
    .collection('users')
    .doc(email)
    .collection('Income')
    .doc(date);

  try {
    // Get the Income Month document
    incomeByDateRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        // If the document exists, update it
        const incomeSourcesData = docSnapshot.data()?.incomeSources;
        incomeSourcesData.push({ amount, sourceName });
        const totalIncome = docSnapshot.data()!.totalIncome + amount;
        incomeByDateRef.update({ totalIncome, incomeSourcesData });
      } else {
        // If the document does not exist, create it
        const incomeSources = [{ sourceName, amount }];
        const totalIncome = amount;
        incomeByDateRef.set({ date, totalIncome, incomeSources });
      }
    });
    const response = new Response(JSON.stringify({ message: 'Income data has been uploaded!' }), {
      status: 200,
    });
    return response;
  } catch (error) {
    const response = new Response(`Error uploading income data documents: ${error}`, {
      status: 500,
    });
    return response;
  }
}
