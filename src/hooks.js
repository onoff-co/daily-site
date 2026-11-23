import { useEffect, useRef, useState } from 'react'

// ?static → 애니메이션 없이 최종 상태로 (캡처·검수용)
export const prefersReduced = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('no-motion'))

/** 화면에 들어오면 true (한 번만) */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) { setInView(true); return }
    const t = options.threshold ?? 0.2
    const io = new IntersectionObserver(
      // 빠르게 스크롤해서 지나쳐 버린 요소(이미 화면 위로 올라간 것)도 켜줌
      ([e]) => {
        if ((e.isIntersecting && e.intersectionRatio >= t - 0.01) || e.boundingClientRect.top < 0) { setInView(true); io.disconnect() }
      },
      { threshold: [0, t], rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}

/* ---------- 스크롤 구독 (rAF 1회로 묶음) ---------- */
const subs = new Set()
let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => { ticking = false; subs.forEach((fn) => fn()) })
}
function subscribe(fn) {
  if (subs.size === 0) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  }
  subs.add(fn)
  fn()
  return () => {
    subs.delete(fn)
    if (subs.size === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }
}

/**
 * 요소가 화면을 지나가는 진행도(0~1)를 CSS 변수 --p 로 넣어줌.
 * start: 요소 top 이 viewport 의 어디에 있을 때 0 인지 (1 = 화면 아래 끝)
 * end:   요소 bottom 이 viewport 의 어디에 있을 때 1 인지
 */
export function useScrollProgress({ start = 1, end = 0, onChange } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) { el.style.setProperty('--p', 1); onChange?.(1); return }
    return subscribe(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const from = r.top - vh * start
      const to = r.bottom - vh * end
      const p = Math.min(1, Math.max(0, -from / (to - from || 1)))
      el.style.setProperty('--p', p.toFixed(4))
      onChange?.(p)
    })
  }, [])
  return ref
}

/** 페이지 전체 스크롤 상태 (헤더용) */
export function usePageScroll() {
  const [state, set] = useState({ y: 0, dir: 0, p: 0 })
  useEffect(() => {
    let last = window.scrollY
    return subscribe(() => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      set({ y, dir: Math.abs(y - last) < 4 ? 0 : y > last ? 1 : -1, p: max > 0 ? y / max : 0 })
      last = y
    })
  }, [])
  return state
}

/** 숫자 카운트업 */
export function useCountUp(target, run, duration = 1400) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (prefersReduced()) { setV(target); return }
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / duration)
      const e = 1 - Math.pow(1 - k, 4)
      setV(Math.round(target * e))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return v
}

export function useMedia(query) {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setM(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return m
}
