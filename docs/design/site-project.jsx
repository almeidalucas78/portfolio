// Project case page + root Site component (theme + view state).
function CwvCard({ k, v, t }) {
  const m = CWV[k], s = cwvStatus(k, v, t);
  return (
    <div style={{ padding: 20, border: `1px solid ${t.border}`, borderRadius: 4, background: t.bg }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, color: t.title }}>{m.label}</span>
        <span style={{ fontFamily: MONO, fontSize: 10, color: t.muted, textAlign: 'right' }}>{m.name}</span>
      </div>
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 36, color: s.color, textShadow: `0 0 14px ${s.color}66`, margin: '14px 0 12px', letterSpacing: '-0.02em' }}>{m.fmt(v)}</div>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, height: 4 }}>
        {[t.good, t.warn, t.bad].map((c, i) => <span key={i} style={{ background: `${c}55`, borderRadius: 2 }}></span>)}
        <span style={{ position: 'absolute', top: -4, left: `calc(${(s.pos * 100).toFixed(1)}% - 1px)`, width: 3, height: 12, borderRadius: 2, background: s.color, boxShadow: `0 0 8px ${s.color}` }}></span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, gap: 8 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: MONO, fontSize: 11, color: s.color, padding: '4px 10px', borderRadius: 999, border: `1px solid ${s.color}66`, background: `${s.color}14` }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }}></span>{s.label}
        </span>
        <span style={{ fontFamily: MONO, fontSize: 10, color: t.muted }}>{m.hint}</span>
      </div>
    </div>
  );
}

function ProjectPage({ t, mobile, idx, go, open }) {
  const p = PROJECTS[idx], n = PROJECTS.length;
  const prev = (idx - 1 + n) % n, next = (idx + 1) % n;
  const card = { background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 4, boxShadow: t.cardShadow };
  const label = { fontFamily: MONO, fontSize: 10, color: t.muted, letterSpacing: '0.16em', textTransform: 'uppercase' };
  const gauges = [['Performance', p.scores.perf], ['Acessibilidade', p.scores.a11y], ['Boas Práticas', p.scores.bp], ['SEO', p.scores.seo]];
  const dsr = [['Desafio', p.challenge], ['Solução', p.solution], ['Resultado', p.result]];
  return (
    <section style={{ padding: mobile ? '96px 20px 60px' : '120px 80px 100px', position: 'relative', zIndex: 2 }}>
      <div onClick={() => go('projects')} style={{ fontFamily: MONO, fontSize: 12, color: t.accent2, letterSpacing: '0.1em', cursor: 'pointer', textShadow: t.glowCyan, marginBottom: mobile ? 28 : 40 }}>← todos os projetos</div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr auto', gap: 28, alignItems: 'end' }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.2em', color: t.accent2, textTransform: 'uppercase', marginBottom: 12, textShadow: `0 0 10px ${t.accent2}66` }}>
            <span style={{ opacity: 0.6 }}>{'<'}</span> case · {String(idx + 1).padStart(2, '0')}/{String(n).padStart(2, '0')} <span style={{ opacity: 0.6 }}>{'/>'}</span>
          </div>
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: mobile ? 44 : 'clamp(56px, 6vw, 88px)', lineHeight: 0.98, letterSpacing: '-0.035em', color: t.title, margin: 0, textShadow: t.glowTitle }}>{p.name}</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: mobile ? 'flex-start' : 'flex-end', gap: 10 }}>
          <NeonBtn t={t} primary>Ver site no ar ↗</NeonBtn>
          <span style={{ fontFamily: MONO, fontSize: 12, color: t.muted }}>{p.url}</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: mobile ? 0 : 24, marginTop: mobile ? 32 : 48 }}>
        {[['tipo', p.type], ['ano', p.year], ['papel', p.role]].map(([k, v]) => (
          <div key={k} style={{ padding: '14px 0', borderTop: `1px solid ${t.accent}55`, display: mobile ? 'flex' : 'block', justifyContent: 'space-between', gap: 12 }}>
            <div style={label}>{k}</div>
            <div style={{ fontFamily: MONO, fontSize: 14, color: t.title, marginTop: mobile ? 0 : 8, textAlign: mobile ? 'right' : 'left' }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>{p.tags.map(x => <Tag key={x} t={t} size={12}>{x}</Tag>)}</div>
      <div style={{ ...card, border: `1px solid ${t.accent}66`, height: mobile ? 220 : 540, marginTop: mobile ? 32 : 48, overflow: 'hidden' }}>
        <Placeholder t={t} label={`screenshot · ${p.url}`}></Placeholder>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: mobile ? 28 : 40, marginTop: mobile ? 48 : 80 }}>
        {dsr.map(([h, txt], i) => (
          <div key={h}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: t.accent2, letterSpacing: '0.16em', textShadow: t.glowCyan }}>0{i + 1}</div>
            <h3 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: mobile ? 22 : 26, color: t.title, margin: '8px 0 10px', letterSpacing: '-0.01em', textShadow: t.glowAccent }}>{h}</h3>
            <p style={{ fontFamily: MONO, fontSize: 14, lineHeight: 1.7, color: t.body, margin: 0, textWrap: 'pretty' }}>{txt}</p>
          </div>
        ))}
      </div>
      <div style={{ ...card, border: `1px solid ${t.accent}66`, padding: mobile ? 20 : 40, marginTop: mobile ? 48 : 80 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: mobile ? 28 : 40 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: t.accent2, letterSpacing: '0.18em', textTransform: 'uppercase', textShadow: t.glowCyan }}>{'>'} pagespeed insights</div>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: mobile ? 28 : 36, color: t.title, margin: '8px 0 0', letterSpacing: '-0.02em', textShadow: t.glowTitle }}>Performance</h2>
          </div>
          <span style={{ fontFamily: MONO, fontSize: 11, color: t.muted, letterSpacing: '0.12em', textTransform: 'uppercase' }}>medição · mobile</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: mobile ? 28 : 24 }}>
          {gauges.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <Gauge value={v} t={t} size={mobile ? 88 : 112} stroke={mobile ? 5 : 6} fontSize={mobile ? 26 : 32}></Gauge>
              <span style={{ fontFamily: MONO, fontSize: 12, color: t.body, textAlign: 'center' }}>{k}</span>
            </div>
          ))}
        </div>
        <div style={{ height: 1, background: t.border, margin: mobile ? '32px 0 24px' : '44px 0 28px' }}></div>
        <div style={{ ...label, color: t.accent2, marginBottom: 16 }}>core web vitals</div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0, 1fr))', gap: 14 }}>
          {Object.keys(CWV).map(k => <CwvCard key={k} k={k} v={p.cwv[k]} t={t}></CwvCard>)}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 14, marginTop: mobile ? 48 : 80 }}>
        {[[prev, '← anterior', 'flex-start'], [next, 'próximo →', 'flex-end']].map(([i, lab, al]) => (
          <div key={lab} className="project-card" onClick={() => open(i)} style={{ ...card, '--hs': t.cardShadowHover, padding: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: al === 'flex-end' && !mobile ? 'row-reverse' : 'row', gap: 16, transition: 'all .25s' }}>
            <div style={{ textAlign: al === 'flex-end' && !mobile ? 'right' : 'left' }}>
              <div style={{ ...label, color: t.accent2 }}>{lab}</div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 22, color: t.title, marginTop: 6, textShadow: t.glowAccent }}>{PROJECTS[i].name}</div>
            </div>
            <Gauge value={PROJECTS[i].scores.perf} t={t} size={44} fontSize={15}></Gauge>
          </div>
        ))}
      </div>
    </section>
  );
}

function Site({ theme = 'dark', layout = 'desktop', initialView = 'home' }) {
  const [th, setTh] = React.useState(theme);
  const [view, setView] = React.useState(initialView);
  const [active, setActive] = React.useState(initialView === 'home' ? null : 'projects');
  const t = SITE_THEMES[th];
  const mobile = layout === 'mobile';
  const go = id => { setView('home'); setActive(id === 'top' ? null : id); };
  const open = i => { setView(i); setActive('projects'); };
  const cross = c => `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><line x1='10' y1='2' x2='10' y2='18' stroke='%23${c}' stroke-width='1.5'/><line x1='2' y1='10' x2='18' y2='10' stroke='%23${c}' stroke-width='1.5'/></svg>") 10 10, crosshair`;
  return (
    <div data-site="" style={{ width: '100%', minHeight: '100%', background: t.bg, color: t.body, fontFamily: MONO, position: 'relative', overflow: 'hidden', transition: 'background .3s', '--acc': t.accent, cursor: cross(t.accent.slice(1)) }}>
      <GridBg t={t}></GridBg>
      <GlowOrb top={-120} left={-180} color={th === 'dark' ? '#b44dff55' : '#7b00cc22'} size={600}></GlowOrb>
      <GlowOrb top={1800} left={mobile ? -200 : 800} color={th === 'dark' ? '#00f0ff33' : '#0090a822'} size={500}></GlowOrb>
      <GlowOrb top={3400} left={mobile ? -100 : -200} color={th === 'dark' ? '#b44dff44' : '#7b00cc1a'} size={500}></GlowOrb>
      <Navbar t={t} mobile={mobile} active={active} theme={th} onToggle={setTh} onNav={go}></Navbar>
      {view === 'home'
        ? <HomePage t={t} mobile={mobile} go={go} open={open}></HomePage>
        : <ProjectPage t={t} mobile={mobile} idx={view} go={go} open={open}></ProjectPage>}
      <Footer t={t} mobile={mobile}></Footer>
    </div>
  );
}

Object.assign(window, { Site, ProjectPage });
