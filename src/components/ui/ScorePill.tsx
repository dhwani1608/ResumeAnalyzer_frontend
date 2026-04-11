interface Props { score: number }

export function ScorePill({ score }: Props) {
  const styles =
    score >= 75
      ? { bg: '#0D3320', color: '#34C770', border: '#1A5C38' }
      : score >= 50
      ? { bg: '#2D1F00', color: '#F5A623', border: '#5C3D00' }
      : { bg: '#2D0A0A', color: '#E85454', border: '#5C1414' }

  return (
    <span style={{
      background: styles.bg,
      color: styles.color,
      border: `1px solid ${styles.border}`,
      borderRadius: '4px',
      padding: '2px 8px',
      fontSize: '12px',
      fontFamily: 'var(--font-mono, monospace)',
      fontWeight: 600,
      display: 'inline-block',
      letterSpacing: '0.02em',
    }}>
      {score}%
    </span>
  )
}
