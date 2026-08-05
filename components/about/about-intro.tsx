import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ParagraphList } from "@/components/ui/prose";
import { Surface } from "@/components/ui/surface";

type AboutIntroProps = {
  paragraphs: string[];
  imageAlt: string;
};

export function AboutIntro({ paragraphs, imageAlt }: AboutIntroProps) {
  return (
    <section className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Reveal className="h-full">
        <Surface padding="lg" radius="xl" className="h-full">
          <ParagraphList items={paragraphs} />
        </Surface>
      </Reveal>
      <Reveal delayMs={90} className="h-full min-h-[20rem]">
        <Surface padding="none" radius="xl" className="relative h-full min-h-[20rem] overflow-hidden">
          <Image
            src="/img/profile.png"
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-top"
          />
        </Surface>
      </Reveal>
    </section>
  );
}
