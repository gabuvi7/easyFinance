import { NextRequest } from 'next/server';
import { encryptPassword } from '../../../lib/password-manager';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { fiscalPassword } = data;

  try {
    let encryptedData: string = '';
    encryptedData = encryptPassword(fiscalPassword);

    const response = new Response(JSON.stringify({ encryptedData }), {
      status: 200,
    });

    return response;
  } catch (error) {
    const response = new Response(`Error encrypting data: ${error}`, {
      status: 500,
    });
    return response;
  }
}
