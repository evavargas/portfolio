import { ButtonGroup, type ButtonAction } from "@/components/ui/button-group";
import { Container } from "@/components/ui/container";
import { Surface } from "@/components/ui/surface";

type StatusPageProps = {
  eyebrow: string;
  title: string;
  body: string;
  actions: ButtonAction[];
};

/** Shared branded shell for not-found / error screens. */
export function StatusPage({ eyebrow, title, body, actions }: StatusPageProps) {
  return (
    <Container className="flex flex-1 flex-col justify-center py-16 md:py-24">
      <Surface padding="xl" radius="xl" tone="accent" className="max-w-2xl">
        <p className="section-title">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">{body}</p>
        <ButtonGroup actions={actions} className="mt-8" />
      </Surface>
    </Container>
  );
}
