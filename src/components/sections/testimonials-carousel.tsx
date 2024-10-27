import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { MdOutlineFormatQuote } from "react-icons/md";

const testimonials = [
  {
    quote: "Cerebrix has been a game-changer for my mother. The voice-driven interface makes it easy for her to engage with the cognitive exercises, and we've seen noticeable improvements in her memory and mood.",
    name: "Sarah Johnson",
    role: "Caregiver",
    image: "/testimonials/sarah-johnson.jpg"
  },
  {
    quote: "As a neurologist, I'm impressed by the adaptive nature of Cerebrix's games. They provide just the right level of challenge for each patient, making therapy both effective and enjoyable.",
    name: "Dr. Michael Chen",
    role: "Neurologist",
    image: "/testimonials/dr-chen.jpg"
  },
  {
    quote: "The progress tracking feature has been invaluable in our memory care facility. It allows us to provide personalized care and show families tangible results of their loved ones' cognitive therapy.",
    name: "Emily Rodriguez",
    role: "Memory Care Facility Director",
    image: "/testimonials/emily-rodriguez.jpg"
  },
  {
    quote: "I was skeptical at first, but Cerebrix has truly helped me stay mentally active. The voice commands are intuitive, and I look forward to my daily exercises.",
    name: "Robert Thompson",
    role: "Cerebrix User",
    image: "/testimonials/robert-thompson.jpg"
  },
];

export default function Component() {
  return (
    <Section
      title="Success Stories"
      subtitle="Hear from our users and healthcare professionals"
    >
      <Carousel>
        <div className="max-w-2xl mx-auto relative">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-2 pb-5">
                  <div className="text-center">
                    <MdOutlineFormatQuote className="text-4xl text-themeDarkGray my-4 mx-auto" />
                    <BlurFade delay={0.25} inView>
                      <h4 className="text-1xl font-semibold max-w-lg mx-auto px-10">
                        {testimonial.quote}
                      </h4>
                    </BlurFade>
                    <BlurFade delay={0.25 * 2} inView>
                      <div className="mt-8">
                        <Image
                          width={80}
                          height={80}
                          src={testimonial.image}
                          alt={`${testimonial.name}'s portrait`}
                          className="mx-auto rounded-full"
                        />
                      </div>
                    </BlurFade>
                    <div className="">
                      <BlurFade delay={0.25 * 3} inView>
                        <h4 className="text-1xl font-semibold my-2">
                          {testimonial.name}
                        </h4>
                      </BlurFade>
                    </div>
                    <BlurFade delay={0.25 * 4} inView>
                      <div className=" mb-3">
                        <span className="text-sm text-themeDarkGray">
                          {testimonial.role}
                        </span>
                      </div>
                    </BlurFade>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-2/12 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-2/12 bg-gradient-to-l from-background"></div>
        </div>
        <div className="md:block hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Section>
  );
}
