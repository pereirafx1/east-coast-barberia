interface SectionHeaderProps {
  label: string;
  title: string;
}

export default function SectionHeader({ label, title }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <p className="font-accent text-gold-400 text-sm mb-5 tracking-wide">
        — {label} —
      </p>
      <h2 className="font-heading text-6xl sm:text-7xl text-cream-200 tracking-stamp">
        {title}
      </h2>
      <div className="razor-divider mt-6 max-w-xs mx-auto">
        <span className="font-ui text-razor-500 text-xs tracking-widest uppercase">✦</span>
      </div>
    </div>
  );
}
