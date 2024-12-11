import Link from 'next/link';

export default function Forbidden() {
  return (
    <main role="main" className="flex min-h-screen flex-col items-center justify-center text-center">
      <div className="container mx-auto px-4">
        <h2>Forbidden</h2>
        <p>You are not authorized to access this resource.</p>
        <p className="mt-4 text-sm text-gray-600">
          If you believe this is an error, please contact support.
        </p>
        <Link href="/">Return Home</Link>
      </div>
    </main>
  );
}