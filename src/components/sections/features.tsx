import Features from "@/components/features-horizontal";
import Section from "@/components/section";
import { Brain, Mic, BarChart3, Users } from "lucide-react";

const data = [
  {
    id: 1,
    title: "Adaptive AI Games",
    content: "Personalized cognitive exercises that adjust to user's abilities.",
    image: "/cerebrix-adaptive-games.png",
    icon: <Brain className="h-6 w-6 text-primary" />,
  },
  {
    id: 2,
    title: "Voice-Driven Interface",
    content: "Intuitive voice commands for easy navigation and interaction.",
    image: "/cerebrix-voice-interface.png",
    icon: <Mic className="h-6 w-6 text-primary" />,
  },
  {
    id: 3,
    title: "Progress Tracking",
    content: "Detailed analytics to monitor cognitive health improvements.",
    image: "/cerebrix-progress-tracking.png",
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
  },
  {
    id: 4,
    title: "Caregiver Support",
    content: "Tools and insights for family members and healthcare providers.",
    image: "/cerebrix-caregiver-support.png",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
];

export default function Component() {
  return (
    <Section title="Features" subtitle="Empowering Cognitive Health with Technology">
      <Features collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
