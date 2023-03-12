import { Metadata } from 'next';
import LoginStyled from '../../../components/Auth/Login';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};
function Login() {
  return <LoginStyled />;
}
export default Login;
