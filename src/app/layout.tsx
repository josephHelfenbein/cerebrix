import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { constructMetadata, constructViewport } from "@/utils";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { MultisessionAppSupport } from "@clerk/clerk-react/internal";
import Loader from "@/components/client/loader";


export const metadata: Metadata = constructMetadata();
export const viewport: Viewport = constructViewport();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth"
        )}
      >
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
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
              >
                {children}
                <ThemeToggle />
                <TailwindIndicator />
              </ThemeProvider>
            </ClerkLoaded>
          </MultisessionAppSupport>
        </ClerkProvider>
      </body>
    </html>
  );
}
