import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold" aria-label="404 - Page Not Found">
          404
        </h1>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the organization you're looking for.
        </p>
        <Link
          prefetch={false}
          href="/"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
