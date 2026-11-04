import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AcademyExplorer } from './components/AcademyExplorer';
import { CityMap } from './components/CityMap';
import { Intro } from './components/Intro';
import { Arrow, asset, Mark } from './components/Identity';
import { Personnel } from './components/Personnel';
import { academies, records, type Character, type WorldRecord } from './data/world';

gsap.registerPlugin(ScrollTrigger);

const getRoute = () => window.location.hash.replace(/^#\/?/, '').replace(/\/$/, '') || 'home';
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function shouldIntro() {
  if (reducedMotion() || getRoute() !== 'home') return false;
  try { return sessionStorage.getItem('novaris:intro:v1') !== 'seen'; } catch { return true; }
}

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span className="mono">{number} /</span><span className="eyebrow">{children}</span><span className="label-line" /><span aria-hidden="true">+</span></div>;
}

function RecordList({ open }: { open: (record: WorldRecord) => void }) {
  return <div className="record-list">{records.map((record, i) => <button key={record.id} className="record-row" onClick={()=>open(record)}><span className="record-number mono">0{i+1}</span><span className="record-category mono">{record.category}</span><span className="record-name">{record.title}<small>{record.english}</small></span><span className={`record-status ${record.status==='pending' ? 'pending' : ''}`}>{record.status==='pending' ? '준비 중' : '열람 가능'}</span><Arrow /></button>)}</div>;
}

export default function App() {
  const [route, setRoute] = useState(getRoute);
  const [intro, setIntro] = useState(shouldIntro);
  const [menu, setMenu] = useState(false);
  const [document, setDocument] = useState<WorldRecord | Character | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const page = route.split('/')[0];
  const selectedAcademy = route.split('/')[1];
  const invalidAcademy = page==='academies' && selectedAcademy && !academies.some(a=>a.id===selectedAcademy);
  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem('novaris:intro:v1', 'seen'); } catch { /* privacy mode */ }
    setIntro(false);
    requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    function changeRoute() { setRoute(getRoute()); setMenu(false); window.scrollTo({top:0,behavior:'instant'}); requestAnimationFrame(()=>mainRef.current?.focus({preventScroll:true})); }
    window.addEventListener('hashchange', changeRoute);
    return ()=>window.removeEventListener('hashchange', changeRoute);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => { if (media.matches) finishIntro(); };
    media.addEventListener('change', changed);
    return ()=>media.removeEventListener('change',changed);
  },[finishIntro]);

  useEffect(() => {
    const titles: Record<string,string> = {home:'노바리스 학원도시',academies:'학원 인덱스',characters:'인물 데이터베이스',world:'도시 아카이브'};
    window.document.title = `${titles[page] || '페이지를 찾을 수 없습니다'} — PROJECT NOVARIS`;
  },[page]);

  useEffect(() => {
    window.document.body.style.overflow = intro ? 'hidden' : '';
    return ()=>{window.document.body.style.overflow='';};
  },[intro]);

  useEffect(() => {
    if (document) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  },[document]);

  useEffect(() => {
    function onEscape(event: KeyboardEvent) { if(event.key==='Escape' && menu) {setMenu(false);menuButton.current?.focus();} }
    window.addEventListener('keydown',onEscape);
    return ()=>window.removeEventListener('keydown',onEscape);
  },[menu]);

  useLayoutEffect(() => {
    if (intro) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.page-content', {opacity:0,y:10,duration:.45,ease:'power2.out'});
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
        gsap.from(element, {y:30,opacity:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:element,start:'top 94%',once:true}});
      });
    });
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      if (page!=='home') return;
      gsap.to('.hero-city', {y:105,scale:1.08,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
      gsap.to('.hero-title', {y:-70,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom 25%',scrub:true}});
      gsap.fromTo('.discover-art img', {scale:1.25,y:45}, {scale:1,y:-35,ease:'none',scrollTrigger:{trigger:'.discover',start:'top 80%',end:'bottom 20%',scrub:1}});
      gsap.fromTo('.discover-art', {clipPath:'inset(10% 7% 10% 7%)'}, {clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:'.discover',start:'top 70%',end:'center 50%',scrub:1}});
      gsap.utils.toArray<HTMLElement>('.story-block').forEach(element=>gsap.fromTo(element,{opacity:.35},{opacity:1,ease:'none',scrollTrigger:{trigger:element,start:'top 78%',end:'top 50%',scrub:true}}));
    });
    return ()=>mm.revert();
  },[route,intro,page]);

  const scrollToDiscover = () => window.document.getElementById('discover')?.scrollIntoView({behavior:reducedMotion()?'instant':'smooth'});
  const nav = [{path:'home',label:'OVERVIEW',ko:'도시 개요'},{path:'academies',label:'ACADEMIES',ko:'학원'},{path:'characters',label:'PERSONNEL',ko:'인물'},{path:'world',label:'ARCHIVE',ko:'아카이브'}];

  return <>
    {intro && <Intro finish={finishIntro} />}
    <div ref={appRef} className="site" inert={intro}>
      <a className="skip-link" href="#main" onClick={event=>{event.preventDefault();mainRef.current?.focus();}}>본문으로 이동</a>
      <header className="header"><a className="brand" href="#/" aria-label="PROJECT NOVARIS 홈"><Mark /><span>NOVARIS<small>ACADEMY METROPOLIS</small></span></a><nav className="desktop-nav" aria-label="주요 메뉴">{nav.map(item=><a key={item.path} href={item.path==='home'?'#/':`#/${item.path}`} aria-current={page===item.path?'page':undefined}><span>{item.label}</span><span className="nav-dot" /></a>)}</nav><div className="header-end"><span className="header-status mono"><i /> PUBLIC ARCHIVE</span><button ref={menuButton} className="menu-toggle" aria-label={menu?'메뉴 닫기':'메뉴 열기'} aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(!menu)}><span /> <span /></button></div></header>
      {menu && <nav id="mobile-menu" className="mobile-menu" aria-label="모바일 메뉴">{nav.map((item,i)=><a key={item.path} href={item.path==='home'?'#/':`#/${item.path}`} onClick={()=>setMenu(false)} aria-current={page===item.path?'page':undefined}><span className="mono">0{i+1}</span>{item.label}<small>{item.ko}</small><Arrow /></a>)}</nav>}
      <main id="main" ref={mainRef} tabIndex={-1} className="page-content">
        {page==='home' ? <>
          <section className="hero" aria-labelledby="hero-heading">
            <div className="hero-topline mono"><span>PROJECT NOVARIS / WORLD ARCHIVE</span><span>노바리스 학원도시</span><span className="hero-edition">VOL. 01 — OPENING CHAPTER</span></div>
            <h1 id="hero-heading" className="hero-title">NOVARIS<span className="hero-asterisk">✳</span></h1>
            <div className="hero-city" aria-hidden="true"><div className="city-halo" /><img src={asset('novaris-city.svg')} alt="" width="1600" height="800" fetchPriority="high" /><div className="city-beacon"><span /><i /></div></div>
            <div className="hero-side-label mono">AN UNWRITTEN WORLD / AWAITING YOUR STORY</div>
            <div className="hero-city-label mono"><i /> NOVARIS METROPOLIS<span>ARCHITECTURAL CONCEPT / 01</span></div>
            <div className="hero-bottom"><div className="hero-statement"><span className="eyebrow">SIX ACADEMIES. ONE WORLD.</span><p>여섯 학원. 하나의 도시.<br />그 안에서 시작될, 당신의 이야기.</p></div><button className="explore-button" onClick={scrollToDiscover}><span>도시 탐색하기<small>EXPLORE NOVARIS</small></span><span className="explore-circle" aria-hidden="true">↓</span></button><div className="hero-bottom-right mono"><span>SCROLL TO DISCOVER</span><span className="scroll-line" /></div></div>
          </section>
          <div className="index-strip"><span className="mono">NOVARIS / INDEX</span><span>06 <small>ACADEMIES</small></span><span>01 <small>SHARED WORLD</small></span><span className="strip-note">A CITY. A SYSTEM. A STORY.</span><span aria-hidden="true">↘</span></div>
          <section id="discover" className="section discover"><SectionLabel number="01">DISCOVER NOVARIS</SectionLabel><div className="discover-grid"><div className="discover-heading" data-reveal><h2>A CITY.<br />A SYSTEM.<br /><span>A STORY.</span></h2><p className="section-korean">도시 너머의 세계를 만나다.</p><div className="discover-art"><img src={asset('novaris-city.svg')} alt="중앙 건축물과 학원도시를 표현한 개념 건축도" width="1600" height="800" loading="lazy" /><span className="mono">FIG. 01 / THE METROPOLIS</span></div></div><div className="discover-story"><article className="story-block"><span className="mono story-index">01 / THE CITY</span><h3>하나의 도시,<br />여섯 개의 가능성.</h3><p>노바리스. 여섯 학원이 공존하는 거대 학원도시.<br />서로 다른 소속이 만나고, 관계가 교차하며<br />도시의 이야기는 시작됩니다.</p></article><article className="story-block"><span className="mono story-index">02 / THE SYSTEM</span><h3>질서와 경쟁이<br />교차하는 곳.</h3><p>도시를 통치하고 관리하는 총학생회.<br />그 안에서 펼쳐지는 학원 간 경쟁과 조직 정치.<br />익숙한 일상 너머에, 아직 드러나지 않은 이야기.</p></article><article className="story-block"><span className="mono story-index">03 / YOUR STORY</span><h3>이 세계의 다음 장은,<br />당신으로부터.</h3><p>인물과의 만남, 선택으로 이어지는 관계.<br />케이브덕 캐릭터 시뮬레이션을 위한<br />새로운 세계의 문을 엽니다.</p><a className="text-link" href="#/world">세계관 기록 열람 <Arrow /></a></article></div></div></section>
          <section className="section academies-section"><SectionLabel number="02">SIX ACADEMIES</SectionLabel><div className="section-heading" data-reveal><h2>SIX IDENTITIES.<br /><span>ONE NOVARIS.</span></h2><p>도시를 이루는 여섯 학원.<br />당신의 이야기는 어디에서 시작될까요?</p></div><AcademyExplorer /></section>
          <section className="section archive-section"><SectionLabel number="03">CITY ARCHIVE</SectionLabel><div className="section-heading" data-reveal><h2>READ THE CITY.</h2><a href="#/world" className="text-link">도시 아카이브 <Arrow /></a></div><CityMap /></section>
          <section className="section personnel-section"><SectionLabel number="04">PERSONNEL DATABASE</SectionLabel><div className="section-heading" data-reveal><h2>EVERY LIFE.<br /><span>ANOTHER STORY.</span></h2><a href="#/characters" className="text-link">인물 데이터베이스 <Arrow /></a></div><Personnel open={setDocument} /></section>
          <section className="section lore-section"><SectionLabel number="05">LORE & RECORDS</SectionLabel><div className="section-heading" data-reveal><h2>BEYOND THE<br /><span>SURFACE.</span></h2><p>도시의 질서, 구성원, 그리고 남겨질 기록.<br />노바리스의 세계를 한 장씩 열람합니다.</p></div><RecordList open={setDocument} /></section>
        </> : page==='academies' && !invalidAcademy ? <><PageHeading index="01" title="ACADEMIES" subtitle="여섯 학원, 여섯 개의 시작점." description="노바리스 학원도시를 구성하는 학원 인덱스입니다. 학원별 세부 설정은 준비 중입니다." /><div className="section subpage-section"><AcademyExplorer key={route} initial={selectedAcademy} detail /><a className="text-link subpage-back" href="#/">도시 개요로 돌아가기 <Arrow /></a></div></> : page==='characters' ? <><PageHeading index="02" title="PERSONNEL" subtitle="도시의 모든 이야기는, 사람으로부터." description="이름과 소속으로 인물을 탐색합니다. 확정된 인물 프로필이 등록되면 이곳에 공개됩니다." /><div className="section subpage-section"><Personnel open={setDocument} /><div className="database-note"><span className="eyebrow">ARCHIVE NOTICE</span><p>현재 공개된 인물 기록은 없습니다. 모든 학생과 등장인물은 만 20세 이상의 성인입니다.</p></div></div></> : page==='world' ? <><PageHeading index="03" title="WORLD ARCHIVE" subtitle="도시를 읽는 또 하나의 방법." description="학원과 조직의 연결, 도시의 배경과 기록을 탐색합니다." /><div className="section subpage-section"><SectionLabel number="A">CITY EXPLORER</SectionLabel><CityMap /><div className="world-records"><SectionLabel number="B">LORE & RECORDS</SectionLabel><RecordList open={setDocument} /></div></div></> : <div className="not-found"><span className="eyebrow">404 / RECORD NOT FOUND</span><h1>기록을 찾을 수 없습니다.</h1><p>아직 등록되지 않았거나 올바르지 않은 경로입니다.</p><a href="#/" className="text-link">도시 개요로 돌아가기 <Arrow /></a></div>}
      </main>
      <footer className="footer"><div className="footer-top"><a href="#/" className="footer-brand" aria-label="NOVARIS 홈"><Mark /><span>YOUR NEXT CHAPTER<br />STARTS HERE.</span></a><nav aria-label="하단 메뉴">{nav.map(item=><a key={item.path} href={item.path==='home'?'#/':`#/${item.path}`}>{item.label}<Arrow /></a>)}</nav><div className="footer-note"><span className="eyebrow">A FICTIONAL WORLD.<br />AN OPEN POSSIBILITY.</span><p>케이브덕 AI 캐릭터 시뮬레이션 세계관<br />모든 등장인물은 만 20세 이상입니다.</p>{page==='home' && <button className="text-button replay" onClick={()=>{if(!reducedMotion()){window.scrollTo({top:0,behavior:'instant'});setIntro(true);}else{mainRef.current?.focus();}}}>인트로 다시 보기 <span aria-hidden="true">↻</span></button>}</div></div><div className="footer-word" aria-hidden="true">NOVARIS</div><div className="footer-bottom mono"><span>© PROJECT NOVARIS</span><span>WORLD ARCHIVE / PHASE 01</span><button onClick={()=>window.scrollTo({top:0,behavior:reducedMotion()?'instant':'smooth'})}>BACK TO TOP ↑</button></div></footer>
    </div>
    <dialog ref={dialogRef} className="record-dialog" aria-labelledby="dialog-title" onClose={()=>setDocument(null)} onClick={event=>{if(event.target===event.currentTarget)setDocument(null);}}>{document && <div className="dialog-content"><div className="dialog-top"><span className="mono">NOVARIS / {'category' in document ? document.category : 'PERSONNEL'}</span><button className="dialog-close" aria-label="기록 닫기" onClick={()=>setDocument(null)} autoFocus>×</button></div><Mark className="dialog-mark" /><h2 id="dialog-title">{'title' in document ? document.title : document.name}</h2>{'english' in document && <span className="eyebrow">{document.english}</span>}<p className="dialog-body">{'content' in document ? document.content : document.summary}</p>{'age' in document && <p>{document.role} · {document.age}세</p>}<div className="dialog-bottom mono"><span>{'status' in document && document.status==='pending'?'RECORD PENDING':'PUBLIC RECORD'}</span><span>PROJECT NOVARIS</span></div></div>}</dialog>
  </>;
}

function PageHeading({index,title,subtitle,description}:{index:string;title:string;subtitle:string;description:string}) {
  return <section className="page-heading"><div className="page-breadcrumb mono"><a href="#/">NOVARIS</a><span>/</span><span>{index} — {title}</span></div><h1>{title}<span>↘</span></h1><div className="page-introduction"><h2>{subtitle}</h2><p>{description}</p></div></section>;
}
