"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { ErrorState } from "@/components/ui/states";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-paper-light text-ink antialiased min-h-[70vh] flex items-center justify-center py-16">
      <Container className="max-w-2xl text-center">
        <ErrorState
          title="Something went wrong"
          description="An unexpected error occurred while loading this page."
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
    </div>
  );
}
