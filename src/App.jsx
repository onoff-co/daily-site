import { useEffect, useState } from 'react'
import Reveal, { MaskLines } from './components/Reveal'
import Classes from './components/Classes'
import { Arrow, ArrowCircle, HandCircle, Spark, Wave } from './components/Doodles'
import { useCountUp, useInView, usePageScroll, useScrollProgress } from './hooks'
import { CURRICULUM, STEPS } from './data'

import logoKr from './assets/logo_kr_navy.png'
import logoKrWhite from './assets/logo_kr_white.png'
import symWhite from './assets/sym_white.png'
import symNavy from './assets/sym_navy.png'
import HeroSlides from './components/HeroSlides'
import heroImg from './assets/hero.jpg'
import heroDoc1 from './assets/hero_doc1.jpg'
import heroDoc2 from './assets/hero_doc2.jpg'
import heroDoc3 from './assets/hero_doc3.jpg'
import heroDoc4 from './assets/hero_doc4.jpg'
import heroClass from './assets/hero_class.jpg'
import introTable from './assets/intro_table.jpg'
import introDoor from './assets/intro_door.jpg'
import introTop from './assets/intro_top.jpg'
import trialImg from './assets/trial.jpg'

const NAV = [
  { id: 'intro', label: '소개' },
  { id: 'classes', label: '클래스' },
  { id: 'curriculum', label: '교육과정' },
  { id: 'steps', label: '등록 안내' },
]

/* ================= Header ================= */
function Header() {
  const { y, dir, p } = usePageScroll()
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const hidden = y > 700 && dir === 1 && !open
  return (
    <header className={`hd ${y > 24 ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''} ${open ? 'is-open' : ''}`}>
      <div className="hd__in">
        <a href="#top" className="hd__logo" aria-label="데일리영어학원 홈">
          <img src={logoKr} alt="Daily 영어학원" />
        </a>
        <nav className="hd__nav" aria-label="주요 메뉴">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'on' : ''} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hd__right">
          <a href="#" className="hd__kakao">카카오톡 문의</a>
          <a href="#trial" className="btn btn--navy btn--sm">
            수업문의 <ArrowCircle />
          </a>
          <button className="hd__menu" aria-label="메뉴 열기" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            <span /><span />
          </button>
        </div>
      </div>
      <span className="hd__progress" style={{ transform: `scaleX(${p})` }} />
    </header>
  )
}

/* ================= Hero ================= */
// 사진마다 '오늘 처음 한 말' 카드도 함께 바뀜
const HERO_SLIDES = [
  { src: heroImg, alt: '원어민 선생님과 아이들이 노란 테이블에 둘러앉아 영어로 이야기하는 모습', quote: '"Can I try?"', who: '초등 3학년 · Talk Table' },
  { src: heroDoc2, alt: '초등학생들이 노란 테이블에서 손을 들고 신나게 이야기하는 모습', quote: '"Me next!"', who: '초등 2학년 · Talk Table' },
  { src: heroDoc3, alt: '교복 입은 중학생들이 선생님과 둘러앉아 웃으며 토론하는 모습', quote: '"I think so!"', who: '중등 1학년 · Debate Table' },
  { src: heroClass, alt: '중학생이 원어민 선생님과 마주 앉아 영어로 대화하는 모습', quote: '"I get it!"', who: '중등 2학년 · Talk Table' },
  { src: heroDoc1, alt: '학생이 손짓하며 원어민 선생님과 웃으며 이야기하는 모습', quote: '"My turn!"', who: '중등 1학년 · Read Table' },
  { src: heroDoc4, alt: '후드티를 입은 학생이 자신의 생각을 영어로 말하는 모습', quote: '"Why not?"', who: '중등 3학년 · Debate Table', pos: '50% 30%' },
]

function Hero() {
  const photoRef = useScrollProgress({ start: 0.9, end: 0 })
  const [slide, setSlide] = useState(0)
  const s = HERO_SLIDES[slide]
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <Reveal as="span" className="pill" variant="up">평택 고덕 · 초·중등 영어 회화</Reveal>
          <MaskLines as="h1" className="h1" lines={['틀려도 괜찮아,', '먼저 말해보는 거야!']} delay={120} step={140} />
          <Reveal className="hero__sub" variant="fade" delay={520}>
            <span className="hl hl--wipe">Good try, every day.</span>
          </Reveal>
          <Reveal as="p" className="hero__desc" variant="up" delay={640}>
            거실처럼 편안한 교실에서 원어민 선생님, 친구들과{' '}<br />
            <b>한 테이블</b>에 둘러앉아 매일 영어로 소통하며 자신감을 키워요.
          </Reveal>
        </div>

        {/* 데스크톱: 글 아래 / 태블릿·모바일: 사진 아래로 */}
        <div className="hero__actions">
          <Reveal className="hero__cta" variant="up" delay={760}>
            <a href="#trial" className="btn btn--navy btn--lg">
              체험수업 신청하기 <ArrowCircle />
            </a>
            <a href="#classes" className="link-hl">클래스 둘러보기 ↓</a>
          </Reveal>
          <Reveal className="hero__hand" variant="fade" delay={1000}>
            <Arrow className="hero__arrow" />
            <span className="hand">자연스럽게 말하기 시작하는 곳!</span>
          </Reveal>
        </div>

        <div className="hero__visual">
          <Reveal className="hero__photo" variant="clip" delay={200}>
            <div className="hero__photo-in" ref={photoRef}>
              <HeroSlides slides={HERO_SLIDES} onChange={setSlide} />
            </div>
          </Reveal>
          <Reveal className="fw" variant="pop" delay={900}>
            <div className="fw__ic"><img src={symWhite} alt="" /></div>
            <div className="fw__t" key={slide} aria-live="polite">
              <small>FIRST WORD · 오늘 처음 한 말</small>
              <b>{s.quote}</b>
              <span>{s.who}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ================= Tapes ================= */
function Tapes() {
  const ref = useScrollProgress({ start: 1, end: 0 })
  const en = ['Good try, every day.', 'Daily English, Daily Confidence', 'Say it first.']
  const ko = ['ONE-TABLE CLASS', '프리토킹', '초등 · 중등 영어 회화', '틀려도 괜찮아, 먼저 말해보는 거야!']
  const row = (arr, icon) =>
    [0, 1, 2, 3].flatMap((k) =>
      arr.map((t, i) => (
        <span className="tape__item" key={`${k}-${i}`}>
          {t}
          {icon === 'star' ? <i className="tape__star">✦</i> : <img className="tape__sym" src={symNavy} alt="" />}
        </span>
      )),
    )
  return (
    <section className="tapes" ref={ref} aria-label="데일리 슬로건">
      {/* Figma 순서: 남색 아래, 노랑 위 */}
      <div className="tape tape--navy"><div className="tape__track">{row(en, 'star')}</div></div>
      <div className="tape tape--yellow"><div className="tape__track tape__track--rev">{row(ko, 'sym')}</div></div>
    </section>
  )
}

/* ================= Intro ================= */
function Stat({ n, title, desc, circled, delay }) {
  const [ref, inView] = useInView({ threshold: 0.6 })
  const v = useCountUp(n, inView, 1200 + n * 40)
  return (
    <div ref={ref} className={`stat ${inView ? 'is-in' : ''} ${circled ? 'circled' : ''}`} style={{ '--d': `${delay}ms` }}>
      <div className="stat__num">
        <HandCircle className="stat__circle" />
        <span>{v}</span>
      </div>
      <div className="stat__t">
        <b>{title}</b>
        <span>{desc}</span>
      </div>
    </div>
  )
}

function Polaroid({ img, cap, cls, delay, speed }) {
  const ref = useScrollProgress({ start: 1, end: 0 })
  return (
    <div className={`pol-wrap ${cls}`} ref={ref} style={{ '--speed': speed }}>
      <Reveal className="pol" variant="drop" delay={delay}>
        <span className="pol__tape" />
        <div className="pol__img"><img src={img} alt={cap} /></div>
        <span className="pol__cap hand">{cap}</span>
      </Reveal>
    </div>
  )
}

// 스크롤 내리면 손그림 동그라미가 8 → 10 → 2 순서로 하나씩 그려짐
const CIRCLE_AT = [0.12, 0.42, 0.72]

function Intro() {
  const [circled, setCircled] = useState(0)
  const statsRef = useScrollProgress({
    start: 0.9,
    end: 0.5,
    onChange: (p) => {
      const n = CIRCLE_AT.filter((x) => p >= x).length
      setCircled((v) => (v === n ? v : n))
    },
  })
  return (
    <section className="intro" id="intro">
      <div className="wrap intro__grid">
        <div className="intro__text">
          <MaskLines className="h2" lines={['거실 같은 편안한 교실,', '문제풀이 대신 -', '수다로 배우는 영어.']} />
          <Reveal as="p" className="lead" variant="up" delay={360}>
            책상 대신 테이블에 둘러앉아요.{' '}<br />
            집처럼 편안한 교실에서 아이들은 영어로 자기 이야기를 꺼내요.
          </Reveal>
          <div className="stats" ref={statsRef}>
            <Stat n={8} circled={circled > 0} title="한 테이블, 최대 8명까지 소그룹 수업" desc="모두에게 말할 차례가 와요." delay={0} />
            <Stat n={10} circled={circled > 1} title="엄선된 원어민 선생님 10명" desc="로테이션 수업으로 다양한 억양과 문화를 생생하게 경험합니다." delay={120} />
            <Stat n={2} circled={circled > 2} title="초등 · 중등 2단계 연계 과정" desc="또래 친구와 관심 있는 주제를 통해 자연스러운 소통." delay={240} />
          </div>
        </div>
        <div className="collage">
          <Polaroid img={introTable} cap="오늘의 수다 테이블" cls="p1" delay={0} speed={-40} />
          <Polaroid img={introDoor} cap="문을 열면 바로 거실!" cls="p2" delay={180} speed={-90} />
          <Polaroid img={introTop} cap="8명이 둘러앉아요 :)" cls="p3" delay={360} speed={-20} />
        </div>
      </div>
    </section>
  )
}

/* ================= Curriculum ================= */
const NODE_AT = [0.085, 0.287, 0.49, 0.69, 0.905] // 경로 위 노드 위치(가로 비율)

// 동그라미: 회색(아직) → 남색(지금 닿은 곳) → 노랑(지나온 곳), 끝까지 오면 모두 노랑
function Curriculum() {
  const [reached, setReached] = useState(-1)
  const [done, setDone] = useState(false)
  const ref = useScrollProgress({
    start: 0.85,
    end: 0.75,
    onChange: (p) => {
      const n = NODE_AT.filter((x) => p >= x * 0.98).length - 1
      setReached((r) => (r === n ? r : n))
      setDone(p >= 0.985)
    },
  })
  const tone = (i) => (i > reached ? 'grey' : i === reached && !done ? 'navy' : 'yellow')
  return (
    <section className="curr" id="curriculum">
      <div className="wrap">
        <div className="sec-head">
          <MaskLines as="h2" className="h2" lines={['데일리 교육과정']} />
          <Reveal className="sec-head__bar" variant="fade" delay={200} />
          <Reveal as="p" className="sec-head__desc" variant="up" delay={260}>
            소리와 글자부터 내 생각을 전하는 토론까지.{' '}<br />
            다섯 개의 테이블 수업이 초등에서 중등으로 깊어져요.
          </Reveal>
        </div>

        <div className="path" ref={ref}>
          <svg className="path__svg" viewBox="0 0 1190 190" preserveAspectRatio="none" aria-hidden="true">
            <path
              pathLength="1"
              d="M 0 50 L 120 50 C 240 50 240 190 360 190 C 480 190 480 50 600 50 C 720 50 720 190 840 190 C 960 190 960 50 1080 50 C 1140 50 1170 30 1190 0"
            />
          </svg>
          <img className={`path__thumb ${reached >= 4 ? 'on' : ''}`} src={symNavy} alt="" />
          {CURRICULUM.map((c, i) => (
            <div
              key={c.no}
              className={`node node--${tone(i)} ${i % 2 ? 'node--low' : ''} ${reached >= i ? 'on' : ''}`}
              style={{ '--x': `${NODE_AT[i] * 100}%` }}
            >
              <span className="node__no">{c.no}</span>
              <b className="node__name">{c.name}</b>
              <ul>
                <li><em className="tag tag--y">초등</em>{c.elem}</li>
                <li><em className="tag tag--n">중등</em>{c.mid}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= Steps ================= */
// 스크롤하면 점선이 왼쪽부터 이어지고, 선이 닿는 순서대로 01→04 숫자가 진해짐
const STEP_AT = [0.04, 0.3, 0.56, 0.82]

function Steps() {
  const [inRef, inView] = useInView({ threshold: 0.3 })
  const [lit, setLit] = useState(0)
  const ref = useScrollProgress({
    start: 0.9,
    end: 0.55,
    onChange: (p) => {
      const n = STEP_AT.filter((x) => p >= x).length
      setLit((v) => (v === n ? v : n))
    },
  })
  return (
    <section className="steps" id="steps">
      <div className="wrap" ref={inRef}>
        <MaskLines as="h2" className="h3" lines={['등록 절차']} />
        <div className={`steps__row ${inView ? 'is-in' : ''}`} ref={ref}>
          <Wave className="steps__wave" />
          {STEPS.map((s, i) => (
            <div className={`step ${i < lit ? 'step--hl' : ''}`} key={s.no} style={{ '--i': i }}>
              <span className="step__no">{s.no}</span>
              <b>{s.title}</b>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= Trial ================= */
function ChipGroup({ items, multi, defaults = [], navy }) {
  const [sel, setSel] = useState(defaults)
  const toggle = (v) => setSel((s) => (multi ? (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]) : [v]))
  return (
    <div className="chips">
      {items.map((v) => (
        <button type="button" key={v} className={`chip ${sel.includes(v) ? (navy ? 'on-navy' : 'on') : ''}`} onClick={() => toggle(v)}>
          {v}
        </button>
      ))}
    </div>
  )
}

function Trial() {
  const [sent, setSent] = useState(false)
  const photoRef = useScrollProgress({ start: 1, end: 0 })
  return (
    <section className="trial" id="trial">
      <div className="wrap trial__grid">
        <div className="trial__left">
          <MaskLines as="h2" className="h1 h1--trial" lines={['상담 신청']} />
          <Reveal as="p" className="trial__desc" variant="up" delay={200}>
            데일리 수업을 직접 경험해 보세요.{' '}<br />
            신청 후 영업일 기준 1일 이내에 연락드립니다.
          </Reveal>
          <Reveal className="trial__tags" variant="up" delay={300}>
            <span>평택 고덕</span><span>초·중등 영어 회화</span><span>소수 정예 8명</span>
          </Reveal>
          <div className="trial__photo-wrap" ref={photoRef}>
            <Reveal className="trial__photo" variant="tilt" delay={200}>
              <img src={trialImg} alt="원어민 수업에서 영어로 이야기하는 중학생" />
            </Reveal>
          </div>
        </div>

        <Reveal as="form" className="form" variant="up" delay={150} onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <div className="form__head">
            <b>상담 신청서</b>
            <span>1분이면 끝나요. * 표시는 필수 입력 항목입니다.</span>
          </div>
          <div className="form__2">
            <label>학부모 성함 *<input placeholder="학부모 성함을 입력해 주세요" required /></label>
            <label>연락처 *<input placeholder="010-0000-0000" inputMode="tel" required /></label>
          </div>
          <div className="form__f">
            <span className="form__l">학생 학년 *</span>
            <ChipGroup navy items={['초1', '초2', '초3', '초4', '초5', '초6']} defaults={['초3']} />
            <ChipGroup navy items={['중1', '중2', '중3']} />
          </div>
          <div className="form__f">
            <span className="form__l">관심 클래스</span>
            <ChipGroup multi items={['Sound', 'Read', 'Talk', 'Write', 'Debate', '아직 모르겠어요']} defaults={['Talk']} />
          </div>
          <div className="form__f">
            <span className="form__l">희망 상담 시간</span>
            <ChipGroup navy items={['평일 오전', '평일 오후', '토요일']} defaults={['평일 오전']} />
          </div>
          <label className="form__f">
            <span className="form__l">문의 내용</span>
            <textarea rows={3} placeholder="아이의 영어 경험, 성향이나 궁금한 점을 편하게 적어 주세요." />
          </label>
          <div className="form__agree">
            <label><input type="checkbox" defaultChecked required /> 개인정보 수집·이용에 동의합니다. (필수)</label>
            <a href="#">보기</a>
          </div>
          <button className={`btn btn--navy btn--block ${sent ? 'is-sent' : ''}`} type="submit">
            {sent ? '신청이 접수됐어요! 곧 연락드릴게요 :)' : <>상담 신청하기 <ArrowCircle /></>}
          </button>
        </Reveal>
      </div>
    </section>
  )
}

/* ================= Footer ================= */
function Footer() {
  const line = <span>Daily English, <em>Daily Confidence</em> · Good try, every day · </span>
  return (
    <footer className="ft">
      {/* 끊김 없이 계속 흐르는 슬로건 (같은 줄 2번 → -50% 이동 반복) */}
      <div className="ft__big" aria-hidden="true">
        <div className="ft__track">{line}{line}</div>
      </div>
      <div className="wrap ft__row">
        <img className="ft__logo" src={logoKrWhite} alt="Daily 영어학원" />
        <p className="ft__info">
          <b>데일리영어학원</b><br />
          경기도 평택시 고덕동 (주소) · T. 000-0000-0000<br />
          사업자등록번호 000-00-00000 · 대표 (이름)
        </p>
        <p className="ft__legal">개인정보처리방침 · 이용약관<br />© 2026 Daily English Academy</p>
      </div>
    </footer>
  )
}

function MobileBar() {
  const { y } = usePageScroll()
  return (
    <div className={`mbar ${y > 500 ? 'on' : ''}`}>
      <a href="#" className="mbar__k">카카오톡 문의</a>
      <a href="#trial" className="mbar__t">체험수업 신청 <Spark className="mbar__spark" /></a>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tapes />
        <Intro />
        <Classes />
        <Curriculum />
        <Steps />
        <Trial />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
