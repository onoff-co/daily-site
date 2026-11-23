import { useInView } from '../hooks'

/**
 * 스크롤 등장 효과
 * variant: up(아래→위) | mask(줄 단위로 가려졌다 올라옴) | fade | pop(살짝 튀어나옴) | left | right | tilt
 */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, threshold, ...rest }) {
  const [ref, inView] = useInView({ threshold })
  return (
    <Tag
      ref={ref}
      className={`rv rv--${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** 여러 줄 제목: 줄마다 마스크 안에서 올라옴 */
export function MaskLines({ lines, as: Tag = 'h2', className = '', delay = 0, step = 110 }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <Tag ref={ref} className={`mask-lines ${inView ? 'is-in' : ''} ${className}`}>
      {lines.map((l, i) => (
        <span className="ml" key={i}>
          <span className="ml__in" style={{ '--d': `${delay + i * step}ms` }}>{l}</span>
        </span>
      ))}
    </Tag>
  )
}
