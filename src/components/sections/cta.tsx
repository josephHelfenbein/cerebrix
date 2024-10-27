import Section from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Brain, Play } from "lucide-react";

export default function CtaSection() {
  return (
    <Section
      id="cta"
      title="Ready to enhance cognitive health?"
      subtitle="Start your journey with Cerebrix today."
      className="bg-primary/10 rounded-xl py-16"
    >
      <div className="flex flex-col w-full sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "default" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          <Brain className="h-6 w-6" />
          Start Your Free Trial
        </Link>
        <Link
          href="/demo"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full sm:w-auto flex gap-2"
          )}
        >
          <Play className="h-6 w-6" />
          Watch Demo
        </Link>
      </div>
      <p className="mt-6 text-sm text-center text-muted-foreground">
        No credit card required. 14-day free trial for all features.
      </p>
    </Section>
  );
}
