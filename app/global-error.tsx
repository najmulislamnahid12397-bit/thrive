"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ErrorState } from "@/components/ui/states";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-paper-light text-ink antialiased min-h-screen flex items-center justify-center">
        <Container className="max-w-2xl text-center py-16">
          <ErrorState
            title="Something went wrong"
            description="An unexpected error occurred while rendering this page."
            action={
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button variant="primary" onClick={() => reset()}>
                  Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline">Back to Homepage</Button>
                </Link>
              </div>
            }
          />
        </Container>
      </body>
    </html>
  );
}
