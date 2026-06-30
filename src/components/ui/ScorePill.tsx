interface Props { score: number }

export function ScorePill({ score }: Props) {
  const styles =
    score >= 85
      ? { bg: '#F0FDF4', color: '#16A34A', border: '#16A34A20' }
      : score >= 60
      ? { bg: '#FFFBEB', color: '#B45309', border: '#F4B40030' }
      : { bg: '#FEF2F2', color: '#DC2626', border: '#DC262620' };

  return (
    <span style={{
      background: styles.bg,
      color: styles.color,
      border: `1px solid ${styles.border}`,
      borderRadius: '9999px',
      padding: '2px 10px',
      fontSize: '11px',
      fontFamily: 'var(--font-outfit, sans-serif)',
      fontWeight: 700,
      display: 'inline-block',
      letterSpacing: '0.02em',
    }}>
      {score}%
    </span>
  )
}
