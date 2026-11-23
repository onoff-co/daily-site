import e1 from './assets/table_e1_sound.jpg'
import e2 from './assets/table_e2_read.jpg'
import e3 from './assets/table_e3.jpg'
import e4 from './assets/table_e4_write.jpg'
import e5 from './assets/table_e5_debate.jpg'
import m1 from './assets/table_m1_sound.jpg'
import m2 from './assets/table_m2_read.jpg'
import m3 from './assets/table_m3_talk.jpg'
import m4 from './assets/table_m4_write.jpg'
import m5 from './assets/table_m5_debate.jpg'

export const TABLES = ['Sound', 'Read', 'Talk', 'Write', 'Debate']

/** 데일리 클래스 슬라이드: 과정(초등/중등) × 5개 테이블 */
export const CLASSES = {
  elem: {
    label: '초등 과정',
    slides: [
      {
        name: 'Sound',
        img: e1,
        sub: '파닉스 · 소리와 글자 연결',
        desc: '알파벳 소리를 입과 귀로 먼저 익혀요.\n노래와 챈트로 소리를 따라 하다 보면\n글자가 저절로 읽히기 시작해요.',
        points: ['노래·챈트로 소리 익히기', '그림 카드로 소리와 글자 짝짓기', '오늘의 단어 소리 내어 읽기'],
      },
      {
        name: 'Read',
        img: e2,
        sub: '그림책 읽기 · 기초 어휘',
        desc: '그림책 한 권을 함께 펼쳐요.\n그림을 보며 이야기를 짐작하고, 소리 내어 읽으며\n오늘의 단어를 내 것으로 만들어요.',
        points: ['원어민 선생님과 그림책 함께 읽기', '이야기 속 핵심 단어 익히기', '읽은 내용 한 문장으로 말하기'],
      },
      {
        name: 'Talk',
        img: e3,
        sub: '문장 말하기 · 짧은 발표',
        desc: '오늘의 주제로 한 문장씩, 나만의 문장으로 자연스럽게 꺼내봅니다.\n틀려도 괜찮아요. 친구들과 질문하고 답하며, 한 주의 마지막 날엔\n자신감 넘치는 1분 스피치로 마무리해요.',
        points: ['오늘의 주제로 한 문장씩 말하기', '친구와 묻고 답하기', '금요일엔 자신감 1분 스피치'],
      },
      {
        name: 'Write',
        img: e4,
        sub: '문단 쓰기 · 일기 · 독후감',
        desc: '말로 꺼낸 문장을 글로 옮겨요.\n짧은 그림일기부터 시작해\n내 생각이 담긴 한 문단을 완성해요.',
        points: ['그림일기로 하루를 영어로', '읽은 책 독후감 세 문장 쓰기', '선생님 피드백으로 문장 다듬기'],
      },
      {
        name: 'Debate',
        img: e5,
        sub: '주제 토론 · 1분 스피치',
        desc: '좋아? 싫어? 왜 그렇게 생각해?\n쉬운 주제로 내 의견을 말하고,\n친구 의견에 대답하며 생각을 넓혀요.',
        points: ['쉬운 주제로 찬성·반대 말하기', '이유를 붙여 내 의견 말하기', '1분 스피치로 마무리'],
      },
    ],
  },
  mid: {
    label: '중등 과정',
    slides: [
      {
        name: 'Sound',
        img: m1,
        sub: '발음 교정 · 유창한 낭독',
        desc: '정확한 발음과 자연스러운 억양을 다듬어요.\n녹음하고 다시 들으며\n내 목소리로 또박또박 읽는 힘을 키워요.',
        points: ['발음·강세·억양 교정', '녹음하고 들어보는 낭독 연습', '원어민 선생님 1:1 피드백'],
      },
      {
        name: 'Read',
        img: m2,
        sub: '스토리 독해 · 핵심 어휘',
        desc: '짧은 소설과 기사로 긴 글을 읽어요.\n줄거리를 정리하고 핵심 어휘로\n내 생각을 말할 준비를 해요.',
        points: ['소설·기사 원문 읽기', '핵심 어휘·표현 정리', '읽은 내용 요약해서 말하기'],
      },
      {
        name: 'Talk',
        img: m3,
        sub: '실전 프리토킹 · 의견 말하기',
        desc: '일상과 관심사를 주제로 자유롭게 대화해요.\n생각을 정리해 이유와 예시를 붙여\n논리적으로 말하는 연습을 해요.',
        points: ['관심 주제로 프리토킹', '이유·예시 붙여 의견 말하기', '친구 의견에 질문하고 반박하기'],
      },
      {
        name: 'Write',
        img: m4,
        sub: '서술형 · 에세이 구조화',
        desc: '서론-본론-결론 구조로 내 생각을 글로 정리해요.\n학교 서술형 평가까지\n자연스럽게 대비돼요.',
        points: ['에세이 구조 짜기', '서술형 문항 연습', '첨삭 받고 다시 쓰기'],
      },
      {
        name: 'Debate',
        img: m5,
        sub: '찬반 토론 · 영어 프레젠테이션',
        desc: '한 주제를 두고 팀을 나눠 토론해요.\n자료를 찾아 발표하며\n사람들 앞에서 말하는 자신감을 키워요.',
        points: ['팀별 찬반 토론', '자료 조사 후 영어 발표', '질의응답으로 마무리'],
      },
    ],
  },
}

export const CURRICULUM = [
  { no: '01', name: 'Sound', elem: '파닉스, 소리와 글자 연결', mid: '발음교정, 유창한 낭독', tone: 'yellow' },
  { no: '02', name: 'Read', elem: '그림책 읽기, 기초 어휘', mid: '스토리 독해, 핵심 어휘', tone: 'yellow' },
  { no: '03', name: 'Talk', elem: '문장 말하기, 짧은 발표', mid: '실전 프리토킹, 논리적 의견 말하기', tone: 'navy' },
  { no: '04', name: 'Write', elem: '문단 쓰기, 일기 · 독후감', mid: '서술형·에세이 구조화', tone: 'grey' },
  { no: '05', name: 'Debate', elem: '주제 토론, 1분 스피치', mid: '찬반 토론, 영어 프레젠테이션', tone: 'grey' },
]

export const STEPS = [
  { no: '01', title: '상담 신청', desc: '영어 경험과 성향을 간단히\n알려주세요.' },
  { no: '02', title: '체험수업', desc: '딱딱한 레벨테스트 대신,\n원어민 선생님과\n실제 테이블 수업을 경험해요.' },
  { no: '03', title: '반 안내', desc: '체험수업 후, 수준과 성향에 딱 맞는\n테이블을 추천해 드려요.' },
  { no: '04', title: '수업 · 월간 리포트', desc: '매월 스스로 꺼낸 문장과 성장 기록을\n리포트로 보내드려요.' },
]
