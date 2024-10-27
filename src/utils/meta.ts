// import { app } from '@/constants';
import type { Metadata, Viewport } from 'next';

export function constructMetadata({
  title = `Cerebrix`,
  description = `Cerebrix is a voice-driven web app for dementia support, offering personalized mini-games, music, and wellness activities. Powered by AI, it adapts to users' needs, tracks progress, and provides insights for caregivers—making cognitive therapy an empowering daily habit.`,
  image = '/opengraph-image.png',
  twitter = '/twitter-image.png',
  icons = '/assets/svgs/logo.svg',
  noIndex = false,
  url = 'https://hackru-2024-rouge.vercel.app',
}: {
  title?: string;
  description?: string;
  image?: string;
  twitter?: string;
  icons?: string;
  noIndex?: boolean;
  url?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `${title} - %s`,
    },
    description: description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitter],
      creator: '@OdnisMike',
    },
    icons: [
      {
        url: icons,
        href: icons,
      },
    ],
    manifest: '/manifest.webmanifest',
    metadataBase: new URL(url),

    other: {
      currentYear: new Date().getFullYear(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function constructViewport(): Viewport {
  return {
    width: 'device-width',
    height: 'device-height',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
    interactiveWidget: 'resizes-visual',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#BA9BDD' },
      { media: '(prefers-color-scheme: dark)', color: '#4B0082' },
    ],
    colorScheme: 'dark light',
  };
}
