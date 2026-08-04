import type { ReactNode } from "react";

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        width={800}
        height={500}
        className="project-media-image"
        loading="lazy"
        decoding="async"
      />
      <span className="project-media-overlay" aria-hidden="true" />
      <span className="project-media-cta">
        <CtaIcon />
        {cta}
      </span>
    </a>
  );
}

function CtaIcon(): ReactNode {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
