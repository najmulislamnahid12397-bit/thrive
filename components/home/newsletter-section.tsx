"use client";

import { useState } from "react";
import { Container, Section } from "@/components/ui/layout";
import { Input, FormLabel } from "@/components/ui/form-primitives";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NewsletterSectionProps {
  id?: string;
  className?: string;
  title?: React.ReactNode;
  description?: string;
}

export function NewsletterSection({
  id = "newsletter-email",
  className,
  title,
  description,
}: NewsletterSectionProps = {}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <Section className={cn("border-t border-neutral-100 bg-white pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-32 md:pb-36", className)}>
      <Container className="max-w-3xl text-center">
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1] mb-4 sm:mb-6">
          {title || (
            <>
              Understand more.<br />Discover better.<br />Stay informed.
            </>
          )}
        </h2>
        
        <p className="text-neutral-600 font-sans text-sm sm:text-base md:text-xl max-w-xl mx-auto mb-6 sm:mb-10 leading-relaxed">
          {description || "Join 50,000+ readers receiving our weekly editorial digest. Deep dives, research, and analysis delivered straight to your inbox."}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
            <div className="flex-1 text-left relative">
              <FormLabel htmlFor={id} className="sr-only">Email address</FormLabel>
              <Input 
                id={id} 
                type="email" 
                placeholder="Enter your email address" 
                className="h-12 sm:h-14 w-full rounded-none border-neutral-300 bg-white px-4 text-sm sm:text-base focus-visible:ring-neutral-900 focus-visible:z-10 relative"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== "idle"}
                required
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="h-12 sm:h-14 shrink-0 rounded-none bg-neutral-900 text-white hover:bg-neutral-800 px-6 sm:px-8 font-bold tracking-wide transition-colors sm:-ml-[1px] relative z-0 text-sm sm:text-base"
              disabled={status !== "idle"}
            >
              {status === "submitting" ? (
                "Subscribing..."
              ) : status === "success" ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Subscribed
                </span>
              ) : (
                "Subscribe"
              )}
            </Button>
          </div>
          
          <div className="mt-3 sm:mt-4 min-h-[20px]">
            {status === "idle" && (
              <p className="text-xs sm:text-[13px] text-neutral-500 text-center">
                We respect your inbox. Unsubscribe at any time.
              </p>
            )}
            {status === "success" && (
              <p className="text-xs sm:text-[13px] text-neutral-900 font-medium text-center">
                Thank you! Please check your inbox to confirm your subscription.
              </p>
            )}
          </div>
        </form>
      </Container>
    </Section>
  );
}
