import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginStyled from '../../components/Auth/Login';
import { authOptions } from '../../utils/const/auth.providers';

async function Login() {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');
  return <LoginStyled />;
}
export default Login;
