import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let theme = '';
  let status = 0;

  switch (req.method) {
    case 'GET':
      theme = req.headers.cookie?.includes('theme=light') ? 'light' : 'dark';
      status = 200;
      break;
    case 'POST':
      theme = req.body.theme ?? theme;
      res.setHeader('Set-Cookie', `theme=${theme}; path=/;`);
      status = 200;
      break;
    default:
      status = 403;
      break;
  }
  res.status(status).json({ theme });
}
