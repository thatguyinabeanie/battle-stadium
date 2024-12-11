import Link from "next/link";

export default function Unauthorized() {
  const returnUrl =
    typeof window !== "undefined" ? window.location.pathname : "";
  const signInUrl = `/sign-in${returnUrl ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`;

  return (
    <ErrorPageLayout
      title="Unauthorized"
      message="Please log in to access this page."
      actionLink={{
        href: signInUrl,
        text: "Go to Login",
      }}
    />
  );
}

interface ErrorPageLayoutProps {
  title: string;
  message: string;
  actionLink: {
    href: string;
    text: string;
  };
  children?: React.ReactNode;
}

function ErrorPageLayout({
  title,
  message,
  actionLink,
  children,
}: ErrorPageLayoutProps) {
  return (
    <main
      role="main"
      className="flex min-h-screen flex-col items-center justify-center text-center"
    >
      <div className="container mx-auto px-4">
        <h2>{title}</h2>
        <p>{message}</p>
        {children}
        <Link href={actionLink.href}>{actionLink.text}</Link>
      </div>
    </main>
  );
}
