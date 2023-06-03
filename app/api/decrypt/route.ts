import { NextRequest } from 'next/server';
import { decryptPassword } from '../../../lib/password-manager';
import { DecryptDataRequest } from '../../../utils/interfaces/encrypt.interface';

export async function POST(req: NextRequest) {
  try {
    const { fiscalPassword } = (await req.json()) as DecryptDataRequest;

    if (!fiscalPassword) {
      const response = new Response('fiscalPassword is required', {
        status: 400,
      });
      return response;
    }

    if (!fiscalPassword) {
      throw new Error('fiscalPassword field is missing or empty');
    }

    const decryptedData = await decryptPassword(fiscalPassword);

    // Encrypt the decrypted data again before sending it in the response
    // Or use a secure communication protocol like HTTPS
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
