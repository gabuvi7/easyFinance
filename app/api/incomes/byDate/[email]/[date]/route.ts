import { NextRequest } from 'next/server';
import { firestoreAdmin } from '@firebaseEF/firebase.admin.config';
import { IncomeByDate, IncomeData } from '@interfaces/incomes.interface';

export async function GET(req: NextRequest, { params }: any) {
  const { email, date } = params;
  const incomeByDateRef = firestoreAdmin
    .collection('users')
    .doc(email)
    .collection('Income')
    .doc(date);

  try {
    const incomeByDate = await incomeByDateRef.get();
    const incomeByDateData = incomeByDate.data() as IncomeByDate;

    const response = new Response(JSON.stringify({ incomeByDateData }), { status: 200 });
    return response;
  } catch (error) {
    const response = new Response(`Error getting documents: ${error}`, {
      status: 500,
    });
    return response;
  }
}

export async function POST(req: NextRequest, { params }: any) {
  const { amount, sourceName } = (await req.json()) as IncomeData;
  const { email, date } = params;

  // Input validation
  if (!amount || Number.isNaN(amount) || amount <= 0 || !sourceName) {
    const response = new Response(JSON.stringify({ message: 'Invalid input data' }), {
      status: 400,
    });
    return response;
  }

  const incomeByDateRef = firestoreAdmin
    .collection('users')
    .doc(email)
    .collection('Income')
    .doc(date);

  try {
    // Use a transaction to update the income data
    await firestoreAdmin.runTransaction(async (transaction) => {
      const docSnapshot = await transaction.get(incomeByDateRef);

      if (docSnapshot.exists) {
        const incomeSources = docSnapshot.data()?.incomeSources || [];
        const totalIncome = (docSnapshot.data()?.totalIncome || 0) + amount;
        // get the last id in the array
        const id = incomeSources.length ? incomeSources[incomeSources.length - 1].id + 1 : 0;
        incomeSources.push({ amount, sourceName, id });
        transaction.update(incomeByDateRef, { totalIncome, incomeSources });
      } else {
        const incomeSources = [{ sourceName, amount, id: 0 }];
        const totalIncome = amount;
        transaction.set(incomeByDateRef, { date, totalIncome, incomeSources });
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
