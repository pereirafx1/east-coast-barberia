interface SectionHeaderProps {
  label: string;
  title: string;
  light?: boolean;
}

export default function SectionHeader({ label, title, light = false }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <p className={`font-accent italic text-sm mb-4 tracking-widest ${light ? "text-gold-300" : "text-gold-400"}`}>
        {label}
      </p>
      <h2 className={`font-heading text-5xl sm:text-6xl font-bold uppercase tracking-stamp ${light ? "text-cream-100" : "text-cream-200"}`}>
        {title}
      </h2>
      <div className="ornament mt-6 max-w-xs mx-auto">
        <span className="text-gold-400 text-xs">◆</span>
      </div>
    </div>
  );
}
