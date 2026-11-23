import { useEffect, useRef, useState } from 'react'
import { CLASSES, TABLES } from '../data'
import { useInView, useScrollProgress, prefersReduced } from '../hooks'
import Reveal, { MaskLines } from './Reveal'
import { Spark } from './Doodles'
import symNavy from '../assets/sym_navy.png'

const NavArrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const STEP = 72 // 5개 테이블 → 72°
const ACTIVE_AT = 54 // 활성 테이블이 머무는 자리(오른쪽 아래)
const AUTOPLAY = 6000

export default function Classes() {
  const [course, setCourse] = useState('elem')
  const [idx, setIdx] = useState(2) // Talk 부터 시작 (디자인 기준)
  const [dir, setDir] = useState(1)
  const [turn, setTurn] = useState(-2 * STEP) // 누적 회전 각도 (한 방향으로 계속 돌게)
  const [drag, setDrag] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hover, setHover] = useState(false)
  const [stageRef, stageIn] = useInView({ threshold: 0.35 })
  const sectionRef = useScrollProgress({ start: 1, end: 0.2 })
  const startX = useRef(null)

  const data = CLASSES[course]
  const slide = data.slides[idx]
  const next = data.slides[(idx + 1) % 5]
  const prev = data.slides[(idx + 4) % 5]

  const go = (target, { user = true } = {}) => {
    const t = ((target % 5) + 5) % 5
    if (t === idx) return
    let delta = t - idx
    if (delta > 2) delta -= 5
    if (delta < -2) delta += 5
    setDir(delta > 0 ? 1 : -1)
    setTurn((v) => v - delta * STEP)
    setIdx(t)
    if (user) setAuto(false)
  }

  // 자동 넘김 (화면에 보이고, 마우스가 없을 때만 / 사용자가 직접 넘기면 멈춤)
  useEffect(() => {
    if (!auto || !stageIn || hover || prefersReduced()) return
    const t = setTimeout(() => go(idx + 1, { user: false }), AUTOPLAY)
    return () => clearTimeout(t)
  }, [auto, stageIn, hover, idx, course])

  // 키보드 ← →
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(idx + 1)
    if (e.key === 'ArrowLeft') go(idx - 1)
  }

  // 스와이프 · 드래그 (드래그하는 동안 궤도가 손을 따라 살짝 돎)
  const onDown = (e) => { startX.current = e.clientX }
  const onMove = (e) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    if (Math.abs(dx) > 6 && !e.currentTarget.hasPointerCapture?.(e.pointerId)) e.currentTarget.setPointerCapture?.(e.pointerId)
    setDrag(Math.max(-40, Math.min(40, dx * 0.12)))
  }
  const onUp = (e) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    startX.current = null
    setDrag(0)
    if (Math.abs(dx) > 48) go(dx < 0 ? idx + 1 : idx - 1)
  }

  const switchCourse = (c) => {
    if (c === course) return
    setDir(c === 'mid' ? 1 : -1)
    setCourse(c)
    setAuto(false)
  }

  const rot = turn + drag

  return (
    <section className="classes" id="classes" ref={sectionRef}>
      <div className="classes__bg" aria-hidden="true" />
      <div className="wrap">
        <div className="sec-head sec-head--dark">
          <MaskLines as="h2" className="h2" lines={['데일리 클래스']} />
          <Reveal className="sec-head__bar" variant="fade" delay={200} />
          <Reveal as="p" className="sec-head__desc" variant="up" delay={260}>
            듣고 읽은 내용을 스스로의 언어로 표현합니다.{' '}<br />
            다섯 개의 테이블을 돌며 소리부터 토론까지 이어져요.
          </Reveal>
          <Reveal className="toggle" variant="up" delay={360} role="tablist" aria-label="과정 선택" data-c={course}>
            <span className="toggle__thumb" />
            {Object.entries(CLASSES).map(([k, v]) => (
              <button key={k} role="tab" aria-selected={course === k} className={course === k ? 'on' : ''} onClick={() => switchCourse(k)}>
                {v.label}
              </button>
            ))}
          </Reveal>
        </div>

        <div
          className={`stage ${stageIn ? 'is-in' : ''}`}
          ref={stageRef}
          tabIndex={0}
          onKeyDown={onKey}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-roledescription="carousel"
        >
          {/* ---------- 왼쪽: 원테이블 궤도 ---------- */}
          <div
            className={`orbit ${drag ? 'is-drag' : ''}`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div className="orbit__ring" style={{ transform: `rotate(${rot}deg)` }} />
            <div className="orbit__table">
              {Object.entries(CLASSES).map(([ck, cv]) =>
                cv.slides.map((s, i) => {
                  const on = ck === course && i === idx
                  const before = ck === course ? i < idx : ck === 'elem'
                  return (
                    <img
                      key={ck + i}
                      src={s.img}
                      alt={on ? `${s.name} Table 수업 일러스트` : ''}
                      className={`orbit__img ${on ? 'on' : ''}`}
                      style={{ '--from': `${(before ? -1 : 1) * 38}deg` }}
                      draggable="false"
                    />
                  )
                }),
              )}
            </div>
            {TABLES.map((name, i) => {
              const base = ACTIVE_AT + i * STEP
              const on = i === idx
              return (
                <button
                  key={name}
                  className={`chip-orbit ${on ? 'on' : ''}`}
                  style={{ transform: `rotate(${base + rot}deg) translateX(var(--R)) rotate(${-base - rot}deg)` }}
                  onClick={() => go(i)}
                  aria-label={`${name} 테이블 보기`}
                >
                  <span className="chip-orbit__in">
                    {on ? <img src={symNavy} alt="" /> : <i>0{i + 1}</i>}
                    <b>{on ? `${name} Table` : name}</b>
                  </span>
                </button>
              )
            })}
          </div>

          {/* 양옆 화살표 */}
          <button className="stage__nav stage__nav--prev" onClick={() => go(idx - 1)} aria-label={`이전 테이블 · ${prev.name}`}>
            <NavArrow />
          </button>
          <button className="stage__nav stage__nav--next" onClick={() => go(idx + 1)} aria-label={`다음 테이블 · ${next.name}`}>
            <NavArrow />
          </button>

          {/* ---------- 오른쪽: 설명 ---------- */}
          <div className="detail" key={course + idx} data-dir={dir} aria-live="polite">
            <p className="detail__count a1">
              0{idx + 1} / 05 · {data.label}
            </p>
            <h3 className="detail__title">
              <span className="ml"><span className="ml__in a2">{slide.name} Table</span></span>
            </h3>
            <p className="detail__sub a3">{slide.sub}</p>
            <p className="detail__desc a4">{slide.desc}</p>
            <ul className="detail__points">
              {slide.points.map((p, i) => (
                <li key={p} className="a5" style={{ '--i': i }}>
                  <Spark className="spark" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="dots" role="tablist" aria-label="테이블 선택">
            {TABLES.map((n, i) => (
              <button
                key={n}
                className={`dot ${i === idx ? 'on' : ''} ${i === idx && auto && stageIn && !hover ? 'run' : ''}`}
                onClick={() => go(i)}
                aria-label={`${n} 테이블`}
                aria-selected={i === idx}
                role="tab"
                style={{ '--t': `${AUTOPLAY}ms` }}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
