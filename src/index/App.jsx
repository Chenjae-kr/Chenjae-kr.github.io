import { useEffect, useMemo, useState } from 'react'
import ClickSpark from './components/ClickSpark'

const translations = {
  ko: {
    desc: '메인 대시보드입니다. 도구, 뉴스 및 포트폴리오를 탐색해 보세요.',
    dev_tools_desc: '유용한 개발 도구 및 유틸리티 모음입니다.',
    launch_app: '앱 실행하기',
    daily_news_desc: 'AI가 매일 큐레이션해주는 IT 뉴스 및 기술 업데이트입니다.',
    read_now: '지금 읽어보기',
    portfolio_desc: '개인 포트폴리오, 경력 및 프로젝트 소개입니다.',
    view_profile: '프로필 보기',
    blog_desc: '개발 경험, 트러블슈팅 및 기술 지식을 기록하는 블로그입니다.',
    visit_blog: '블로그 방문',
    footer: '© 2026 Chenjae. All rights reserved.',
  },
  en: {
    desc: 'Welcome to the main dashboard. Explore tools, news, and portfolio.',
    dev_tools_desc: 'A collection of useful development tools and utilities.',
    launch_app: 'Launch App',
    daily_news_desc: 'Automated AI-curated daily news and tech updates.',
    read_now: 'Read Now',
    portfolio_desc: 'My personal portfolio, experience, and projects.',
    view_profile: 'View Profile',
    blog_desc: 'A blog recording development experiences, troubleshooting, and tech knowledge.',
    visit_blog: 'Visit Blog',
    footer: '© 2026 Chenjae. All rights reserved.',
  },
}

const cards = [
  {
    href: 'https://chenjae-kr.github.io/dev-tools/',
    title: 'Dev Tools',
    descKey: 'dev_tools_desc',
    actionKey: 'launch_app',
    iconClass: 'setup-icon',
    icon: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  },
  {
    href: 'https://chenjae-kr.github.io/daily-news/',
    title: 'Daily News',
    descKey: 'daily_news_desc',
    actionKey: 'read_now',
    iconClass: 'news-icon',
    icon: <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h2m-2 4h2m-6 4h6" />,
  },
  {
    href: 'https://chenjae-kr.github.io/portfolio/',
    title: 'Portfolio',
    descKey: 'portfolio_desc',
    actionKey: 'view_profile',
    iconClass: 'portfolio-icon',
    icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>,
  },
  {
    href: 'https://chen-jae.tistory.com/',
    title: 'Tech Blog',
    descKey: 'blog_desc',
    actionKey: 'visit_blog',
    iconClass: 'blog-icon',
    external: true,
    icon: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></>,
  },
]

export default function App() {
  const [lang, setLang] = useState(localStorage.getItem('dashboard_lang') || 'ko')
  const [theme, setTheme] = useState(() => {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    return localStorage.getItem('dashboard_theme') || (prefersLight ? 'light' : 'dark')
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dashboard_theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('dashboard_lang', lang)
  }, [lang])

  const t = useMemo(() => translations[lang] || translations.ko, [lang])

  return (
    <>
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
        easing="ease-out"
        extraScale={1}
      />
      <section className="control-section" data-section="controls">
        <div className="controls-container fade-in-up">
          <button id="theme-toggle" className="toggle-btn" aria-label="Toggle Theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <svg className="theme-icon-dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg className="theme-icon-light" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>

          <button id="lang-toggle" className="toggle-btn" aria-label="Toggle Language" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
            <span className="lang-text">{lang === 'ko' ? 'EN' : 'KR'}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </button>
        </div>
      </section>

      <div className="dashboard-container">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        <section className="hero-section" data-section="hero">
          <header className="dashboard-header fade-in-up">
            <h1>Chenjae&apos;s <span className="text-gradient">Workspace</span></h1>
            <p>{t.desc}</p>
          </header>
        </section>

        <section className="cards-section" data-section="cards">
          <main className="dashboard-grid">
            {cards.map((card, idx) => (
              <a
                key={card.title}
                href={card.href}
                className={`glass-card stagger-${idx + 1}`}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
              >
                <div className={`card-icon ${card.iconClass}`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {card.icon}
                  </svg>
                </div>
                <h2>{card.title}</h2>
                <p>{t[card.descKey]}</p>
                <div className="card-action">
                  <span>{t[card.actionKey]}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </a>
            ))}
          </main>
        </section>

        <section className="footer-section" data-section="footer">
          <footer className="dashboard-footer fade-in-up stagger-5">
            <p>{t.footer}</p>
          </footer>
        </section>
      </div>
    </>
  )
}
