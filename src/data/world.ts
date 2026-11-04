export interface Academy {
  id: string;
  name: string;
  english: string;
  code: string;
  color: string;
  emblem: number;
  description: string | null;
  status: 'pending' | 'published';
}

// Colors and symbols are provisional interface art direction, not canon insignia.
export const academies: Academy[] = [
  { id: 'astel', name: '아스텔 학원', english: 'ASTEL', code: 'AC–01', color: '#a9d8c5', emblem: 0, description: null, status: 'pending' },
  { id: 'legion', name: '레기온 학원', english: 'LEGION', code: 'AC–02', color: '#dba695', emblem: 1, description: null, status: 'pending' },
  { id: 'aether', name: '에테르 학원', english: 'AETHER', code: 'AC–03', color: '#9abed9', emblem: 2, description: null, status: 'pending' },
  { id: 'lumiere', name: '루미에르 학원', english: 'LUMIÈRE', code: 'AC–04', color: '#d9cb97', emblem: 3, description: null, status: 'pending' },
  { id: 'nocturne', name: '노크턴 학원', english: 'NOCTURNE', code: 'AC–05', color: '#b4a6d3', emblem: 4, description: null, status: 'pending' },
  { id: 'bellua', name: '벨루아 학원', english: 'BELLUA', code: 'AC–06', color: '#d0b8a6', emblem: 5, description: null, status: 'pending' },
];

export const affiliations = [
  ...academies.map(({ id, name }) => ({ id, name })),
  { id: 'council', name: '총학생회' },
  { id: 'other', name: '기타 소속' },
  { id: 'hostile', name: '적대 세력' },
];

export interface Character {
  id: string;
  name: string;
  affiliation: string;
  age: number;
  role: string;
  summary: string;
  portrait?: string;
}

// Add only approved characters here. No invented names or profiles are published.
export const characters: Character[] = [];

export function filterCharacters(records: Character[], query: string, affiliation: string) {
  const term = query.normalize('NFKC').trim().toLocaleLowerCase('ko');
  return records.filter((person) =>
    (affiliation === 'all' || person.affiliation === affiliation) &&
    [person.name, person.role, person.summary].some(value => value.normalize('NFKC').toLocaleLowerCase('ko').includes(term)),
  );
}

export interface WorldRecord {
  id: string;
  category: string;
  title: string;
  english: string;
  content: string;
  status: 'published' | 'pending';
  date: string | null;
}

export const records: WorldRecord[] = [
  { id: 'overview', category: 'WORLD', title: '노바리스 학원도시', english: 'A CITY OF POSSIBILITIES', content: '노바리스는 여섯 학원이 공존하는 거대 학원도시입니다. 근미래의 도시를 배경으로 학원 간 경쟁, 조직 정치, 미스터리와 인물들의 관계가 펼쳐집니다. 케이브덕 AI 캐릭터 시뮬레이션을 위한 창작 세계관입니다.', status: 'published', date: null },
  { id: 'council', category: 'ORGANIZATION', title: '총학생회', english: 'GENERAL STUDENT COUNCIL', content: '총학생회는 노바리스 학원도시의 주요 통치 및 관리 조직입니다. 조직의 세부 구성, 권한 범위와 관계자 정보는 아직 확정되지 않았습니다.', status: 'published', date: null },
  { id: 'community', category: 'FOUNDATION', title: '도시의 구성원', english: 'THE PEOPLE OF NOVARIS', content: '노바리스는 남녀공학 세계관이며 주요 캐릭터는 여성 중심으로 구성됩니다. 모든 학생과 등장인물은 만 20세 이상의 성인입니다. 각 학원과 총학생회, 다양한 소속 및 적대 세력의 인물들이 등장할 예정입니다.', status: 'published', date: null },
  { id: 'chronology', category: 'CHRONOLOGY', title: '도시 연대기', english: 'A HISTORY YET TO UNFOLD', content: '도시의 역사와 사건 기록은 준비 중입니다. 공식 연도와 사건이 확정되면 이곳에서 시간순으로 열람할 수 있습니다.', status: 'pending', date: null },
];
