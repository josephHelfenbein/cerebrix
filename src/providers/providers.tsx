"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { MultisessionAppSupport } from "@clerk/clerk-react/internal";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Loader from "@/components/client/loader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
    >
      <MultisessionAppSupport>
        <ClerkLoading>
          <Loader />
        </ClerkLoading>
        <ClerkLoaded>
          {children}
        </ClerkLoaded>
      </MultisessionAppSupport>
    </ClerkProvider>
  );
}
