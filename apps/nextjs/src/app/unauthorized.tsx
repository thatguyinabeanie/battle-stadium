import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div>
      <h2>Unauthorized</h2>
      <p>Please log in to access this page.</p>
      <Link href="/sign-in">Go to Login</Link>
    </div>
  );
}