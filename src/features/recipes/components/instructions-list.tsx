interface InstructionsListProps {
  instructions: string[];
}

export function InstructionsList({ instructions }: InstructionsListProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-semibold text-lg text-foreground">Instructions</h2>
      <ol className="flex flex-col gap-6">
        {instructions.map((step, i) => (
          <li key={`step-${i}`} className="flex gap-4">
            <span className="flex-none flex items-center justify-center size-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-foreground pt-1">
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
