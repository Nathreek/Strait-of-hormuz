export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <p className="label-eyebrow text-signal">{eyebrow}</p>
      <h1 className="font-display text-2xl md:text-[28px] text-chart mt-1.5">
        {title}
      </h1>
      {description && <p className="text-mist text-sm mt-2 max-w-2xl leading-relaxed">{description}</p>}
    </div>
  );
}
