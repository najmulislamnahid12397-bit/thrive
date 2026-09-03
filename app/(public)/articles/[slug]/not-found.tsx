import React from "react";
import Link from "next/link";
import { NotFoundState } from "@/components/ui/states";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function ArticleNotFound() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 md:py-24">
      <Container className="max-w-2xl text-center">
        <NotFoundState
          title="Article Not Found"
          description="The editorial story you requested does not exist, has an invalid slug, or may have been archived."
          action={
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/articles">
                <Button variant="primary">Explore All Articles</Button>
              </Link>
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
