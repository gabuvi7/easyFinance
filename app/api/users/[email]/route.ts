import { type NextRequest } from 'next/server';
import { firestoreAdmin } from '../../../../firebase/firebase.admin.config';

export async function PUT(req: NextRequest, { params }: any) {
  const data = await req.json();
  const { email } = params;
  let status;
  let message;
  const userRef = firestoreAdmin.collection('users').doc(email);

  await userRef
    .update(data)
    .then(() => {
      status = 200;
      message = 'Updated';
    })
    .catch((error) => {
      status = 500;
      message = error;
    });

  return new Response(message, {
    status,
  });
}
