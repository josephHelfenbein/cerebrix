import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Clock, Users } from "lucide-react";

const challenges = [
  {
    title: "Cognitive Decline",
    description:
      "Individuals with dementia face progressive loss of memory and cognitive functions, impacting their daily lives and independence.",
    icon: Brain,
  },
  {
    title: "Limited Engagement",
    description:
      "Traditional therapy methods can be repetitive and unengaging, leading to decreased participation and slower progress.",
    icon: Clock,
  },
  {
    title: "Caregiver Burden",
    description:
      "Families and caregivers often struggle to provide consistent, effective cognitive stimulation alongside daily care responsibilities.",
    icon: Users,
  },
];

export default function Component() {
  return (
    <Section
      title="Challenges"
      subtitle="Dementia care presents unique obstacles for individuals and caregivers."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {challenges.map((challenge, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <challenge.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{challenge.title}</h3>
                <p className="text-muted-foreground">{challenge.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
