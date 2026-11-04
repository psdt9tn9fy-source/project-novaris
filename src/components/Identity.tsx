export function Mark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M6 31V9h6l16 17V9h6v22h-6L12 14v17H6Z" fill="currentColor" /><path d="M6 36h28M6 4h28" stroke="currentColor" strokeWidth=".6" /></svg>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '↗'}</span>;
}

export function Emblem({ variant = 0 }: { variant?: number }) {
  const symbols = [
    <><path d="m100 25 17 58 58 17-58 17-17 58-17-58-58-17 58-17Z" /><path d="m100 60 40 40-40 40-40-40Z" /></>,
    <><path d="m52 48 48-20 48 20v65l-48 61-48-61Z" /><path d="m75 60 25-11 25 11v45l-25 35-25-35ZM100 48v93" /></>,
    <><circle cx="100" cy="100" r="54" /><ellipse cx="100" cy="100" rx="25" ry="77" transform="rotate(35 100 100)" /><ellipse cx="100" cy="100" rx="25" ry="77" transform="rotate(-35 100 100)" /></>,
    <><path d="m100 24 65 114H35Z" /><path d="m100 175-65-114h130ZM100 65v70M65 100h70" /></>,
    <><path d="M130 36a68 68 0 1 0 24 109A63 63 0 0 1 130 36Z" /><path d="m128 61 8 23 23 8-23 8-8 23-8-23-23-8 23-8Z" /></>,
    <><path d="m100 28 22 44 49 7-36 35 9 49-44-23-44 23 9-49-36-35 49-7Z" /><circle cx="100" cy="102" r="25" /></>,
  ];
  return <svg className="emblem" viewBox="0 0 200 200" fill="none" aria-hidden="true"><circle cx="100" cy="100" r="92" stroke="currentColor" strokeOpacity=".18" strokeDasharray="2 7" /><g stroke="currentColor" strokeWidth="1.3">{symbols[variant]}</g><circle cx="100" cy="100" r="3" fill="currentColor" /></svg>;
}

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
