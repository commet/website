import test from 'node:test';
import assert from 'node:assert/strict';
import { distanceKm, normalizeSource, fetchSource, safeUrl, sourceUrl, validateBrief, boundEmptyFindings } from '../lib/intelligence.js';

test('regional filtering uses distance across the antimeridian, excluding distant events', () => {
  assert.ok(distanceKm(0, 179, 0, -179) < 225);
  const raw = { features: [
    { id: 'near', geometry: { coordinates: [-79.7, 9.1] }, properties: { mag: 5, title: 'Near Panama', time: Date.now(), url: 'https://earthquake.usgs.gov/example' } },
    { id: 'far', geometry: { coordinates: [140, 35] }, properties: { mag: 7, title: 'Far away', time: Date.now(), url: 'https://earthquake.usgs.gov/example' } },
  ] };
  const source = normalizeSource('earthquakes', raw, 'panama');
  assert.equal(source.count, 1); assert.equal(source.records[0].key, 'near');
});
test('weather failure, successful zero and unsupported coverage remain distinct', async () => {
  const failed = await fetchSource('weather', 'newark', async () => { throw new Error('timeout'); });
  const empty = await fetchSource('weather', 'newark', async () => ({ ok: true, json: async () => ({ features: [] }) }));
  const unsupported = await fetchSource('weather', 'panama', () => { throw new Error('Must not be called'); });
  assert.equal(failed.status, 'unavailable'); assert.equal(failed.count, null);
  assert.equal(empty.status, 'ok'); assert.equal(empty.count, 0);
  assert.equal(unsupported.status, 'not_applicable');
});
test('old NASA geometry cannot be presented as a recent event', () => {
  const now = Date.parse('2026-11-02T00:00:00Z');
  const raw = { events: [{ id: 'old', title: 'Old fire', categories: [], geometry: [{ date: '2026-01-01', type: 'Point', coordinates: [-79.7, 9.1] }] }] };
  assert.equal(normalizeSource('disasters', raw, 'world', now).count, 0);
});
test('brief rejects invented citation IDs and citations to failed sources', () => {
  const sources = [{ id: 'weather', status: 'ok', records: [{ id: 'weather-1' }] }, { id: 'disasters', status: 'unavailable', records: [] }];
  const brief = { title: 'Brief', summary: 'Summary', findings: [{ title: 'Finding', detail: 'Observation', action: 'Check source', sources: ['weather'], records: ['weather-1'] }], unknowns: ['Operational impact unknown'] };
  assert.ok(validateBrief(brief, sources));
  brief.findings[0].records = ['invented']; assert.equal(validateBrief(brief, sources), null);
  brief.findings[0].records = []; brief.findings[0].sources = ['disasters']; assert.equal(validateBrief(brief, sources), null);
});
test('API destinations are fixed and source links reject non-HTTPS schemes', () => {
  assert.throws(() => sourceUrl('https://attacker.example', 'world'));
  assert.equal(safeUrl('javascript:alert(1)'), null);
  assert.equal(safeUrl('https://www.weather.gov/'), 'https://www.weather.gov/');
});
test('verified source URLs canonicalize without accepting arbitrary citations', () => {
  const source = { id: 'earthquakes', status: 'ok', url: 'https://earthquake.usgs.gov/feed', records: [{ id: 'earthquakes-1' }] };
  const brief = { title: 'Brief', summary: 'Summary', findings: [{ title: 'Event', detail: 'Observation', action: 'Check', sources: [source.url], records: ['earthquakes-1'] }], unknowns: [] };
  assert.deepEqual(validateBrief(brief, [source]).findings[0].sources, ['earthquakes']);
  brief.findings[0].sources = ['https://unverified.example'];
  assert.equal(validateBrief(brief, [source]), null);
});
test('zero-result sources cannot carry invented contextual findings', () => {
  const source = { id: 'disasters', status: 'ok', count: 0, scope: 'Panama radius', records: [] };
  const brief = { title: 'Brief', summary: 'Bounded lookup', findings: [{ title: 'Seasonal claim', detail: 'Unsupported seasonal fact', action: 'Unfounded action', sources: ['disasters'], records: [] }], unknowns: [] };
  const valid = validateBrief(brief, [source]);
  assert.ok(valid);
  assert.doesNotMatch(JSON.stringify(boundEmptyFindings(valid, [source], 'en')), /Unsupported seasonal fact/);
  source.count = 3;
  assert.equal(validateBrief(brief, [source]), null);
});
