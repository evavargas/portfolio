"use client";

type HeroIdeaProps = {
  text: string;
};

export function HeroIdea({ text }: HeroIdeaProps) {
  const parts = text.split(/(\s+)/);

  return (
    <span className="hero-idea">
      {parts.map((part, index) => {
        if (!part.trim()) {
          return <span key={`space-${index}`}>{part}</span>;
        }

        const wordIndex = parts.slice(0, index).filter((value) => value.trim()).length;
        return (
          <span
            key={`word-${index}`}
            className="hero-word"
            style={{ animationDelay: `${420 + wordIndex * 55}ms` }}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
}
