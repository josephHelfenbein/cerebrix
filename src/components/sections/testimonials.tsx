"use client";

import Marquee from "@/components/magicui/marquee";
import Section from "@/components/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-primary/20 p-1 py-0.5 font-bold text-primary dark:bg-primary/20 dark:text-primary",
        className
      )}
    >
      {children}
    </span>
  );
};

export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      "border border-neutral-200 bg-white",
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    {...props}
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
        <Star className="size-4 text-yellow-500 fill-yellow-500" />
      </div>
    </div>

    <div className="flex w-full select-none items-center justify-start gap-5">
      <Image
        width={40}
        height={40}
        src={img || ""}
        alt={name}
        className="h-10 w-10 rounded-full ring-1 ring-border ring-offset-4"
      />

      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Caregiver",
    img: "/testimonials/sarah-johnson.jpg",
    description: (
      <p>
        Cerebrix has been a game-changer for my mother.
        <Highlight>
          The voice-driven interface makes it so easy for her to engage
        </Highlight>{" "}
        with the cognitive exercises. We've seen noticeable improvements in her memory and mood.
      </p>
    ),
  },
  {
    name: "Dr. Michael Chen",
    role: "Neurologist",
    img: "/testimonials/dr-chen.jpg",
    description: (
      <p>
        As a neurologist, I'm impressed by the adaptive nature of Cerebrix's games.
        <Highlight>
          They provide just the right level of challenge for each patient
        </Highlight>
        , making therapy both effective and enjoyable.
      </p>
    ),
  },
  {
    name: "Emily Rodriguez",
    role: "Memory Care Facility Director",
    img: "/testimonials/emily-rodriguez.jpg",
    description: (
      <p>
        The progress tracking feature has been invaluable in our facility.
        <Highlight>
          It allows us to provide personalized care and show families tangible results
        </Highlight>
        of their loved ones' cognitive therapy.
      </p>
    ),
  },
  {
    name: "Robert Thompson",
    role: "Cerebrix User",
    img: "/testimonials/robert-thompson.jpg",
    description: (
      <p>
        I was skeptical at first, but Cerebrix has truly helped me stay mentally active.
        <Highlight>
          The voice commands are intuitive, and I look forward to my daily exercises
        </Highlight>
        . It's become an essential part of my routine.
      </p>
    ),
  },
  {
    name: "Lisa Patel",
    role: "Occupational Therapist",
    img: "/testimonials/lisa-patel.jpg",
    description: (
      <p>
        Cerebrix complements our therapy sessions perfectly.
        <Highlight>
          The variety of cognitive exercises helps reinforce our in-person work
        </Highlight>
        , and patients enjoy the interactive nature of the platform.
      </p>
    ),
  },
  {
    name: "James Wilson",
    role: "Family Member",
    img: "/testimonials/james-wilson.jpg",
    description: (
      <p>
        Living far from my father, I worried about his cognitive health.
        <Highlight>
          Cerebrix gives me peace of mind, knowing he's engaging in daily mental exercises
        </Highlight>
        . The progress reports are a great way to stay connected to his care.
      </p>
    ),
  },
];

export default function Testimonials() {
  return (
    <Section
      title="Success Stories"
      subtitle="Hear from our users, caregivers, and healthcare professionals"
      className="max-w-8xl"
    >
      <div className="relative mt-6 max-h-screen overflow-hidden">
        <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
          {Array(Math.ceil(testimonials.length / 3))
            .fill(0)
            .map((_, i) => (
              <Marquee
                vertical
                key={i}
                className={cn({
                  "[--duration:60s]": i === 1,
                  "[--duration:30s]": i === 2,
                  "[--duration:70s]": i === 3,
                })}
              >
                {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: Math.random() * 0.8,
                      duration: 1.2,
                    }}
                  >
                    <TestimonialCard {...card} />
                  </motion.div>
                ))}
              </Marquee>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
      </div>
    </Section>
  );
}
