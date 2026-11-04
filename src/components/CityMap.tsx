import { useState, type CSSProperties } from 'react';
import { academies } from '../data/world';
import { asset, Arrow } from './Identity';

const positions = [[31,34],[55,24],[72,43],[62,70],[36,72],[19,53]];

export function CityMap() {
  const [active, setActive] = useState<string>('council');
  const academy = academies.find(a => a.id === active);
  return <div className="city-map-layout">
    <div className="city-map">
      <div className="map-grid" /><img src={asset('novaris-city.svg')} alt="노바리스 도시의 개념 건축 모형" loading="lazy" width="1600" height="800" />
      <svg className="map-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{positions.map(([x,y],i) => <line key={i} x1="47" y1="46" x2={x} y2={y} className={active === academies[i].id ? 'active' : ''} />)}</svg>
      <span className="map-corner mono">N ↑<br />CONCEPT VIEW</span>
      {academies.map((a,i) => <button key={a.id} className={`map-node ${active === a.id ? 'active' : ''}`} style={{left: `${positions[i][0]}%`, top: `${positions[i][1]}%`, '--academy':a.color} as CSSProperties} aria-pressed={active===a.id} aria-label={`${a.name} 지도에서 선택`} onClick={() => setActive(a.id)}><span className="node-dot" /><span className="node-label">{a.english}</span><span className="node-code mono">0{i+1}</span></button>)}
      <button className={`map-node council-node ${active === 'council' ? 'active' : ''}`} style={{left:'47%',top:'46%'}} aria-pressed={active==='council'} onClick={()=>setActive('council')} aria-label="총학생회 지도에서 선택"><span className="node-dot" /><span className="node-label">COUNCIL</span></button>
      <span className="map-caption mono">SCHEMATIC ONLY / NOT TO SCALE</span>
    </div>
    <aside className="map-details" aria-live="polite"><span className="eyebrow">SELECTED / {academy?.code || 'ORG–01'}</span><div className="map-detail-symbol" aria-hidden="true">{academy ? '0'+(academies.indexOf(academy)+1) : '◎'}</div><h3>{academy?.name || '총학생회'}</h3><p>{academy ? '학원 위치와 주변 구역에 관한 공식 기록을 준비하고 있습니다.' : '노바리스 학원도시의 주요 통치 및 관리 조직.'}</p><dl><div><dt>분류</dt><dd>{academy ? '학원' : '도시 관리 조직'}</dd></div><div><dt>구역 · 시설</dt><dd>공개 예정</dd></div></dl>{academy && <a className="text-link" href={`#/academies/${academy.id}`}>학원 기록 <Arrow /></a>}<p className="concept-note">탐색을 위한 개념도입니다.<br />실제 위치와 지리 설정은 미확정입니다.</p></aside>
  </div>;
}
