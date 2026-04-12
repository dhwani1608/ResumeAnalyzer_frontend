interface Props { score: number }

export function ScorePill({ score }: Props) {
  const styles =
    score >= 75
      ? { bg: '#ECFDF5', color: '#059669', border: '#10B98133' }
      : score >= 50
      ? { bg: '#FFFBEB', color: '#D97706', border: '#F59E0B33' }
      : { bg: '#FEF2F2', color: '#DC2626', border: '#EF444433' }

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
