"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Drawer from "@/components/drawer";
import { Icons } from "@/components/icons";
import Menu from "@/components/menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { createClient } from '@/utils/supabase/client';

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [user, setUser] = useState(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setAddBorder(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 py-2 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto h-[40px]" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center">
            <nav className="mr-10">
              <Menu />
            </nav>

            <div className="gap-2 flex">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Dashboard
                  </Link>
                  <Button
                    variant="default"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full sm:w-auto text-background flex gap-2"
                    )}
                  >
                    <Icons.logo className="h-6 w-6" />
                    Get Started for Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <Drawer />
        </div>
      </div>
      <hr
        className={cn(
          "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0"
        )}
      />
    </header>
  );
}