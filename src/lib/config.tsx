import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Cerebrix",
  description: "Engage, Exercise, Enhance",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Dementia", "Cognitive Therapy", "Voice-Driven", "AI", "Memory Care"],
  links: {
    email: "support@cerebrix.ai",
    twitter: "https://twitter.com/cerebrixai",
    discord: "https://discord.gg/cerebrix",
    github: "https://github.com/cerebrix",
    instagram: "https://instagram.com/cerebrixai/",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Cognitive Therapy",
          description: "Personalized mini-games and activities for dementia support.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Adaptive Games",
            description: "Mini-games that evolve with user's cognitive needs.",
          },
          {
            href: "#",
            title: "Voice Interaction",
            description: "User-friendly voice-driven interface for easy navigation.",
          },
          {
            href: "#",
            title: "Progress Tracking",
            description: "Smart analytics to monitor cognitive well-being.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Individuals",
            href: "#",
            description: "Personalized cognitive therapy at home.",
          },
          {
            title: "For Caregivers",
            href: "#",
            description: "Tools to support and monitor loved ones with dementia.",
          },
          {
            title: "For Healthcare Providers",
            href: "#",
            description: "Professional tools for cognitive assessment and therapy.",
          },
          {
            title: "For Memory Care Facilities",
            href: "#",
            description: "Scalable solutions for group and individual therapy sessions.",
          },
        ],
      },
    },
    {
      href: "/blog",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$19",
      period: "month",
      yearlyPrice: "$16",
      features: [
        "1 User Profile",
        "Basic Games Library",
        "Voice Interaction",
        "Weekly Progress Reports",
        "Email Support",
      ],
      description: "Perfect for individuals starting their cognitive journey",
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "FAMILY",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "Up to 5 User Profiles",
        "Extended Games Library",
        "Advanced Voice AI",
        "Daily Progress Insights",
        "Caregiver Dashboard",
      ],
      description: "Ideal for families and small care groups",
      buttonText: "Choose Family",
      isPopular: true,
    },
    {
      name: "PROFESSIONAL",
      href: "#",
      price: "$99",
      period: "month",
      yearlyPrice: "$82",
      features: [
        "Unlimited User Profiles",
        "Full Games & Activities Suite",
        "Custom Voice Interactions",
        "Real-time Analytics",
        "Priority Support",
      ],
      description: "For healthcare providers and large care facilities",
      buttonText: "Contact Sales",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Cerebrix?",
      answer: (
        <span>
          Cerebrix is a voice-driven web app that provides engaging, therapeutic mini-games and personalized wellness activities for individuals with dementia. It uses AI to adapt exercises to each user's cognitive needs.
        </span>
      ),
    },
    {
      question: "How does Cerebrix help individuals with dementia?",
      answer: (
        <span>
          Cerebrix offers cognitive stimulation through adaptive games, memory exercises, and relaxation activities. It tracks progress, adjusts difficulty levels, and provides insights to support cognitive well-being.
        </span>
      ),
    },
    {
      question: "Can Cerebrix be used without technical knowledge?",
      answer: (
        <span>
          Yes, Cerebrix is designed to be user-friendly with voice interactions and intuitive interfaces, making it accessible for individuals with varying levels of technical proficiency.
        </span>
      ),
    },
    {
      question: "How does the voice interaction work?",
      answer: (
        <span>
          Cerebrix uses advanced voice recognition to allow users to navigate the app, play games, and interact with activities using simple voice commands, enhancing accessibility and ease of use.
        </span>
      ),
    },
    {
      question: "Is my data secure with Cerebrix?",
      answer: (
        <span>
          Yes, Cerebrix takes data privacy and security seriously. All personal information and progress data are encrypted and stored securely, complying with healthcare data protection standards.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "How It Works", icon: null },
        { href: "#", text: "Testimonials", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Support Center", icon: null },
        { href: "#", text: "Caregiver Guide", icon: null },
        { href: "#", text: "Research", icon: null },
        { href: "#", text: "Privacy Policy", icon: null },
      ],
    },
    {
      title: "Connect",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <FaTwitter />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <FaYoutube />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
