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
        className={`text-3xl sm:text-4xl font-bold mb-4 ${
          light ? 'text-white' : 'text-surface-900'
        }`}
      >
        {displayTitle}
      </h2>
      {displaySubtitle && (
        <p
          className={`text-lg max-w-2xl mx-auto ${
            light ? 'text-orange-200' : 'text-surface-600'
          }`}
        >
          {displaySubtitle}
        </p>
      )}
    </div>
  );
}
