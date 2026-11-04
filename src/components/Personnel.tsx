import { useState } from 'react';
import { affiliations, characters, filterCharacters, type Character } from '../data/world';
import { Arrow, asset } from './Identity';

export function CharacterProfile({ person, open }: { person: Character; open: (person: Character) => void }) {
  return <button className="character-profile" onClick={() => open(person)}>{person.portrait ? <img src={asset(person.portrait)} alt={person.name} loading="lazy" width="480" height="600" /> : <div className="portrait-placeholder" aria-hidden="true">N / V</div>}<span className="eyebrow">{affiliations.find(a=>a.id===person.affiliation)?.name}</span><h3>{person.name}</h3><p>{person.role} · {person.age}세</p><Arrow /></button>;
}

export function Personnel({ open }: { open: (person: Character) => void }) {
  const [query, setQuery] = useState('');
  const [affiliation, setAffiliation] = useState('all');
  const people = filterCharacters(characters, query, affiliation);
  const filtered = Boolean(query || affiliation !== 'all');
  return <div className="personnel">
    <div className="personnel-toolbar"><label className="search-field"><span aria-hidden="true">⌕</span><input type="search" placeholder="이름 또는 키워드로 검색" aria-label="인물 이름 또는 키워드 검색" value={query} onChange={e=>setQuery(e.target.value)} /></label><label className="select-field"><span className="sr-only">소속 필터</span><select value={affiliation} onChange={e=>setAffiliation(e.target.value)}><option value="all">모든 소속</option>{affiliations.map(a=><option value={a.id} key={a.id}>{a.name}</option>)}</select></label><span className="mono results-count" role="status">{String(people.length).padStart(2,'0')} RECORDS</span></div>
    {people.length ? <div className="personnel-grid">{people.map(person=><CharacterProfile key={person.id} person={person} open={open} />)}</div> : <div className="personnel-empty"><div className="empty-portrait" aria-hidden="true"><svg viewBox="0 0 180 210" fill="none"><path d="M20 190c0-49 26-71 70-71s70 22 70 71M90 36c-22 0-34 19-34 41 0 25 15 44 34 44s34-19 34-44c0-22-12-41-34-41Z" stroke="currentColor" strokeWidth="1"/><path d="M15 15h25M15 15v25M165 15h-25M165 15v25M15 195h25M15 195v-25M165 195h-25M165 195v-25" stroke="currentColor"/></svg><span className="mono">PROFILE / PENDING</span></div><div className="empty-copy"><span className="eyebrow">{filtered ? 'NO MATCHING RECORDS' : 'THE PEOPLE BEHIND THE CITY'}</span><h3>{filtered ? '일치하는 인물 기록이 없습니다.' : '도시는, 사람으로 완성된다.'}</h3><p>{filtered ? '공개된 인물 기록이 아직 없습니다. 다른 소속을 선택하거나 검색 조건을 초기화해 보세요.' : '학원과 조직, 그리고 그 안에서 교차하는 이야기들.\n노바리스의 인물 기록은 곧 이곳에서 공개됩니다.'}</p>{filtered ? <button className="text-button" onClick={()=>{setQuery('');setAffiliation('all');}}>검색 조건 초기화 <Arrow /></button> : <span className="status">인물 데이터 등록 준비 중</span>}</div><span className="empty-index" aria-hidden="true">N° —</span></div>}
    <div className="personnel-footnote mono"><span>PERSONNEL ARCHIVE / PHASE 01</span><span>모든 등장인물은 만 20세 이상입니다.</span></div>
  </div>;
}
