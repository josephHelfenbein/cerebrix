import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Users, Lightbulb, Puzzle, Code, ArrowRight } from "lucide-react";

const cerebrixInfo = [
  {
    title: "Inspiration",
    description: "Bringing gentle cognitive stimulation and meaningful engagement to dementia and Alzheimer's patients in assisted living facilities.",
    icon: Lightbulb,
  },
  {
    title: "Adaptive Minigames",
    description: "Brain-stimulating games like memory matching, name recognition, and math challenges that adapt to each user's performance.",
    icon: Puzzle,
  },
  {
    title: "AI Companion",
    description: "Voice-to-voice AI companion for social interaction and emotional support, enhancing the user experience.",
    icon: Brain,
  },
  {
    title: "Caregiver Insights",
    description: "Empowering caretakers with tools to monitor cognitive changes and receive insights on patient well-being over time.",
    icon: Users,
  },
  {
    title: "Tech Stack",
    description: "Built with React.js/Next.js, Vercel, Cloudflare Worker (Meta Llama 3), Clerk, Supabase, Spotify API, and Hume AI.",
    icon: Code,
  },
  {
    title: "Future Plans",
    description: "Expanding game library, enhancing caregiver reporting, improving cognitive tracking, and reaching more assisted living facilities.",
    icon: ArrowRight,
  },
];

export default function Component() {
  return (
    <Section
      title="About Cerebrix"
      subtitle="Empowering dementia care through technology and compassion"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {cerebrixInfo.map((info, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{info.title}</h3>
                <p className="text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Cerebrix combines engaging gameplay with progress tracking to support both patients and caregivers in their dementia care journey.
        </p>
      </div>
    </Section>
  );
}
