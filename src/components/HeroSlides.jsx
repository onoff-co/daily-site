import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../hooks'

/**
 * 히어로 사진 디졸브 슬라이드
 * - 새 사진이 위에서 흐림 → 선명 + 페이드 인 (아래 사진은 그대로 두어 밝기가 꺼지지 않게)
 * - 보이는 동안 천천히 줌 아웃 (Ken Burns)
 * - 화면 밖이거나 탭이 숨겨지면 멈춤 / 움직임 줄이기 설정이면 첫 장만
 */
export default function HeroSlides({ slides, interval = 5200, onChange }) {
  const [cur, setCur] = useState(0)
  const [prev, setPrev] = useState(-1)
  const [visible, setVisible] = useState(true)
  const ref = useRef(null)

  // 화면에 보일 때만 넘김
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    const onVis = () => setVisible(!document.hidden && el.getBoundingClientRect().bottom > 0)
    document.addEventListener('visibilitychange', onVis)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  // 다음 사진 미리 받아두기
  useEffect(() => {
    const n = slides[(cur + 1) % slides.length]
    if (n) { const i = new Image(); i.src = n.src }
  }, [cur, slides])

  useEffect(() => {
    if (!visible || prefersReduced() || slides.length < 2) return
    const t = setTimeout(() => go(cur + 1), interval)
    return () => clearTimeout(t)
  }, [cur, visible, interval, slides.length])

  const go = (i) => {
    const n = ((i % slides.length) + slides.length) % slides.length
    if (n === cur) return
    setPrev(cur)
    setCur(n)
    onChange?.(n)
  }

  return (
    <div className="hs-root" ref={ref} style={{ '--hs-t': `${interval}ms` }}>
      <div className="hs">
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={i === cur ? s.alt : ''}
          aria-hidden={i !== cur}
          className={`hs__img ${i === cur ? 'is-cur' : ''} ${i === prev ? 'is-prev' : ''}`}
          style={s.pos ? { objectPosition: s.pos } : undefined}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          draggable="false"
        />
      ))}
      </div>
      <div className="hs__bars" role="tablist" aria-label="히어로 사진 선택">
        {slides.map((s, i) => (
          <button
            key={s.src}
            role="tab"
            aria-selected={i === cur}
            aria-label={`사진 ${i + 1}`}
            className={`hs__bar ${i === cur ? 'on' : ''} ${i === cur && visible ? 'run' : ''}`}
            onClick={() => go(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  )
}
