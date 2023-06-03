import { NextRequest } from 'next/server';
import { encryptPassword } from '../../../lib/password-manager';
import { DecryptDataRequest } from '../../../utils/interfaces/encrypt.interface';

type EncryptDataRequest = DecryptDataRequest;

export async function POST(req: NextRequest) {
  try {
    const { fiscalPassword } = (await req.json()) as EncryptDataRequest;

    if (!fiscalPassword) {
      const response = new Response('fiscalPassword is required', {
        status: 400,
      });
      return response;
    }
    const encryptedData = await encryptPassword(fiscalPassword);

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
