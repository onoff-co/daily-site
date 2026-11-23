/* 로고의 손그림 선 느낌을 살린 작은 SVG 장식들 */

export const Spark = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
      <path d="M8 2.5 L9.2 7.2" />
      <path d="M12 9.5 L17 7" />
      <path d="M3 9.8 L7.5 11.4" />
    </g>
  </svg>
)

export const Arrow = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 62 30" aria-hidden="true">
    <path className="draw" pathLength="1" d="M2 4 C 10 22, 30 30, 54 17" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path className="draw draw--late" pathLength="1" d="M45 12 L55 16.5 L49 26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const HandCircle = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 132 126" preserveAspectRatio="none" aria-hidden="true">
    <path
      className="draw"
      pathLength="1"
      d="M96 14 C 70 0, 22 6, 9 46 C -2 82, 30 118, 70 116 C 108 114, 128 84, 122 52 C 117 26, 92 10, 62 12"
      fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke"
    />
  </svg>
)

// 등록 절차 점선 — Figma 벡터(1120×30) 경로·점선 간격 그대로
export const Wave = ({ className = '' }) => (
  <svg className={className} viewBox="0 -6 1120 42" preserveAspectRatio="none" aria-hidden="true">
    <path
      d="M 0 15 C 67.2 -5 112 35 179.2 15 C 246.4 -5 291.2 -5 358.4 15 C 425.6 35 470.4 35 537.6 15 C 604.8 -5 649.6 -5 716.8 15 C 784 35 828.8 35 896 15 C 963.2 -5 1008 -5 1120 15"
      fill="none" stroke="currentColor" strokeWidth="3.17" strokeLinecap="round" strokeDasharray="2.12 10.58" vectorEffect="non-scaling-stroke"
    />
  </svg>
)

export const ArrowCircle = ({ className = '' }) => (
  <span className={`arrow-circle ${className}`} aria-hidden="true">
    <svg viewBox="0 0 16 16"><path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
)
