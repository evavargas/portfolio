import Image from "next/image";
import { ExternalIcon } from "@/components/ui/icons";

type ProjectMediaLinkProps = {
  href: string;
  image: string;
  title: string;
  cta: string;
  opensNewTabLabel: string;
};

/** Intrinsic box so media stays 16:9 even if CSS chunks fail to load. */
const mediaFrameStyle = {
  position: "relative" as const,
  display: "block" as const,
  width: "100%",
  maxWidth: "100%",
  aspectRatio: "16 / 9",
  overflow: "hidden" as const,
};

const mediaImageStyle = {
  objectFit: "cover" as const,
  objectPosition: "top center",
};

export function ProjectMediaLink({
  href,
  image,
  title,
  cta,
  opensNewTabLabel,
}: ProjectMediaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-media"
      style={mediaFrameStyle}
      aria-label={`${cta}: ${title}. ${opensNewTabLabel}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 40vw"
        className="project-media-image"
        style={mediaImageStyle}
      />
      <span className="project-media-overlay" aria-hidden="true" />
      <span className="project-media-cta" aria-hidden="true">
        <ExternalIcon />
        {cta}
      </span>
    </a>
  );
}
