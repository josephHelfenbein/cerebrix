import Features from "@/components/features-vertical";
import Section from "@/components/section";
import { Brain, Mic, BarChart } from "lucide-react";

const data = [
  {
    id: 1,
    title: "1. Create Your Profile",
    content:
      "Set up a personalized profile with your preferences and cognitive health information. Our AI uses this to tailor your experience.",
    image: "/cerebrix-profile.png",
    icon: <Brain className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Engage with Voice-Driven Games",
    content:
      "Interact with our cognitive games and exercises using simple voice commands. Our intuitive interface makes it easy for users of all abilities.",
    image: "/cerebrix-games.png",
    icon: <Mic className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Track Your Progress",
    content:
      "Monitor your cognitive health journey with detailed analytics. Caregivers and healthcare providers can access insights to provide better support.",
    image: "/cerebrix-analytics.png",
    icon: <BarChart className="w-6 h-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="How it works" subtitle="Your journey to better cognitive health">
      <Features data={data} />
    </Section>
  );
}
