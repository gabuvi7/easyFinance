import { NextRequest } from 'next/server';
import { decryptPassword } from '../../../lib/password-manager';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { fiscalPassword } = data;

  try {
    const decryptedData: string = decryptPassword(fiscalPassword);

    const response = new Response(JSON.stringify({ decryptedData }), {
      status: 200,
    });

    return response;
  } catch (error) {
    const response = new Response(`Error decrypting data: ${error}`, {
      status: 500,
    });
    return response;
  }
}
