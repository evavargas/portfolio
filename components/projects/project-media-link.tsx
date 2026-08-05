import Image from "next/image";
import { ExternalIcon } from "@/components/ui/icons";

type ProjectMediaLinkProps = {
  href: string;
  image: string;
  title: string;
  cta: string;
};

export function ProjectMediaLink({ href, image, title, cta }: ProjectMediaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-media"
      aria-label={`${cta}: ${title}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 40vw"
        className="project-media-image"
      />
      <span className="project-media-overlay" aria-hidden="true" />
      <span className="project-media-cta">
        <ExternalIcon />
        {cta}
      </span>
    </a>
  );
}
