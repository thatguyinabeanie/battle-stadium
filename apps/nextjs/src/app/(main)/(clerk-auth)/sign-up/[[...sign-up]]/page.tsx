import { SignedOut, SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center">
      <SignedOut>
        <SignUp />
      </SignedOut>
    </div>
  );
}
