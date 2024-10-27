import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Cerebrix",
  description: "Engage, Exercise, Enhance: AI-Powered Cognitive Support for Dementia Patients",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Dementia", "Alzheimer's", "Cognitive Therapy", "Voice-Driven", "AI", "Memory Care", "Adaptive Games"],
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
          title: "AI-Powered Cognitive Support",
          description: "Personalized mini-games and activities for dementia and Alzheimer's patients.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Adaptive Games",
            description: "Brain-stimulating minigames that evolve with user's cognitive needs.",
          },
          {
            href: "#",
            title: "Voice AI Companion",
            description: "Emotional support and social interaction through voice-to-voice AI.",
          },
          {
            href: "#",
            title: "Cognitive Tracking",
            description: "Smart analytics to monitor cognitive changes over time.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Patients",
            href: "#",
            description: "Engaging cognitive therapy through familiar and accessible activities.",
          },
          {
            title: "For Caregivers",
            href: "#",
            description: "Tools to support, monitor, and gain insights into patients' cognitive well-being.",
          },
          {
            title: "For Healthcare Providers",
            href: "#",
            description: "Professional tools for cognitive assessment and personalized therapy.",
          },
          {
            title: "For Assisted Living Facilities",
            href: "#",
            description: "Scalable solutions for group and individual cognitive support sessions.",
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
        "Voice AI Companion",
        "Weekly Cognitive Reports",
        "Email Support",
      ],
      description: "Perfect for individuals starting their cognitive support journey",
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
        "Daily Cognitive Insights",
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
        "Real-time Cognitive Analytics",
        "Priority Support",
      ],
      description: "For healthcare providers and assisted living facilities",
      buttonText: "Contact Sales",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is Cerebrix?",
      answer: (
        <span>
          Cerebrix is an AI-powered web app that provides engaging, therapeutic mini-games and personalized activities for individuals with dementia and Alzheimer's. It uses adaptive technology to tailor exercises to each user's cognitive needs, aiming to support memory retention and cognitive stimulation.
        </span>
      ),
    },
    {
      question: "How does Cerebrix help individuals with dementia and Alzheimer's?",
      answer: (
        <span>
          Cerebrix offers cognitive stimulation through adaptive games like card memory matching, name-face recognition, and math challenges. It also includes a voice AI companion for social interaction and emotional support. The app tracks progress, adjusts difficulty levels, and provides insights to support cognitive well-being over time.
        </span>
      ),
    },
    {
      question: "Can Cerebrix be used without technical knowledge?",
      answer: (
        <span>
          Yes, Cerebrix is designed to be user-friendly with voice interactions and intuitive interfaces, making it accessible for individuals with varying levels of technical proficiency. Caretakers can easily set up and manage patient accounts.
        </span>
      ),
    },
    {
      question: "How does the cognitive tracking work?",
      answer: (
        <span>
          Cerebrix tracks game performance over time, measuring accuracy and completion rates. This data is used to provide feedback on cognitive changes, enabling caretakers and healthcare providers to observe patterns and receive insights into the patient's cognitive well-being.
        </span>
      ),
    },
    {
      question: "Is my data secure with Cerebrix?",
      answer: (
        <span>
          Yes, Cerebrix takes data privacy and security seriously. All personal information, game performance data, and cognitive insights are encrypted and stored securely, complying with healthcare data protection standards.
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
