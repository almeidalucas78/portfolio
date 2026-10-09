// Portfolio component — accepts { theme: 'dark' | 'light', layout: 'desktop' | 'mobile' }
// Used inside design-canvas artboards (each artboard is a static design frame).

const { useState, useEffect, useRef } = React;

// ===== Theme tokens =====
const THEMES = {
  dark: {
    bg: '#080010',
    bgCard: '#110022',
    border: '#2a0d4d',
    borderNeon: '#b44dff',
    accent: '#b44dff',
    accent2: '#00f0ff',
    title: '#ffffff',
    body: '#a090b0',
    muted: '#5a4a70',
    nav: 'rgba(8, 0, 16, 0.72)',
    gridLine: 'rgba(180, 77, 255, 0.07)',
    gridLineStrong: 'rgba(180, 77, 255, 0.12)',
    glowTitle: '0 0 18px rgba(180,77,255,0.55), 0 0 38px rgba(180,77,255,0.25)',
    glowAccent: '0 0 14px rgba(180,77,255,0.45)',
    glowCyan: '0 0 14px rgba(0,240,255,0.55)',
    cardShadow: '0 0 0 1px rgba(180,77,255,0.35), 0 0 24px -6px rgba(180,77,255,0.35)',
    cardShadowHover: '0 0 0 1px rgba(180,77,255,0.9), 0 0 36px -4px rgba(180,77,255,0.7), 0 0 60px -10px rgba(0,240,255,0.35)',
    chip: 'rgba(180,77,255,0.12)',
    chipBorder: 'rgba(180,77,255,0.35)',
    input: 'rgba(255,255,255,0.03)'
  },
  light: {
    bg: '#f0edf5',
    bgCard: '#ffffff',
    border: '#e2d6f0',
    borderNeon: '#7b00cc',
    accent: '#7b00cc',
    accent2: '#0090a8',
    title: '#1a0b29',
    body: '#4a3a60',
    muted: '#8a7aa0',
    nav: 'rgba(240, 237, 245, 0.85)',
    gridLine: 'rgba(123, 0, 204, 0.05)',
    gridLineStrong: 'rgba(123, 0, 204, 0.09)',
    glowTitle: '0 0 14px rgba(123,0,204,0.18)',
    glowAccent: '0 0 12px rgba(123,0,204,0.35)',
    glowCyan: '0 0 12px rgba(0,144,168,0.35)',
    cardShadow: '0 0 0 1px rgba(123,0,204,0.25), 0 6px 20px -10px rgba(123,0,204,0.25)',
    cardShadowHover: '0 0 0 1.5px rgba(123,0,204,0.7), 0 12px 30px -8px rgba(123,0,204,0.35)',
    chip: 'rgba(123,0,204,0.08)',
    chipBorder: 'rgba(123,0,204,0.3)',
    input: 'rgba(123,0,204,0.04)'
  }
};

// ===== Content =====
const SKILLS = [
{ name: 'TypeScript', glyph: 'TS', color: '#3178c6' },
{ name: 'React', glyph: '⚛', color: '#61dafb' },
{ name: 'Next.js', glyph: 'N', color: '#ffffff' },
{ name: 'Node.js', glyph: '⬢', color: '#5fa04e' },
{ name: 'Python', glyph: 'py', color: '#ffd43b' },
{ name: 'PostgreSQL', glyph: '🐘', color: '#36a3df' },
{ name: 'GraphQL', glyph: '◇', color: '#e535ab' },
{ name: 'Docker', glyph: '🐳', color: '#0db7ed' },
{ name: 'AWS', glyph: 'aws', color: '#ff9900' },
{ name: 'Redis', glyph: 'R', color: '#dc382d' },
{ name: 'Tailwind', glyph: '~', color: '#38bdf8' },
{ name: 'Git', glyph: '⎇', color: '#f05033' }];


const EXPERIENCE = [
{ year: '2024 — agora', role: 'Senior Fullstack Engineer', company: 'Nebulix Labs', desc: 'Liderança técnica de plataforma SaaS multi-tenant. Arquitetura event-driven em Node.js + PostgreSQL, frontend Next.js servindo 40k usuários/dia.' },
{ year: '2022 — 2024', role: 'Fullstack Developer', company: 'Voltz Studio', desc: 'Desenvolvimento de produtos web para clientes fintech. Migração de monólito para microsserviços em TypeScript + AWS.' },
{ year: '2020 — 2022', role: 'Frontend Developer', company: 'Quanta Digital', desc: 'Construção de design system React reutilizado em 8 produtos. Otimizações de performance e acessibilidade (Lighthouse 95+).' },
{ year: '2019 — 2020', role: 'Junior Developer', company: 'Freelancer', desc: 'Sites institucionais, e-commerces e dashboards para pequenas e médias empresas.' }];


const PROJECTS = [
{ name: 'orbitkit', cat: 'fullstack', desc: 'CLI + dashboard para deploy de funções edge em múltiplos provedores. Stack: Bun, Hono, Postgres.', tags: ['TypeScript', 'Bun', 'Postgres'], stars: 1248 },
{ name: 'neon-charts', cat: 'frontend', desc: 'Biblioteca de gráficos React com tema dark-neon nativo, animações SVG e ~6kb gzip.', tags: ['React', 'SVG', 'TS'], stars: 832 },
{ name: 'pulse-api', cat: 'backend', desc: 'Microsserviço de notificações em tempo real via WebSockets + Redis Streams. 200k conexões simultâneas.', tags: ['Node', 'Redis', 'WS'], stars: 614 },
{ name: 'glitchy', cat: 'frontend', desc: 'Componente React de efeito glitch CRT puramente em CSS variables — sem canvas.', tags: ['React', 'CSS'], stars: 1903 },
{ name: 'forge-cli', cat: 'tools', desc: 'Scaffold opinativo para monorepos TS com presets de lint, test e CI prontos.', tags: ['Node', 'CLI'], stars: 412 },
{ name: 'lumen-db', cat: 'backend', desc: 'Driver Postgres com pool reativo e tipagem inferida a partir do schema SQL.', tags: ['TS', 'Postgres'], stars: 287 }];


const PROJECT_TABS = [
{ id: 'all', label: 'Todos' },
{ id: 'fullstack', label: 'Fullstack' },
{ id: 'frontend', label: 'Frontend' },
{ id: 'backend', label: 'Backend' },
{ id: 'tools', label: 'Tools' }];


const NAV_ITEMS = [
{ id: 'home', label: 'Início' },
{ id: 'about', label: 'Sobre' },
{ id: 'skills', label: 'Skills' },
{ id: 'exp', label: 'Experiência' },
{ id: 'projects', label: 'Projetos' },
{ id: 'contact', label: 'Contato' }];


// ===== Helpers =====
function Glow({ children, t, color }) {
  return (
    <span style={{ textShadow: color === 'cyan' ? `0 0 16px ${t.accent2}, 0 0 32px ${t.accent2}55` : t.glowTitle }}>
      {children}
    </span>);

}

function NeonBtn({ children, t, primary, onClick }) {
  return (
    <button
      onClick={onClick}
      className="neon-btn"
      style={{
        appearance: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 13,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontWeight: 600,
        padding: '14px 26px',
        borderRadius: 4,
        background: primary ? t.accent : 'transparent',
        color: primary ? t.bg : t.accent,
        border: `1.5px solid ${t.accent}`,
        boxShadow: primary ? `0 0 18px ${t.accent}88, 0 0 36px ${t.accent}44` : `0 0 12px ${t.accent}44, inset 0 0 12px ${t.accent}11`,
        transition: 'all .2s'
      }}>
      
      {children}
    </button>);

}

// ===== Sections =====
function SectionHeader({ kicker, title, t }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em',
        color: t.accent2, textTransform: 'uppercase', marginBottom: 12,
        textShadow: `0 0 10px ${t.accent2}66`
      }}>
        <span style={{ opacity: 0.6 }}>{'<'}</span> {kicker} <span style={{ opacity: 0.6 }}>{'/>'}</span>
      </div>
      <h2 style={{
        fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
        fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.05,
        color: t.title, margin: 0, letterSpacing: '-0.02em',
        textShadow: t.glowTitle
      }}>{title}</h2>
    </div>);

}

function Navbar({ t, mobile, active }) {
  return (
    <nav style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      height: 64, padding: mobile ? '0 20px' : '0 56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: t.nav,
      backdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${t.accent}55`,
      boxShadow: `0 0 24px -8px ${t.accent}66`
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, border: `1.5px solid ${t.accent}`, borderRadius: 4,
          display: 'grid', placeItems: 'center', fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700, color: t.accent, fontSize: 13,
          boxShadow: `0 0 12px ${t.accent}88, inset 0 0 8px ${t.accent}44`
        }}>L</div>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: t.title,
          textShadow: t.glowAccent
        }}>lucas.dev<span style={{ color: t.accent2 }}>_</span></span>
      </div>
      {!mobile &&
      <ul style={{ display: 'flex', gap: 28, margin: 0, padding: 0, listStyle: 'none' }}>
          {NAV_ITEMS.map((n) =>
        <li key={n.id} style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
          color: n.id === active ? t.title : t.body,
          position: 'relative', cursor: 'pointer',
          textShadow: n.id === active ? t.glowAccent : 'none'
        }}>
              {n.label}
              {n.id === active &&
          <span style={{
            position: 'absolute', left: 0, right: 0, bottom: -22, height: 2,
            background: t.accent, boxShadow: `0 0 8px ${t.accent}, 0 0 14px ${t.accent}88`
          }} />
          }
            </li>
        )}
        </ul>
      }
      {mobile ?
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ width: 22, height: 1.5, background: t.accent, boxShadow: `0 0 6px ${t.accent}` }} />
          <span style={{ width: 16, height: 1.5, background: t.accent, boxShadow: `0 0 6px ${t.accent}`, marginLeft: 'auto' }} />
          <span style={{ width: 22, height: 1.5, background: t.accent, boxShadow: `0 0 6px ${t.accent}` }} />
        </div> :

      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '6px 10px', border: `1px solid ${t.border}`, borderRadius: 999,
        background: t.bgCard
      }}>
          <span style={{
          width: 18, height: 18, borderRadius: '50%',
          background: t.accent, boxShadow: `0 0 10px ${t.accent}`,
          display: 'grid', placeItems: 'center', fontSize: 10, color: t.bg
        }}>☾</span>
          <span style={{ width: 18, height: 18, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 10, color: t.muted }}>☀</span>
        </div>
      }
    </nav>);

}

function Hero({ t, mobile }) {
  return (
    <section style={{
      minHeight: mobile ? 'auto' : 760,
      padding: mobile ? '120px 20px 80px' : '140px 80px 100px',
      position: 'relative',
      display: 'flex', alignItems: 'center'
    }}>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 820 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 12 : 14,
          color: t.accent2, marginBottom: 24, letterSpacing: '0.1em',
          textShadow: `0 0 12px ${t.accent2}88`
        }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: t.accent2, borderRadius: '50%', marginRight: 10, boxShadow: `0 0 8px ${t.accent2}` }} />
          disponível para projetos · 2026
        </div>
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
          fontSize: mobile ? 56 : 'clamp(72px, 9vw, 128px)',
          lineHeight: 0.95, letterSpacing: '-0.04em',
          color: t.title, margin: 0,
          textShadow: t.glowTitle
        }}>
          Lucas<br />
          <span style={{ color: t.accent, textShadow: `0 0 22px ${t.accent}, 0 0 50px ${t.accent}88` }}>Almeida.</span>
        </h1>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 14 : 18,
          color: t.body, marginTop: 28, letterSpacing: '0.04em'
        }}>
          <span style={{ color: t.accent2 }}>{'>'}</span> Desenvolvedor <span style={{ color: t.title, textShadow: t.glowAccent }}>Fullstack</span> · TypeScript · Cloud
        </div>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 15 : 17,
          lineHeight: 1.6, color: t.body, maxWidth: 560,
          marginTop: 28, marginBottom: 44
        }}>
          Eu construo produtos web rápidos, escaláveis e com personalidade — do schema do banco à última linha de CSS.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <NeonBtn t={t} primary>Ver projetos →</NeonBtn>
          <NeonBtn t={t}>Falar comigo</NeonBtn>
        </div>
      </div>

      {/* Decorative right-side terminal/code block */}
      {!mobile &&
      <div style={{
        position: 'absolute', right: 80, top: '50%', transform: 'translateY(-50%)',
        width: 360, padding: 22, borderRadius: 6,
        background: t.bgCard, border: `1px solid ${t.accent}66`,
        boxShadow: t.cardShadow,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.8,
        zIndex: 2
      }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${t.border}` }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent, boxShadow: `0 0 6px ${t.accent}` }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent2, boxShadow: `0 0 6px ${t.accent2}` }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.muted }} />
            <span style={{ marginLeft: 'auto', color: t.muted, fontSize: 11 }}>~/lucas — zsh</span>
          </div>
          <div style={{ color: t.muted }}><span style={{ color: t.accent2 }}>$</span> whoami</div>
          <div style={{ color: t.title, textShadow: t.glowAccent }}>lucas.almeida</div>
          <div style={{ color: t.muted, marginTop: 8 }}><span style={{ color: t.accent2 }}>$</span> cat stack.txt</div>
          <div style={{ color: t.body }}>typescript • react • node</div>
          <div style={{ color: t.body }}>postgres • redis • aws</div>
          <div style={{ color: t.muted, marginTop: 8 }}><span style={{ color: t.accent2 }}>$</span> <span style={{ color: t.accent, textShadow: t.glowAccent }}>build_</span><span className="cursor" style={{ background: t.accent, display: 'inline-block', width: 8, height: 14, marginLeft: 2, verticalAlign: 'middle', boxShadow: `0 0 8px ${t.accent}` }} /></div>
        </div>
      }

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: mobile ? 30 : 50, left: mobile ? 20 : 80,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: t.muted,
        letterSpacing: '0.2em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        scroll <span style={{ width: 32, height: 1, background: t.accent, boxShadow: `0 0 6px ${t.accent}` }} /> ↓
      </div>
    </section>);

}

function About({ t, mobile }) {
  return (
    <section style={{ padding: mobile ? '60px 20px' : '120px 80px', position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="01 · sobre" title="Sobre mim" t={t} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '280px 1fr',
        gap: mobile ? 32 : 64,
        alignItems: 'start'
      }}>
        {/* Profile placeholder */}
        <div style={{
          width: mobile ? 200 : 260, height: mobile ? 200 : 260,
          margin: mobile ? '0 auto' : 0,
          border: `1.5px solid ${t.accent}`,
          background: `repeating-linear-gradient(135deg, ${t.bgCard} 0px, ${t.bgCard} 8px, ${t.bg} 8px, ${t.bg} 16px)`,
          borderRadius: 4,
          position: 'relative',
          boxShadow: t.cardShadow
        }}>
          <div style={{
            position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
            color: t.muted, fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.15em'
          }}>foto de perfil</div>
          <div style={{ position: 'absolute', top: -8, left: -8, width: 18, height: 18, borderTop: `2px solid ${t.accent2}`, borderLeft: `2px solid ${t.accent2}`, boxShadow: `0 0 8px ${t.accent2}` }} />
          <div style={{ position: 'absolute', top: -8, right: -8, width: 18, height: 18, borderTop: `2px solid ${t.accent2}`, borderRight: `2px solid ${t.accent2}`, boxShadow: `0 0 8px ${t.accent2}` }} />
          <div style={{ position: 'absolute', bottom: -8, left: -8, width: 18, height: 18, borderBottom: `2px solid ${t.accent2}`, borderLeft: `2px solid ${t.accent2}`, boxShadow: `0 0 8px ${t.accent2}` }} />
          <div style={{ position: 'absolute', bottom: -8, right: -8, width: 18, height: 18, borderBottom: `2px solid ${t.accent2}`, borderRight: `2px solid ${t.accent2}`, boxShadow: `0 0 8px ${t.accent2}` }} />
        </div>
        <div>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 14 : 16,
            lineHeight: 1.75, color: t.body, margin: 0
          }}>
            Sou desenvolvedor fullstack há <span style={{ color: t.title, textShadow: t.glowAccent }}>7 anos</span>, com foco em produtos web que precisam ser bonitos <em style={{ color: t.accent, fontStyle: 'normal' }}>e</em> rápidos. Comecei como freelancer fazendo sites WordPress e hoje lidero a arquitetura de uma plataforma SaaS multi-tenant em produção.
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 14 : 16,
            lineHeight: 1.75, color: t.body, marginTop: 20
          }}>
            Gosto de problemas onde frontend e backend conversam de verdade — design systems, sincronização em tempo real, performance, observability. Minhas linguagens favoritas são TypeScript e Python, e eu acredito que <span style={{ color: t.accent2, textShadow: t.glowCyan }}>boas APIs são UX</span>.
          </p>
          <div style={{
            marginTop: 36, display: 'grid',
            gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, 1fr)',
            gap: 20
          }}>
            {[
            { k: '7+', v: 'anos de experiência' },
            { k: '40+', v: 'projetos entregues' },
            { k: '12', v: 'open-source ativos' }].
            map((s) =>
            <div key={s.v} style={{
              padding: '18px 16px', border: `1px solid ${t.border}`,
              borderRadius: 4, background: t.bgCard,
              boxShadow: t.cardShadow
            }}>
                <div style={{
                fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 700,
                color: t.accent, textShadow: t.glowAccent, lineHeight: 1
              }}>{s.k}</div>
                <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                color: t.muted, marginTop: 8, letterSpacing: '0.08em'
              }}>{s.v}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function Skills({ t, mobile }) {
  return (
    <section style={{ padding: mobile ? '60px 20px' : '120px 80px', position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="02 · stack" title="Tecnologias" t={t} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: 14
      }}>
        {SKILLS.map((s) =>
        <div key={s.name} className="skill-card" style={{
          padding: mobile ? 16 : 22,
          background: t.bgCard,
          border: `1px solid ${t.border}`,
          borderRadius: 4,
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: t.cardShadow,
          transition: 'all .25s'
        }}>
            <div style={{
            width: 40, height: 40, borderRadius: 4,
            display: 'grid', placeItems: 'center',
            background: `${t.accent}18`,
            border: `1px solid ${t.accent}55`,
            boxShadow: `inset 0 0 10px ${t.accent}22`,
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
            color: t.accent, fontSize: 14,
            textShadow: t.glowAccent
          }}>{s.glyph}</div>
            <div>
              <div style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600,
              color: t.title, fontSize: 15, letterSpacing: '-0.01em'
            }}>{s.name}</div>
              <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: t.muted, marginTop: 3, letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}>{s.glyph === '⚛' || s.glyph === 'TS' || s.glyph === 'N' || s.glyph === '~' ? 'frontend' : s.glyph === '⬢' || s.glyph === 'py' || s.glyph === '🐘' || s.glyph === 'R' || s.glyph === '◇' ? 'backend' : 'devops'}</div>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function Experience({ t, mobile }) {
  return (
    <section style={{ padding: mobile ? '60px 20px' : '120px 80px', position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="03 · histórico" title="Experiência" t={t} />
      <div style={{ position: 'relative', paddingLeft: mobile ? 28 : 40 }}>
        {/* vertical line */}
        <div style={{
          position: 'absolute', left: mobile ? 6 : 10, top: 6, bottom: 6,
          width: 1, background: t.accent,
          boxShadow: `0 0 10px ${t.accent}, 0 0 20px ${t.accent}66`
        }} />
        {EXPERIENCE.map((e, i) =>
        <div key={i} style={{
          position: 'relative', marginBottom: i === EXPERIENCE.length - 1 ? 0 : 44
        }}>
            {/* node */}
            <div style={{
            position: 'absolute', left: mobile ? -28 : -36, top: 4,
            width: 14, height: 14, borderRadius: '50%',
            background: t.bg, border: `2px solid ${t.accent}`,
            boxShadow: `0 0 10px ${t.accent}, 0 0 20px ${t.accent}88`
          }}>
              <div style={{
              position: 'absolute', inset: 2, borderRadius: '50%',
              background: t.accent, boxShadow: `0 0 6px ${t.accent}`
            }} />
            </div>
            <div style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color: t.accent2, letterSpacing: '0.12em',
            textShadow: t.glowCyan
          }}>{e.year}</div>
            <h3 style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
            fontSize: mobile ? 20 : 26, color: t.title,
            margin: '8px 0 4px', letterSpacing: '-0.01em',
            textShadow: t.glowAccent
          }}>
              {e.role} <span style={{ color: t.muted, fontWeight: 400 }}>@ {e.company}</span>
            </h3>
            <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 13 : 14,
            lineHeight: 1.65, color: t.body, margin: 0, maxWidth: 720
          }}>{e.desc}</p>
          </div>
        )}
      </div>
    </section>);

}

function Projects({ t, mobile, activeTab = 'all' }) {
  const filtered = activeTab === 'all' ? PROJECTS : PROJECTS.filter((p) => p.cat === activeTab);
  return (
    <section style={{ padding: mobile ? '60px 20px' : '120px 80px', position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="04 · trabalhos" title="Projetos selecionados" t={t} />
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 12
      }}>
        {PROJECT_TABS.map((tab) =>
        <span key={tab.id} style={{
          padding: '8px 16px', borderRadius: 999,
          background: tab.id === activeTab ? t.accent : 'transparent',
          border: `1px solid ${tab.id === activeTab ? t.accent : t.border}`,
          color: tab.id === activeTab ? t.bg : t.body,
          letterSpacing: '0.06em', textTransform: 'lowercase',
          boxShadow: tab.id === activeTab ? `0 0 14px ${t.accent}88` : 'none',
          cursor: 'pointer'
        }}>{tab.label}</span>
        )}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: 18
      }}>
        {filtered.map((p, i) =>
        <div key={p.name} className="project-card" style={{
          padding: 26,
          background: t.bgCard,
          border: `1px solid ${t.border}`,
          borderRadius: 4,
          boxShadow: i === 0 ? t.cardShadowHover : t.cardShadow,
          transition: 'all .25s',
          position: 'relative', overflow: 'hidden'
        }}>
            <div style={{
            position: 'absolute', top: 0, left: 0, width: 4, bottom: 0,
            background: i % 2 === 0 ? t.accent : t.accent2,
            boxShadow: i % 2 === 0 ? `0 0 14px ${t.accent}` : `0 0 14px ${t.accent2}`
          }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
                color: t.accent2, letterSpacing: '0.18em',
                textTransform: 'uppercase', textShadow: t.glowCyan
              }}>./{p.cat}</div>
                <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: 24, color: t.title, margin: '6px 0 0',
                letterSpacing: '-0.02em', textShadow: t.glowAccent
              }}>{p.name}</h3>
              </div>
              <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
              color: t.muted, display: 'flex', alignItems: 'center', gap: 6
            }}>
                <span style={{ color: t.accent2 }}>★</span>{p.stars.toLocaleString()}
              </div>
            </div>
            <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
            lineHeight: 1.65, color: t.body, margin: '0 0 18px'
          }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {p.tags.map((tag) =>
            <span key={tag} style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              padding: '4px 9px', borderRadius: 3,
              background: t.chip, border: `1px solid ${t.chipBorder}`,
              color: t.accent, letterSpacing: '0.08em'
            }}>{tag}</span>
            )}
            </div>
            <div style={{
            display: 'flex', gap: 18, fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12, color: t.body, paddingTop: 16,
            borderTop: `1px solid ${t.border}`
          }}>
              <span style={{ color: t.accent2, textShadow: t.glowCyan }}>↗ live</span>
              <span style={{ color: t.accent, textShadow: t.glowAccent }}>⎇ source</span>
              <span style={{ marginLeft: 'auto', color: t.muted }}>case study →</span>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function Contact({ t, mobile }) {
  return (
    <section style={{ padding: mobile ? '60px 20px 80px' : '120px 80px', position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="05 · contato" title="Vamos construir algo" t={t} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: mobile ? 40 : 80
      }}>
        <div>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: mobile ? 14 : 16,
            lineHeight: 1.7, color: t.body, margin: 0
          }}>
            Tenho um produto SaaS, um MVP ou só uma ideia rabiscada no guardanapo? <br />
            <span style={{ color: t.title, textShadow: t.glowAccent }}>Me chama.</span> Respondo em até 24h.
          </p>
          <div style={{ marginTop: 36 }}>
            {[
            { label: 'email', value: 'lucas@almeida.dev' },
            { label: 'localização', value: 'São Paulo, BR · GMT-3' }].
            map((r) =>
            <div key={r.label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '14px 0', borderBottom: `1px solid ${t.border}`,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13
            }}>
                <span style={{ color: t.muted, textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 11 }}>{r.label}</span>
                <span style={{ color: t.title, textShadow: t.glowAccent }}>{r.value}</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
            {[
            { name: 'GitHub', icon: '⎇' },
            { name: 'LinkedIn', icon: 'in' },
            { name: 'X', icon: '𝕏' }].
            map((s) =>
            <a key={s.name} style={{
              width: 46, height: 46, borderRadius: 4,
              border: `1.5px solid ${t.accent}`,
              background: t.bgCard,
              display: 'grid', placeItems: 'center',
              fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
              color: t.accent, textShadow: t.glowAccent,
              boxShadow: `0 0 14px ${t.accent}55, inset 0 0 10px ${t.accent}22`,
              fontSize: 16, cursor: 'pointer'
            }}>{s.icon}</a>
            )}
          </div>
        </div>
        <form style={{
          display: 'flex', flexDirection: 'column', gap: 18,
          padding: 28, background: t.bgCard,
          border: `1px solid ${t.accent}55`, borderRadius: 4,
          boxShadow: t.cardShadow
        }}>
          {[
          { label: 'nome', placeholder: 'seu nome', type: 'text' },
          { label: 'e-mail', placeholder: 'voce@dominio.com', type: 'email' }].
          map((f) =>
          <div key={f.label}>
              <label style={{
              display: 'block', fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, color: t.accent2, letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: 8,
              textShadow: t.glowCyan
            }}>{'>'} {f.label}</label>
              <div style={{
              padding: '12px 14px', background: t.input,
              border: `1px solid ${t.border}`, borderRadius: 3,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 14,
              color: t.muted
            }}>{f.placeholder}</div>
            </div>
          )}
          <div>
            <label style={{
              display: 'block', fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, color: t.accent2, letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: 8,
              textShadow: t.glowCyan
            }}>{'>'} mensagem</label>
            <div style={{
              padding: '12px 14px', background: t.input,
              border: `1px solid ${t.border}`, borderRadius: 3,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 14,
              color: t.muted, minHeight: 96
            }}>conta um pouco do projeto…</div>
          </div>
          <div style={{ marginTop: 6 }}>
            <NeonBtn t={t} primary>Enviar mensagem ↗</NeonBtn>
          </div>
        </form>
      </div>

      <div style={{
        marginTop: mobile ? 60 : 100, paddingTop: 28,
        borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        color: t.muted, letterSpacing: '0.1em', textTransform: 'uppercase'
      }}>
        <span>© 2026 lucas.almeida — handcrafted in são paulo</span>
        <span><span style={{ color: t.accent2 }}>●</span> all systems operational</span>
      </div>
    </section>);

}

// ===== Grid background =====
function GridBg({ t }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        linear-gradient(to right, ${t.gridLine} 1px, transparent 1px),
        linear-gradient(to bottom, ${t.gridLine} 1px, transparent 1px),
        linear-gradient(to right, ${t.gridLineStrong} 1px, transparent 1px),
        linear-gradient(to bottom, ${t.gridLineStrong} 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px, 40px 40px, 200px 200px, 200px 200px',
      pointerEvents: 'none', zIndex: 1
    }} />);

}

function GlowOrb({ t, top, left, color, size = 480 }) {
  return (
    <div style={{
      position: 'absolute', top, left,
      width: size, height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color}, transparent 65%)`,
      filter: 'blur(40px)', opacity: 0.4,
      pointerEvents: 'none', zIndex: 0
    }} />);

}

// ===== Main Portfolio =====
function Portfolio({ theme = 'dark', layout = 'desktop' }) {
  const t = THEMES[theme];
  const mobile = layout === 'mobile';
  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: t.bg, color: t.body,
      fontFamily: 'JetBrains Mono, monospace',
      position: 'relative', overflow: 'hidden',
      cursor: theme === 'dark' ?
      `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><line x1='10' y1='2' x2='10' y2='18' stroke='%23b44dff' stroke-width='1.5'/><line x1='2' y1='10' x2='18' y2='10' stroke='%23b44dff' stroke-width='1.5'/></svg>") 10 10, crosshair` :
      `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><line x1='10' y1='2' x2='10' y2='18' stroke='%237b00cc' stroke-width='1.5'/><line x1='2' y1='10' x2='18' y2='10' stroke='%237b00cc' stroke-width='1.5'/></svg>") 10 10, crosshair`
    }}>
      <GridBg t={t} />
      {theme === 'dark' &&
      <>
          <GlowOrb t={t} top={-120} left={-180} color="#b44dff55" size={600} />
          <GlowOrb t={t} top={1800} left={mobile ? -200 : 800} color="#00f0ff33" size={500} />
          <GlowOrb t={t} top={3200} left={mobile ? -100 : -200} color="#b44dff44" size={500} />
        </>
      }
      {theme === 'light' &&
      <>
          <GlowOrb t={t} top={-80} left={-100} color="#7b00cc22" size={500} />
          <GlowOrb t={t} top={2400} left={mobile ? -100 : 700} color="#0090a822" size={400} />
        </>
      }

      <Navbar t={t} mobile={mobile} active="home" />

      <Hero t={t} mobile={mobile} />
      <About t={t} mobile={mobile} />
      <Skills t={t} mobile={mobile} />
      <Experience t={t} mobile={mobile} />
      <Projects t={t} mobile={mobile} activeTab="all" />
      <Contact t={t} mobile={mobile} />
    </div>);

}

window.Portfolio = Portfolio;