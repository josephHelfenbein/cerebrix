// app/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard'); // Redirect to dashboard on load
  }, [router]);

  return null; // Optional: You can add a loading spinner here
}
