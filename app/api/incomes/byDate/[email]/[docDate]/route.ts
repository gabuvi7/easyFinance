import { NextRequest } from 'next/server';
import { firestoreAdmin } from '@firebaseEF/firebase.admin.config';
import { IncomeByDate, IncomeData } from '@interfaces/incomes.interface';

export async function GET(req: NextRequest, { params }: any) {
  const { email, docDate } = params;
  const incomeByDateRef = firestoreAdmin
    .collection('users')
    .doc(email)
    .collection('Income')
    .doc(docDate);

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
  // Parse and validate input data
  const { amount, sourceName, date, currency } = (await req.json()) as IncomeData;
  const { email, docDate } = params;
  if (!amount || !Number.isFinite(amount) || amount <= 0 || !sourceName) {
    return new Response(JSON.stringify({ message: 'Invalid input data' }), {
      status: 400,
    });
  }

  // Reference to the Firestore document
  const incomeByDateRef = firestoreAdmin
    .collection('users')
    .doc(email)
    .collection('Income')
    .doc(docDate);

  try {
    // Use a transaction to update the income data
    await firestoreAdmin.runTransaction(async (transaction) => {
      const docSnapshot = await transaction.get(incomeByDateRef);

      if (docSnapshot.exists) {
        const data = docSnapshot.data() as IncomeByDate;
        const { totalIncome, incomeSources }: IncomeByDate = data;
        const newIncomeSources: IncomeData[] = incomeSources ?? [];
        const totalIncomeNumber = Number(totalIncome);
        const newTotalIncome = totalIncomeNumber + amount;

        // Get the last id in the array
        const id = newIncomeSources.length
          ? newIncomeSources[newIncomeSources.length - 1].id + 1
          : 0;
        newIncomeSources.push({ amount, sourceName, id, date, currency });

        transaction.update(incomeByDateRef, {
          totalIncome: newTotalIncome,
          incomeSources: newIncomeSources,
        });
      } else {
        const incomeSources = [{ sourceName, amount, id: 0, date, currency }];
        transaction.set(incomeByDateRef, { totalIncome: amount, incomeSources });
      }
    });

    return new Response(JSON.stringify({ message: 'Income data has been uploaded!' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Error uploading income data documents: ${error}`, { status: 500 });
  }
}
