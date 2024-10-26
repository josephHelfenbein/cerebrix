// app/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard'); // Redirect to the dashboard on load
  }, [router]);

  return null; // Optional loading state can go here if needed
}
