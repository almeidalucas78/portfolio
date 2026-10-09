// Shared theme, data and UI primitives for the portfolio.
const SITE_THEMES = {
  dark: {
    bg: '#080010', bgCard: '#110022', border: '#2a0d4d', accent: '#b44dff', accent2: '#00f0ff',
    title: '#ffffff', body: '#a090b0', muted: '#6a5a80', nav: 'rgba(8, 0, 16, 0.72)',
    gridLine: 'rgba(180, 77, 255, 0.07)', gridLineStrong: 'rgba(180, 77, 255, 0.12)',
    glowTitle: '0 0 18px rgba(180,77,255,0.55), 0 0 38px rgba(180,77,255,0.25)',
    glowAccent: '0 0 14px rgba(180,77,255,0.45)', glowCyan: '0 0 14px rgba(0,240,255,0.55)',
    cardShadow: '0 0 0 1px rgba(180,77,255,0.35), 0 0 24px -6px rgba(180,77,255,0.35)',
    cardShadowHover: '0 0 0 1px rgba(180,77,255,0.9), 0 0 36px -4px rgba(180,77,255,0.7), 0 0 60px -10px rgba(0,240,255,0.35)',
    chip: 'rgba(180,77,255,0.12)', chipBorder: 'rgba(180,77,255,0.35)',
    good: '#00f0ff', warn: '#ffb547', bad: '#ff4d6d', stripeA: '#110022', stripeB: '#080010',
  },
  light: {
    bg: '#f0edf5', bgCard: '#ffffff', border: '#e2d6f0', accent: '#7b00cc', accent2: '#0090a8',
    title: '#1a0b29', body: '#4a3a60', muted: '#7a6a90', nav: 'rgba(240, 237, 245, 0.85)',
    gridLine: 'rgba(123, 0, 204, 0.05)', gridLineStrong: 'rgba(123, 0, 204, 0.09)',
    glowTitle: '0 0 14px rgba(123,0,204,0.18)',
    glowAccent: '0 0 12px rgba(123,0,204,0.25)', glowCyan: '0 0 12px rgba(0,144,168,0.25)',
    cardShadow: '0 0 0 1px rgba(123,0,204,0.25), 0 6px 20px -10px rgba(123,0,204,0.25)',
    cardShadowHover: '0 0 0 1.5px rgba(123,0,204,0.7), 0 12px 30px -8px rgba(123,0,204,0.35)',
    chip: 'rgba(123,0,204,0.08)', chipBorder: 'rgba(123,0,204,0.3)',
    good: '#00829a', warn: '#b36b00', bad: '#c4163a', stripeA: '#ffffff', stripeB: '#ebe5f3',
  },
};

const MONO = 'JetBrains Mono, monospace';
const DISPLAY = 'Space Grotesk, sans-serif';

const PROJECTS = [
  { name: 'Clínica Vértice', cat: 'institucional', type: 'Site institucional', year: 2025, role: 'Desenvolvimento e SEO técnico', url: 'clinicavertice.com.br',
    desc: 'Site institucional para rede de clínicas com agendamento integrado.',
    tags: ['WordPress', 'ACF', 'PHP', 'WP Rocket', 'Cloudflare'],
    scores: { perf: 96, a11y: 98, bp: 100, seo: 100 }, cwv: { lcp: 1.6, inp: 110, cls: 0.02 },
    challenge: 'Tema antigo com page builder pesado: LCP de 5,8 s no mobile e 40% das páginas fora do índice.',
    solution: 'Tema próprio com ACF e blocos nativos, imagens em AVIF, cache no WP Rocket e CDN na Cloudflare.',
    result: 'Performance mobile de 38 para 96 e todas as páginas de serviço indexadas.' },
  { name: 'Casa Ribeira', cat: 'ecommerce', type: 'Loja virtual', year: 2025, role: 'Desenvolvimento WooCommerce', url: 'casaribeira.com.br',
    desc: 'Loja de móveis planejados com 1.200 produtos e checkout otimizado.',
    tags: ['WooCommerce', 'PHP', 'Tailwind CSS', 'MySQL', 'Cloudways'],
    scores: { perf: 91, a11y: 95, bp: 96, seo: 100 }, cwv: { lcp: 2.1, inp: 180, cls: 0.06 },
    challenge: 'Catálogo grande com filtros lentos e checkout instável em horários de pico.',
    solution: 'Consultas MySQL otimizadas, filtros via WP REST API e servidor dimensionado na Cloudways.',
    result: 'Carregamento das categorias 62% mais rápido e conversão mobile 18% maior.' },
  { name: 'Portal Agro Norte', cat: 'conteudo', type: 'Portal de notícias', year: 2024, role: 'Desenvolvimento e performance', url: 'agronorte.com.br',
    desc: 'Portal com 15 mil matérias e publicação diária de conteúdo.',
    tags: ['WordPress', 'WP REST API', 'PHP', 'Cloudflare', 'Screaming Frog'],
    scores: { perf: 93, a11y: 96, bp: 100, seo: 100 }, cwv: { lcp: 1.9, inp: 150, cls: 0.05 },
    challenge: 'Anúncios deslocando o layout (CLS de 0,38) e sitemap com milhares de URLs quebradas.',
    solution: 'Espaços reservados para anúncios, lazy load, auditoria no Screaming Frog e redirecionamentos 301 em lote.',
    result: 'CLS de 0,38 para 0,05 e tráfego orgânico 34% maior em 4 meses.' },
  { name: 'Monteiro Advogados', cat: 'institucional', type: 'Redesign e migração', year: 2024, role: 'Desenvolvimento e SEO técnico', url: 'monteiroadvogados.com.br',
    desc: 'Redesign com troca de domínio sem perda de posicionamento.',
    tags: ['WordPress', 'Elementor', 'Rank Math', 'WP Rocket'],
    scores: { perf: 88, a11y: 97, bp: 100, seo: 100 }, cwv: { lcp: 2.6, inp: 210, cls: 0.08 },
    challenge: 'Troca de domínio e de layout com risco de perder posições conquistadas em 8 anos.',
    solution: 'Mapa de redirecionamentos página a página, dados estruturados no Rank Math e Elementor com CSS enxuto.',
    result: 'Migração sem queda de tráfego e 12 palavras-chave no top 3 após 60 dias.' },
  { name: 'Lumen Journal', cat: 'headless', type: 'Blog headless', year: 2025, role: 'Front-end e integração', url: 'lumenjournal.com.br',
    desc: 'Blog com WordPress headless e front-end em React e TypeScript.',
    tags: ['React', 'TypeScript', 'WP REST API', 'Node.js', 'GitHub'],
    scores: { perf: 99, a11y: 100, bp: 100, seo: 100 }, cwv: { lcp: 1.1, inp: 60, cls: 0.0 },
    challenge: 'A equipe editorial queria manter o WordPress, mas a navegação precisava ser instantânea.',
    solution: 'WordPress como CMS via WP REST API, front-end React com geração estática e deploy por CI/CD.',
    result: 'Performance mobile 99 e páginas carregando em menos de 1,2 s.' },
  { name: 'Rede Fisio+', cat: 'institucional', type: 'Multisite', year: 2023, role: 'Migração e infraestrutura', url: 'redefisiomais.com.br',
    desc: 'Migração de 14 sites de franquias para uma instalação multisite.',
    tags: ['WordPress', 'Docker', 'SSH', 'Git', 'Cloudways'],
    scores: { perf: 94, a11y: 96, bp: 100, seo: 100 }, cwv: { lcp: 1.8, inp: 130, cls: 0.03 },
    challenge: '14 sites em hospedagens diferentes, cada um com versões e plugins próprios.',
    solution: 'Ambiente local em Docker, deploy via Git e SSH e multisite centralizado na Cloudways.',
    result: 'Manutenção unificada, atualizações em minutos e Performance média de 94.' },
];

const PROJECT_TABS = [
  { id: 'all', label: 'Todos' }, { id: 'institucional', label: 'Institucional' }, { id: 'ecommerce', label: 'E-commerce' },
  { id: 'conteudo', label: 'Conteúdo' }, { id: 'headless', label: 'Headless' },
];

const STACKS = [
  { group: 'Desenvolvimento', items: ['WordPress', 'WooCommerce', 'WP REST API', 'PHP', 'JavaScript', 'Node.js', 'Bootstrap', 'Tailwind CSS', 'MySQL', 'ACF', 'Elementor', 'Postman', 'Insomnia', 'Figma'] },
  { group: 'Infraestrutura', items: ['Cloudways', 'Cloudflare', 'Docker', 'SSH', 'Git', 'GitHub'] },
  { group: 'SEO e Performance', items: ['Core Web Vitals', 'Rank Math', 'WP Rocket', 'PageSpeed Insights', 'Screaming Frog'] },
  { group: 'Conhecimentos adicionais', items: ['TypeScript', 'React', 'Testes automatizados', 'CI/CD'] },
];

const EXPERIENCE = [
  { year: 'mar 2024 — atual', role: '[Seu cargo]', placeholder: true, company: 'Gear SEO', desc: 'Desenvolvimento, otimização e manutenção de sites WordPress com foco em SEO técnico e performance, além de migrações e publicações de sites.' },
  { year: 'mai 2021 — mar 2024', role: 'Desenvolvedor Front End', company: 'Bloomin', desc: 'Criação e manutenção de sites com HTML, CSS, Sass, JavaScript, Bootstrap, PHP e WordPress.' },
  { year: 'fev 2020 — ago 2020', role: 'Desenvolvedor Front End', company: 'EleveAds', desc: 'Desenvolvimento e manutenção de sites em WordPress com Elementor.' },
];

const NAV_ITEMS = [
  { id: 'projects', label: 'Projetos' }, { id: 'exp', label: 'Experiência' }, { id: 'about', label: 'Sobre' }, { id: 'contact', label: 'Contato' },
];

// Core Web Vitals thresholds (good, needs improvement)
const CWV = {
  lcp: { label: 'LCP', name: 'Largest Contentful Paint', good: 2.5, ni: 4, fmt: v => `${v.toFixed(1).replace('.', ',')} s`, hint: 'bom ≤ 2,5 s' },
  inp: { label: 'INP', name: 'Interaction to Next Paint', good: 200, ni: 500, fmt: v => `${v} ms`, hint: 'bom ≤ 200 ms' },
  cls: { label: 'CLS', name: 'Cumulative Layout Shift', good: 0.1, ni: 0.25, fmt: v => v.toFixed(2).replace('.', ','), hint: 'bom ≤ 0,1' },
};

function scoreColor(v, t) { return v >= 90 ? t.good : v >= 50 ? t.warn : t.bad; }
function cwvStatus(key, v, t) {
  const m = CWV[key];
  if (v <= m.good) return { label: 'Bom', color: t.good, pos: (v / m.good) / 3 };
  if (v <= m.ni) return { label: 'Precisa melhorar', color: t.warn, pos: 1 / 3 + ((v - m.good) / (m.ni - m.good)) / 3 };
  return { label: 'Ruim', color: t.bad, pos: 2 / 3 + Math.min((v - m.ni) / m.ni, 1) / 3 };
}

function NeonBtn({ children, t, primary, onClick }) {
  return (
    <button onClick={onClick} className="neon-btn" style={{
      appearance: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600,
      padding: '14px 26px', borderRadius: 4, background: primary ? t.accent : 'transparent', color: primary ? t.bg : t.accent,
      border: `1.5px solid ${t.accent}`, transition: 'all .2s',
      boxShadow: primary ? `0 0 18px ${t.accent}88, 0 0 36px ${t.accent}44` : `0 0 12px ${t.accent}44, inset 0 0 12px ${t.accent}11`,
    }}>{children}</button>
  );
}

function SectionHeader({ kicker, title, t, right }) {
  return (
    <div style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', color: t.accent2, textTransform: 'uppercase', marginBottom: 12, textShadow: `0 0 10px ${t.accent2}66` }}>
          <span style={{ opacity: 0.6 }}>{'<'}</span> {kicker} <span style={{ opacity: 0.6 }}>{'/>'}</span>
        </div>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(34px, 4.2vw, 56px)', lineHeight: 1.05, color: t.title, margin: 0, letterSpacing: '-0.02em', textShadow: t.glowTitle }}>{title}</h2>
      </div>
      {right}
    </div>
  );
}

function Tag({ children, t, size = 10 }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: size, padding: size > 10 ? '7px 12px' : '4px 9px', borderRadius: 3, background: t.chip, border: `1px solid ${t.chipBorder}`, color: t.accent, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{children}</span>
  );
}

function Placeholder({ t, label, style }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: `repeating-linear-gradient(135deg, ${t.stripeA} 0px, ${t.stripeA} 8px, ${t.stripeB} 8px, ${t.stripeB} 16px)`, ...style }}>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: t.muted, fontFamily: MONO, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center', padding: 12 }}>{label}</div>
    </div>
  );
}

function Gauge({ value, t, size = 40, stroke = 3, fontSize = 14 }) {
  const c = scoreColor(value, t);
  const r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`${c}2a`} strokeWidth={stroke}></circle>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={c} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - value / 100)} style={{ filter: `drop-shadow(0 0 4px ${c})` }}></circle>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 700, fontSize, color: c, textShadow: `0 0 10px ${c}88` }}>{value}</div>
    </div>
  );
}

function PsiBadge({ score, t, size = 40 }) {
  const c = scoreColor(score, t);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '5px 14px 5px 5px', borderRadius: 999, background: `${t.bg}e0`, backdropFilter: 'blur(8px)', border: `1px solid ${c}66`, boxShadow: `0 0 18px -2px ${c}55` }}>
      <Gauge value={score} t={t} size={size} stroke={3} fontSize={size * 0.36}></Gauge>
      <div style={{ fontFamily: MONO, lineHeight: 1.3 }}>
        <div style={{ fontSize: 10, color: t.title, letterSpacing: '0.08em' }}>PageSpeed</div>
        <div style={{ fontSize: 9, color: t.muted, letterSpacing: '0.16em', textTransform: 'uppercase' }}>mobile</div>
      </div>
    </div>
  );
}

function ThemeToggle({ t, theme, onToggle }) {
  const opt = (id, glyph) => (
    <span onClick={() => onToggle(id)} title={id === 'dark' ? 'Tema escuro' : 'Tema claro'} style={{
      width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 11, cursor: 'pointer',
      background: theme === id ? t.accent : 'transparent', color: theme === id ? t.bg : t.muted, boxShadow: theme === id ? `0 0 10px ${t.accent}` : 'none', transition: 'all .2s',
    }}>{glyph}</span>
  );
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 3, border: `1px solid ${t.border}`, borderRadius: 999, background: t.bgCard }}>
      {opt('dark', '☾')}{opt('light', '☀')}
    </div>
  );
}

function Navbar({ t, mobile, active, theme, onToggle, onNav }) {
  return (
    <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, height: 64, padding: mobile ? '0 20px' : '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: t.nav, backdropFilter: 'blur(14px)', borderBottom: `1px solid ${t.accent}55`, boxShadow: `0 0 24px -8px ${t.accent}66` }}>
      <div onClick={() => onNav('top')} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
        <div style={{ width: 28, height: 28, border: `1.5px solid ${t.accent}`, borderRadius: 4, display: 'grid', placeItems: 'center', fontFamily: MONO, fontWeight: 700, color: t.accent, fontSize: 13, boxShadow: `0 0 12px ${t.accent}88, inset 0 0 8px ${t.accent}44` }}>LA</div>
        <span style={{ fontFamily: MONO, fontSize: 14, color: t.title, textShadow: t.glowAccent }}>lucas almeida<span style={{ color: t.accent2 }}>_</span></span>
      </div>
      {!mobile && (
        <ul style={{ display: 'flex', gap: 32, margin: 0, padding: 0, listStyle: 'none' }}>
          {NAV_ITEMS.map(n => (
            <li key={n.id} onClick={() => onNav(n.id)} style={{ fontFamily: MONO, fontSize: 13, color: n.id === active ? t.title : t.body, position: 'relative', cursor: 'pointer', textShadow: n.id === active ? t.glowAccent : 'none' }}>
              {n.label}
              {n.id === active && <span style={{ position: 'absolute', left: 0, right: 0, bottom: -22, height: 2, background: t.accent, boxShadow: `0 0 8px ${t.accent}, 0 0 14px ${t.accent}88` }}></span>}
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ThemeToggle t={t} theme={theme} onToggle={onToggle}></ThemeToggle>
        {mobile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 0 12px 8px', cursor: 'pointer' }}>
            <span style={{ width: 22, height: 1.5, background: t.accent, boxShadow: `0 0 6px ${t.accent}` }}></span>
            <span style={{ width: 16, height: 1.5, background: t.accent, boxShadow: `0 0 6px ${t.accent}`, marginLeft: 'auto' }}></span>
            <span style={{ width: 22, height: 1.5, background: t.accent, boxShadow: `0 0 6px ${t.accent}` }}></span>
          </div>
        )}
      </div>
    </nav>
  );
}

function GridBg({ t }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, backgroundSize: '40px 40px, 40px 40px, 200px 200px, 200px 200px',
      backgroundImage: `linear-gradient(to right, ${t.gridLine} 1px, transparent 1px), linear-gradient(to bottom, ${t.gridLine} 1px, transparent 1px), linear-gradient(to right, ${t.gridLineStrong} 1px, transparent 1px), linear-gradient(to bottom, ${t.gridLineStrong} 1px, transparent 1px)` }}></div>
  );
}

function GlowOrb({ top, left, color, size = 480 }) {
  return <div style={{ position: 'absolute', top, left, width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle, ${color}, transparent 65%)`, filter: 'blur(40px)', opacity: 0.4, pointerEvents: 'none', zIndex: 0 }}></div>;
}

function Footer({ t, mobile }) {
  return (
    <div style={{ position: 'relative', zIndex: 2, margin: mobile ? '0 20px' : '0 80px', padding: '28px 0 40px', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: MONO, fontSize: 11, color: t.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      <span>© 2026 Lucas Almeida</span>
      <span><span style={{ color: t.accent2 }}>●</span> WordPress · SEO técnico · performance</span>
    </div>
  );
}

Object.assign(window, { SITE_THEMES, MONO, DISPLAY, PROJECTS, PROJECT_TABS, STACKS, EXPERIENCE, NAV_ITEMS, CWV, scoreColor, cwvStatus, NeonBtn, SectionHeader, Tag, Placeholder, Gauge, PsiBadge, ThemeToggle, Navbar, GridBg, GlowOrb, Footer });
