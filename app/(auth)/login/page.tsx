import LoginForm from '@/app/_hex/auth/ui/components/LoginForm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | NextJS Course App',
  description: 'Sign in to continue using the app.',
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_session');

  if (authCookie?.value) {
    redirect('/');
  }

  return <LoginForm />;
}
