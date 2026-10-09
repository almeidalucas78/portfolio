// Home page sections.
const secPad = m => (m ? '60px 20px' : '120px 80px');

const HERO_PICKS = [4, 0, 1];
const HERO_POS_D = [
  { left: 270, top: 0, rot: 8 },
  { left: 30, top: 40, rot: -7 },
  { left: 300, top: 215, rot: 3 },
];
const HERO_POS_M = [
  { left: '50%', ml: -40, top: 0, rot: 9 },
  { left: '50%', ml: -170, top: 20, rot: -8 },
  { left: '50%', ml: -95, top: 60, rot: 1 },
];

function HeroCard({ p, t, w, pos, z, active, onEnter, onOpen, small }) {
  return (
    <div className="hero-card" onMouseEnter={onEnter} onClick={onOpen} style={{
      position: 'absolute', top: pos.top, left: pos.left, marginLeft: pos.ml || 0, width: w, zIndex: z,
      transform: `rotate(${pos.rot}deg)`, transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .25s',
      background: t.bgCard, border: `1px solid ${active ? t.accent : t.border}`, borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
      boxShadow: active ? t.cardShadowHover : t.cardShadow,
    }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 10', borderBottom: `1px solid ${t.border}` }}>
        <Placeholder t={t} label={small ? 'screenshot' : `screenshot · ${p.url}`}></Placeholder>
        <div style={{ position: 'absolute', top: 8, right: 8 }}><PsiBadge score={p.scores.perf} t={t} size={small ? 30 : 36}></PsiBadge></div>
      </div>
      <div style={{ padding: small ? '10px 12px' : '14px 16px' }}>
        <div style={{ fontFamily: MONO, fontSize: 9, color: t.accent2, letterSpacing: '0.16em', textTransform: 'uppercase' }}>./{p.cat}</div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: small ? 15 : 18, color: t.title, marginTop: 4, letterSpacing: '-0.01em', textShadow: t.glowAccent }}>{p.name}</div>
        {!small && <div style={{ display: 'flex', gap: 5, marginTop: 10, flexWrap: 'wrap' }}>{p.tags.slice(0, 3).map(x => <Tag key={x} t={t}>{x}</Tag>)}</div>}
      </div>
    </div>
  );
}

function HeroTerminal({ t, p, compact }) {
  const rows = [['performance', p.scores.perf], ['accessibility', p.scores.a11y], ['best-practices', p.scores.bp], ['seo', p.scores.seo]];
  const dots = (
    <div style={{ display: 'flex', gap: 6, marginBottom: compact ? 10 : 14, paddingBottom: compact ? 8 : 12, borderBottom: `1px solid ${t.border}` }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent, boxShadow: `0 0 6px ${t.accent}` }}></span>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent2, boxShadow: `0 0 6px ${t.accent2}` }}></span>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.muted }}></span>
      <span style={{ marginLeft: 'auto', color: t.muted, fontSize: 11 }}>~/lucas — zsh</span>
    </div>
  );
  return (
    <div style={{ padding: compact ? 16 : 22, borderRadius: 6, background: t.bgCard, border: `1px solid ${t.accent}88`, boxShadow: `${t.cardShadow}, 0 24px 48px -16px rgba(0,0,0,.5)`, fontFamily: MONO, fontSize: compact ? 11 : 12, lineHeight: 1.9 }}>
      {dots}
      <div style={{ color: t.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ color: t.accent2 }}>$</span> lighthouse <span key={p.url} className="term-flash" style={{ color: t.title }}>{p.url}</span></div>
      <div style={{ color: t.muted, marginBottom: 6 }}>  --preset=mobile</div>
      <div key={p.name} className="term-flash" style={compact ? { display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 16 } : null}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', gap: 8, color: t.body }}>
            <span>{compact ? k.replace('best-practices', 'best-pract.').replace('accessibility', 'a11y') : k}</span><span style={{ flex: 1, borderBottom: `1px dotted ${t.border}`, transform: 'translateY(-6px)' }}></span>
            <span style={{ color: scoreColor(v, t), textShadow: `0 0 8px ${scoreColor(v, t)}88`, fontWeight: 700 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ color: t.muted, marginTop: 6 }}><span style={{ color: t.accent2 }}>$</span> <span style={{ color: t.accent, textShadow: t.glowAccent }}>wp deploy_</span><span className="cursor" style={{ background: t.accent, display: 'inline-block', width: 8, height: 14, marginLeft: 2, verticalAlign: 'middle', boxShadow: `0 0 8px ${t.accent}` }}></span></div>
    </div>
  );
}

function HeroShowcase({ t, mobile, open }) {
  const [hover, setHover] = React.useState(HERO_PICKS[1]);
  const p = PROJECTS[hover];
  const pos = mobile ? HERO_POS_M : HERO_POS_D;
  const cards = HERO_PICKS.map((idx, i) => (
    <HeroCard key={idx} p={PROJECTS[idx]} t={t} w={mobile ? 200 : 270} pos={pos[i]} small={mobile}
      z={hover === idx ? 5 : i + 1} active={hover === idx} onEnter={() => setHover(idx)} onOpen={() => open(idx)}></HeroCard>
  ));
  if (mobile) {
    return (
      <div style={{ marginTop: 56 }}>
        <div style={{ position: 'relative', height: 250 }}>{cards}</div>
        <div style={{ position: 'relative', zIndex: 6, marginTop: -34 }}><HeroTerminal t={t} p={p} compact></HeroTerminal></div>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', right: 60, top: 'calc(50% + 24px)', transform: 'translateY(-50%)', width: 580, height: 560, zIndex: 2 }}>
      {cards}
      <div style={{ position: 'absolute', left: 0, bottom: 0, width: 350, zIndex: 6 }}><HeroTerminal t={t} p={p}></HeroTerminal></div>
      <div style={{ position: 'absolute', right: 10, bottom: 8, fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: '0.16em', textTransform: 'uppercase' }}>passe o mouse nos cards ↑</div>
    </div>
  );
}

function HomeHero({ t, mobile, go, open }) {
  return (
    <section style={{ minHeight: mobile ? 'auto' : 780, padding: mobile ? '120px 20px 90px' : '140px 80px 100px', position: 'relative', display: mobile ? 'block' : 'flex', alignItems: 'center' }}>
      <div style={{ position: 'relative', zIndex: 3, maxWidth: mobile ? 820 : 660 }}>
        <div style={{ fontFamily: MONO, fontSize: mobile ? 12 : 14, color: t.accent2, marginBottom: 24, letterSpacing: '0.1em', textShadow: `0 0 12px ${t.accent2}88` }}>
          <span style={{ display: 'inline-block', width: 8, height: 8, background: t.accent2, borderRadius: '50%', marginRight: 10, boxShadow: `0 0 8px ${t.accent2}` }}></span>
          disponível para projetos · 2026
        </div>
        <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: mobile ? 56 : 'clamp(72px, 8vw, 116px)', lineHeight: 0.95, letterSpacing: '-0.04em', color: t.title, margin: 0, textShadow: t.glowTitle }}>
          Lucas<br></br><span style={{ color: t.accent, textShadow: `0 0 22px ${t.accent}, 0 0 50px ${t.accent}88` }}>Almeida.</span>
        </h1>
        <div style={{ fontFamily: MONO, fontSize: mobile ? 14 : 18, color: t.body, marginTop: 28, letterSpacing: '0.02em', lineHeight: 1.6, maxWidth: 600 }}>
          <span style={{ color: t.accent2 }}>{'>'}</span> Desenvolvedor Web <span style={{ color: t.accent }}>|</span> <span style={{ color: t.title, textShadow: t.glowAccent }}>WordPress, SEO Técnico e Performance</span>
        </div>
        <p style={{ fontFamily: MONO, fontSize: mobile ? 15 : 17, lineHeight: 1.6, color: t.body, maxWidth: 560, marginTop: 20, marginBottom: 44 }}>Desenvolvo sites rápidos, bem indexados e fáceis de manter.</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <NeonBtn t={t} primary onClick={() => go('projects')}>Ver projetos →</NeonBtn>
          <NeonBtn t={t} onClick={() => go('contact')}>Entrar em contato</NeonBtn>
        </div>
      </div>
      <HeroShowcase t={t} mobile={mobile} open={open}></HeroShowcase>
      <div style={{ position: 'absolute', bottom: mobile ? 30 : 50, left: mobile ? 20 : 80, fontFamily: MONO, fontSize: 11, color: t.muted, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 10 }}>
        scroll <span style={{ width: 32, height: 1, background: t.accent, boxShadow: `0 0 6px ${t.accent}` }}></span> ↓
      </div>
    </section>
  );
}

function ProjectCard({ p, t, onOpen }) {
  return (
    <div className="project-card" onClick={onOpen} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, boxShadow: t.cardShadow, '--hs': t.cardShadowHover, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all .25s' }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 10', borderBottom: `1px solid ${t.border}` }}>
        <Placeholder t={t} label={`screenshot · ${p.url}`}></Placeholder>
        <div style={{ position: 'absolute', top: 14, right: 14 }}><PsiBadge score={p.scores.perf} t={t}></PsiBadge></div>
      </div>
      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ fontFamily: MONO, fontSize: 10, color: t.accent2, letterSpacing: '0.18em', textTransform: 'uppercase', textShadow: t.glowCyan }}>./{p.cat} · {p.year}</div>
        <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 22, color: t.title, margin: 0, letterSpacing: '-0.02em', textShadow: t.glowAccent }}>{p.name}</h3>
        <p style={{ fontFamily: MONO, fontSize: 13, lineHeight: 1.6, color: t.body, margin: 0 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{p.tags.map(x => <Tag key={x} t={t}>{x}</Tag>)}</div>
        <div style={{ display: 'flex', gap: 18, fontFamily: MONO, fontSize: 12, marginTop: 'auto', paddingTop: 14, borderTop: `1px solid ${t.border}` }}>
          <span style={{ color: t.accent, textShadow: t.glowAccent }}>ver case →</span>
          <span style={{ marginLeft: 'auto', color: t.accent2, textShadow: t.glowCyan }}>↗ site</span>
        </div>
      </div>
    </div>
  );
}

function HomeProjects({ t, mobile, open }) {
  const [tab, setTab] = React.useState('all');
  const list = PROJECTS.map((p, i) => ({ p, i })).filter(x => tab === 'all' || x.p.cat === tab);
  return (
    <section style={{ padding: secPad(mobile), position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="01 · projetos" title="Projetos selecionados" t={t}></SectionHeader>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36, fontFamily: MONO, fontSize: 12 }}>
        {PROJECT_TABS.map(x => (
          <span key={x.id} onClick={() => setTab(x.id)} style={{ padding: '8px 16px', borderRadius: 999, cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'lowercase', transition: 'all .2s',
            background: x.id === tab ? t.accent : 'transparent', border: `1px solid ${x.id === tab ? t.accent : t.border}`, color: x.id === tab ? t.bg : t.body, boxShadow: x.id === tab ? `0 0 14px ${t.accent}88` : 'none' }}>{x.label}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 20 }}>
        {list.map(({ p, i }) => <ProjectCard key={p.name} p={p} t={t} onOpen={() => open(i)}></ProjectCard>)}
      </div>
    </section>
  );
}

function HomeStacks({ t, mobile }) {
  return (
    <section style={{ padding: secPad(mobile), position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="02 · stack" title="Stacks e tecnologias" t={t}></SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
        {STACKS.map((g, i) => (
          <div key={g.group} className="project-card" style={{ padding: mobile ? 20 : 28, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, boxShadow: t.cardShadow, '--hs': t.cardShadowHover, transition: 'all .25s' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: t.accent2, letterSpacing: '0.16em', textShadow: t.glowCyan }}>0{i + 1}</span>
              <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 20, color: t.title, margin: 0, letterSpacing: '-0.01em', textShadow: t.glowAccent }}>{g.group}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{g.items.map(x => <Tag key={x} t={t} size={12}>{x}</Tag>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeExperience({ t, mobile }) {
  return (
    <section style={{ padding: secPad(mobile), position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="03 · histórico" title="Experiência profissional" t={t}></SectionHeader>
      <div style={{ position: 'relative', paddingLeft: mobile ? 28 : 40 }}>
        <div style={{ position: 'absolute', left: mobile ? 6 : 10, top: 6, bottom: 6, width: 1, background: t.accent, boxShadow: `0 0 10px ${t.accent}, 0 0 20px ${t.accent}66` }}></div>
        {EXPERIENCE.map((e, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: i === EXPERIENCE.length - 1 ? 0 : 44 }}>
            <div style={{ position: 'absolute', left: mobile ? -28 : -36, top: 4, width: 14, height: 14, borderRadius: '50%', background: t.bg, border: `2px solid ${t.accent}`, boxShadow: `0 0 10px ${t.accent}, 0 0 20px ${t.accent}88` }}>
              <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: t.accent, boxShadow: `0 0 6px ${t.accent}` }}></div>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, color: t.accent2, letterSpacing: '0.12em', textShadow: t.glowCyan, textTransform: 'uppercase' }}>{e.year}</div>
            <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: mobile ? 20 : 26, color: t.title, margin: '8px 0 6px', letterSpacing: '-0.01em', textShadow: t.glowAccent }}>
              <span style={e.placeholder ? { borderBottom: `1.5px dashed ${t.accent2}` } : null}>{e.role}</span> <span style={{ color: t.muted, fontWeight: 400 }}>@ {e.company}</span>
            </h3>
            <p style={{ fontFamily: MONO, fontSize: mobile ? 13 : 14, lineHeight: 1.65, color: t.body, margin: 0, maxWidth: 720 }}>{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeAbout({ t, mobile }) {
  const corner = (pos) => <div style={{ position: 'absolute', width: 18, height: 18, ...pos, boxShadow: `0 0 8px ${t.accent2}` }}></div>;
  const b = `2px solid ${t.accent2}`;
  const edu = [
    { course: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', inst: 'Anhanguera', status: 'em andamento' },
    { course: 'Técnico em Desenvolvimento de Sistemas', inst: 'ETEC' },
  ];
  return (
    <section style={{ padding: secPad(mobile), position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="04 · sobre" title="Sobre" t={t}></SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '280px 1fr', gap: mobile ? 32 : 64, alignItems: 'start' }}>
        <div style={{ width: mobile ? 200 : 260, height: mobile ? 200 : 260, margin: mobile ? '0 auto' : 0, border: `1.5px solid ${t.accent}`, borderRadius: 4, position: 'relative', boxShadow: t.cardShadow }}>
          <Placeholder t={t} label="foto de perfil"></Placeholder>
          {corner({ top: -8, left: -8, borderTop: b, borderLeft: b })}{corner({ top: -8, right: -8, borderTop: b, borderRight: b })}
          {corner({ bottom: -8, left: -8, borderBottom: b, borderLeft: b })}{corner({ bottom: -8, right: -8, borderBottom: b, borderRight: b })}
        </div>
        <div>
          <p style={{ fontFamily: MONO, fontSize: mobile ? 14 : 17, lineHeight: 1.75, color: t.body, margin: 0, maxWidth: 760, textWrap: 'pretty' }}>
            Há mais de <span style={{ color: t.title, textShadow: t.glowAccent }}>5 anos</span> desenvolvo sites em WordPress com foco em SEO técnico e performance. Hoje atuo no desenvolvimento e na otimização de sites de grandes marcas, garantindo que sejam <span style={{ color: t.accent2, textShadow: t.glowCyan }}>rápidos e bem posicionados</span>.
          </p>
          <div style={{ marginTop: 40 }}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: t.accent2, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6, textShadow: t.glowCyan }}>{'>'} formação</div>
            {edu.map(e => (
              <div key={e.course} style={{ display: 'flex', justifyContent: 'space-between', alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row', gap: 8, padding: '16px 0', borderBottom: `1px solid ${t.border}` }}>
                <div>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: mobile ? 16 : 18, color: t.title }}>{e.course}</div>
                  <div style={{ fontFamily: MONO, fontSize: 12, color: t.muted, marginTop: 4 }}>{e.inst}</div>
                </div>
                {e.status && <Tag t={t}>{e.status}</Tag>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeContact({ t, mobile }) {
  const links = [
    { icon: '@', label: 'e-mail', value: 'lucas@almeida.dev' },
    { icon: 'in', label: 'linkedin', value: 'linkedin.com/in/lucasalmeida' },
    { icon: '⎇', label: 'github', value: 'github.com/lucasalmeida' },
  ];
  return (
    <section style={{ padding: mobile ? '60px 20px 80px' : '120px 80px', position: 'relative', zIndex: 2 }}>
      <SectionHeader kicker="05 · contato" title="Vamos conversar" t={t}></SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 32 : 80, alignItems: 'start' }}>
        <p style={{ fontFamily: MONO, fontSize: mobile ? 14 : 17, lineHeight: 1.7, color: t.body, margin: 0, maxWidth: 480 }}>
          Disponível para projetos freelancer e novas oportunidades. <span style={{ color: t.title, textShadow: t.glowAccent }}>Me chama.</span>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {links.map(l => (
            <a key={l.label} className="project-card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, boxShadow: t.cardShadow, '--hs': t.cardShadowHover, cursor: 'pointer', textDecoration: 'none', transition: 'all .25s' }}>
              <span style={{ width: 42, height: 42, flex: 'none', borderRadius: 4, border: `1.5px solid ${t.accent}`, display: 'grid', placeItems: 'center', fontFamily: MONO, fontWeight: 700, color: t.accent, fontSize: 15, textShadow: t.glowAccent, boxShadow: `0 0 14px ${t.accent}44, inset 0 0 10px ${t.accent}22` }}>{l.icon}</span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{l.label}</span>
                <span style={{ display: 'block', fontFamily: MONO, fontSize: mobile ? 13 : 15, color: t.title, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.value}</span>
              </span>
              <span style={{ marginLeft: 'auto', color: t.accent2, fontFamily: MONO, textShadow: t.glowCyan }}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ t, mobile, go, open }) {
  return (
    <>
      <HomeHero t={t} mobile={mobile} go={go} open={open}></HomeHero>
      <HomeProjects t={t} mobile={mobile} open={open}></HomeProjects>
      <HomeStacks t={t} mobile={mobile}></HomeStacks>
      <HomeExperience t={t} mobile={mobile}></HomeExperience>
      <HomeAbout t={t} mobile={mobile}></HomeAbout>
      <HomeContact t={t} mobile={mobile}></HomeContact>
    </>
  );
}

Object.assign(window, { HomePage });
