import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { academies } from '../data/world';
import { Arrow, Emblem } from './Identity';

export function AcademyExplorer({ initial = 'astel', detail = false }: { initial?: string; detail?: boolean }) {
  const [selected, setSelected] = useState(academies.find(a => a.id === initial) || academies[0]);
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const offset = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 0;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 5 : (index + offset + 6) % 6;
    if (offset || event.key === 'Home' || event.key === 'End') {
      event.preventDefault(); setSelected(academies[next]); document.getElementById(`tab-${academies[next].id}`)?.focus();
    }
  }
  return <div className="academy-explorer" style={{ '--academy': selected.color } as CSSProperties}>
    <div className="academy-tabs" role="tablist" aria-label="학원 선택" aria-orientation="vertical">
      {academies.map((academy, i) => <button id={`tab-${academy.id}`} key={academy.id} role="tab" aria-selected={selected.id === academy.id} aria-controls="academy-panel" tabIndex={selected.id === academy.id ? 0 : -1} onKeyDown={event => onKey(event, i)} onClick={() => setSelected(academy)} className={selected.id === academy.id ? 'selected' : ''}><span className="mono tab-number">0{i + 1}</span><span className="tab-name">{academy.english}<small>{academy.name}</small></span><span className="tab-cross" aria-hidden="true">{selected.id === academy.id ? '↗' : '+'}</span></button>)}
    </div>
    <div id="academy-panel" role="tabpanel" aria-labelledby={`tab-${selected.id}`} tabIndex={0} className="academy-panel">
      <div className="academy-topline mono"><span>{selected.code} / ACADEMY INDEX</span><span>0{academies.indexOf(selected) + 1} — 06</span></div>
      <div className="emblem-stage" key={selected.id}><div className="orbit orbit-one" /><div className="orbit orbit-two" /><Emblem variant={selected.emblem} /><span className="emblem-coordinate mono">N / V</span></div>
      <div className="academy-panel-bottom"><div><span className="eyebrow">{selected.english} ACADEMY</span><h3>{selected.name}</h3></div><span className="status">상세 기록 준비 중</span></div>
      <p className="academy-description">{selected.description || '학원의 이야기와 구성원은 차례로 공개됩니다.'}</p>
      {!detail && <a className="text-link" href={`#/academies/${selected.id}`}>학원 기록 열람 <Arrow /></a>}
      {detail && <div className="pending-fields"><span>학원 소개 <b>준비 중</b></span><span>소속 인물 <b>등록 예정</b></span><span>관련 기록 <b>준비 중</b></span></div>}
      <p className="concept-note">색상과 심벌은 웹사이트용 임시 식별 디자인입니다.</p>
    </div>
  </div>;
}
