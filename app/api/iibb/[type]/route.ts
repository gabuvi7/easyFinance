import { NextRequest } from 'next/server';
import { firestoreAdmin } from '@/firebase/firebase.admin.config';
import { IIIBBResponse } from '@/utils/interfaces/iibb.interface';

export async function GET(req: NextRequest, { params }: any) {
  const { type } = params;
  try {
    const iibbRef = firestoreAdmin.collection('iibb').doc(type);
    const iibb = await iibbRef.get();
    const iibbData = iibb.data() as IIIBBResponse;

    const response = new Response(JSON.stringify({ iibbData }), {
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
