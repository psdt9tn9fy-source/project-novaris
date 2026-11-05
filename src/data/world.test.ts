import test from 'node:test';
import assert from 'node:assert/strict';
import { academies, affiliations, characters, filterCharacters, type Character } from './world';

const sample: Character[] = [
  { id: 'fixture-a', name: '테스트 인물', affiliation: 'astel', age: 20, role: '대표', summary: '검색 테스트 전용' },
  { id: 'fixture-b', name: 'SAMPLE', affiliation: 'council', age: 24, role: '기록관', summary: 'fixture only' },
];

test('search and affiliation filters compose, including whitespace and case', () => {
  assert.equal(filterCharacters(sample, '  테스트 ', 'astel').length, 1);
  assert.equal(filterCharacters(sample, '테스트', 'council').length, 0);
  assert.equal(filterCharacters(sample, 'sample', 'all')[0].id, 'fixture-b');
  assert.equal(filterCharacters(sample, '', 'all').length, 2);
  assert.equal(filterCharacters(sample, '없는 인물', 'all').length, 0);
});

test('published data preserves six academies, unique IDs and adult-only profiles', () => {
  assert.equal(academies.length, 6);
  assert.equal(new Set(affiliations.map(x => x.id)).size, affiliations.length);
  for (const person of characters) {
    assert.ok(person.age >= 20);
    assert.ok(affiliations.some(x => x.id === person.affiliation));
  }
  assert.equal(new Set(characters.map(person => person.id)).size, characters.length);
});
