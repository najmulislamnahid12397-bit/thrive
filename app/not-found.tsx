import React from "react";
import Link from "next/link";
import { NotFoundState } from "@/components/ui/states";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function RootNotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-16 md:py-24">
      <Container className="max-w-2xl text-center">
        <NotFoundState
          title="Page Not Found"
          description="The page you are looking for does not exist or may have been moved."
          action={
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/">
                <Button variant="primary">Back to Homepage</Button>
              </Link>
              <Link href="/articles">
                <Button variant="outline">Browse Articles</Button>
              </Link>
            </div>
          }
        />
      </Container>
    </div>
  );
}
