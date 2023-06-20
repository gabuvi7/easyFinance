import { NextRequest } from 'next/server';
import { firestoreAdmin } from '@firebaseEF/firebase.admin.config';
import { IncomesResponse } from '@/utils/interfaces/incomes.interface';

export async function GET(req: NextRequest, { params }: any) {
  const { email } = params;
  const incomeRef = firestoreAdmin.collection('users').doc(email).collection('Income');

  try {
    const income = await incomeRef.get();
    const incomeData = income.docs.map((doc) => doc.data() as IncomesResponse);
    const response = new Response(JSON.stringify({ incomeData }), { status: 200 });
    return response;
  } catch (error) {
    const response = new Response(`Error getting documents: ${error}`, {
      status: 500,
    });
    return response;
  }
}
