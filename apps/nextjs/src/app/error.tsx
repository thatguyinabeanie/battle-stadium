"use client";

import { useEffect } from "react";

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

function ErrorComponent({ error, reset }: Readonly<ErrorComponentProps>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorComponent;
