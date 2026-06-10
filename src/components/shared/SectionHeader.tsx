interface SectionHeaderProps {
  title: string;
  titleZh?: string;
  subtitle?: string;
  subtitleZh?: string;
  isZh?: boolean;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  titleZh,
  subtitle,
  subtitleZh,
  isZh = false,
  centered = true,
  light = false,
  className = '',
}: SectionHeaderProps) {
  const displayTitle = isZh && titleZh ? titleZh : title;
  const displaySubtitle = isZh && subtitleZh ? subtitleZh : subtitle;

  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <h2
        className={`mb-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-surface-900'
        }`}
      >
        {displayTitle}
      </h2>
      {displaySubtitle && (
        <p
          className={`max-w-2xl text-base leading-7 ${
            centered ? 'mx-auto' : ''
          } ${
            light ? 'text-white/68' : 'text-surface-600'
          }`}
        >
          {displaySubtitle}
        </p>
      )}
    </div>
  );
}
