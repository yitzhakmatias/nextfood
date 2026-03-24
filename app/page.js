import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth_session');

  if (!authCookie?.value) {
    redirect('/login');
  }

  return (
    <main>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>
        You are logged in.
      </p>
    </main>
  );
}
