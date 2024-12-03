import { SignedOut, SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
