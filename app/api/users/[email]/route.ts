import { type NextRequest } from 'next/server';
import { firestoreAdmin } from '../../../../firebase/firebase.admin.config';

export async function PUT(req: NextRequest, { params }: any) {
  const data = await req.json();
  const { email } = params;
  const userRef = firestoreAdmin.collection('users').doc(email);
  try {
    await userRef.update(data);

    const response = new Response(JSON.stringify({ message: 'Updated!' }), {
      status: 200,
    });

    return response;
  } catch (error) {
    const response = new Response(JSON.stringify({ message: error }), {
      status: 500,
    });
    return response;
  }
}
