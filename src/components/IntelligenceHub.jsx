/*
 * Existing technical monograph, local extension. Experience → operate.
 * FIRST VIEWPORT: one concrete request, live source connections, and a readable briefing.
 * Signature: actual tool-call events become cited observations; citations filter the evidence ledger.
 * Preserve full client-monitoring capture; this separate public-data demo replaces homepage sailing tabs.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../LangContext';
import { missions, providers } from '../intelligence-config';
import './IntelligenceHub.css';
import SignalMap from './SignalMap';

function Arrow() { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>; }
function formatTime(value, kr) {
  if (!value || Number.isNaN(Date.parse(value))) return '—';
  return new Intl.DateTimeFormat(kr ? 'ko-KR' : 'en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Seoul' }).format(new Date(value));
}
const errorCopy = {
  rate_limited: ['잠시 요청이 많습니다. 10분 뒤 다시 실행해 주세요. 공개 정보는 계속 확인할 수 있습니다.', 'The demo is busy. Try again in 10 minutes; public sources remain available.'],
  busy: ['같은 범위의 브리핑을 생성 중입니다. 잠시 뒤 다시 실행하면 결과를 받을 수 있습니다.', 'A briefing for this scope is being generated. Try again shortly to retrieve it.'],
  agent_unavailable: ['AI 브리핑을 완료하지 못했습니다. 다시 실행하거나 아래 원문을 확인해 주세요.', 'The AI briefing could not finish. Retry or review the source records below.'],
};
function Desk({ kr }) {
  const l = kr ? 0 : 1;
  const [mission, setMission] = useState('panama');
  const [sources, setSources] = useState([]);
  const [result, setResult] = useState(null);
  const [phase, setPhase] = useState('idle');
  const [tools, setTools] = useState({});
  const [feedState, setFeedState] = useState('loading');
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [reload, setReload] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const root = useRef(null);
  const ledger = useRef(null);
  const runController = useRef(null);
  const busy = ['planning', 'collecting', 'synthesizing'].includes(phase);
  const selected = missions.find(m => m.id === mission);
  useEffect(() => {
    const controller = new AbortController();
    let started = false;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting) || started) return;
      started = true;
      fetch(`/api/intelligence?mission=${mission}`, { signal: controller.signal })
        .then(async r => { if (!r.ok) throw new Error('feeds'); return r.json(); })
        .then(data => { setSources(data.sources); setFeedState(data.sources.some(s => s.status === 'ok') ? 'ready' : 'error'); })
        .catch(e => { if (e.name !== 'AbortError') setFeedState('error'); });
    }, { rootMargin: '200px' });
    observer.observe(root.current);
    return () => { observer.disconnect(); controller.abort(); };
  }, [mission, reload]);
  useEffect(() => () => runController.current?.abort(), []);
  useEffect(() => {
    if (!busy) return;
    const started = Date.now();
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [busy]);
  function changeMission(id) {
    if (busy || id === mission) return;
    setMission(id); setSources([]); setResult(null); setError(null); setFilter(null); setExpanded(false); setTools({}); setPhase('idle'); setFeedState('loading'); setEvidenceOpen(false);
  }
  function showEvidence(finding) {
    setEvidenceOpen(true);
    setFilter({ records: finding.records, sources: finding.sources });
    requestAnimationFrame(() => { ledger.current?.focus({ preventScroll: true }); ledger.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); });
  }
  async function run() {
    if (busy) return;
    setElapsed(0); setEvidenceOpen(false); setPhase('planning'); setError(null); setResult(null); setFilter(null); setExpanded(false); setTools({});
    const controller = new AbortController();
    runController.current = controller;
    const timeout = setTimeout(() => controller.abort(), 80000);
    let completed = false;
    function receive(event) {
      if (event.type === 'planning') setPhase('planning');
      if (event.type === 'tool_start') { setPhase('collecting'); setTools(t => ({ ...t, [event.id]: 'running' })); }
      if (event.type === 'tool_end') {
        setTools(t => ({ ...t, [event.source.id]: event.source.status }));
        setSources(previous => [...previous.filter(s => s.id !== event.source.id), event.source]);
      }
      if (event.type === 'synthesizing') setPhase('synthesizing');
      if (event.type === 'error') throw new Error(event.error);
      if (event.type === 'complete') { completed = true; setResult(event); setSources(event.sources); setPhase('done'); }
    }
    try {
      const response = await fetch('/api/intelligence', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mission, lang: kr ? 'kr' : 'en' }), signal: controller.signal });
      if (!response.ok) { const data = await response.json(); throw new Error(data.error); }
      if (response.headers.get('content-type')?.includes('application/json')) receive({ ...await response.json(), type: 'complete' });
      else {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n'); buffer = lines.pop();
          for (const line of lines) if (line.trim()) receive(JSON.parse(line));
        }
        if (buffer.trim()) receive(JSON.parse(buffer));
      }
      if (!completed) throw new Error('agent_unavailable');
    } catch (e) { setPhase('error'); setError(errorCopy[e.message] || errorCopy.agent_unavailable); }
    finally { clearTimeout(timeout); }
  }
  const displaySources = result?.sources || sources;
  const records = displaySources.flatMap(s => s.records || []);
  const previewRecords = providers.flatMap(p => displaySources.find(s => s.id === p.id)?.records.slice(0, 2) || []);
  const visibleRecords = filter ? records.filter(r => filter.records.length ? filter.records.includes(r.id) : filter.sources.includes(r.source)) : expanded ? records : previewRecords;
  const phases = { idle: ['실행 준비', 'Ready to run'], planning: ['정보원 연결 중', 'Connecting sources'], collecting: ['공개 정보를 가져오는 중', 'Gathering observations'], synthesizing: ['근거를 대조하고 핵심을 추리는 중', 'Finding what deserves attention'], done: ['브리핑 완료', 'Brief ready'], error: ['실행 중단', 'Run interrupted'] };
  const step = phase === 'done' ? 3 : phase === 'synthesizing' ? 2 : busy ? 1 : 0;
  return <section className="intelligence" id="intelligence" ref={root} aria-labelledby="intelligence-title">
    <div className="intelligence-intro">
      <h4 id="intelligence-title">{kr ? '항로 주변의 변화를, AI가 먼저 읽는다면.' : 'Let AI read the signals along the route.'}</h4>
      <p>{kr ? '운송 관제에서 필요한 외부 정보 확인을 공개 데이터로 체험해 보세요. 파나마와 미국 도착지 주변의 관측을 모아, AI가 확인할 이슈와 근거를 정리합니다.' : 'Try the external-information check behind shipment monitoring. Explore observations around Panama or the US arrival area, then ask AI to identify what needs a closer look.'}</p>
    </div>
    <div className="signal-desk">
      <header className="desk-header"><h5>Signal Desk</h5><span>{kr ? '공개 API × AI 브리핑' : 'Public APIs × AI briefing'}</span></header>
      <div className="desk-task">
        <div className="desk-scopes" role="group" aria-label={kr ? '조회 범위' : 'Scope'}>{missions.map(m => <button key={m.id} aria-pressed={mission === m.id} disabled={busy} onClick={() => changeMission(m.id)}>{m.name[l]}</button>)}</div>
        <div className="desk-request"><p>{selected.prompt[l]}</p><button className="desk-run" onClick={run} disabled={busy}>{busy ? (kr ? '확인 중' : 'Working') : result ? (kr ? '다시 확인' : 'Check again') : (kr ? '에이전트 실행' : 'Run agent')}<Arrow /></button></div>
      </div>
      <div className="desk-status" role="status" aria-live="polite"><span className={busy ? 'status-dot running' : 'status-dot'} aria-hidden="true" /><strong>{phases[phase][l]}</strong>{result && <a className="desk-brief-jump" href="#signal-brief">{kr ? '브리핑 보기' : 'Read briefing'}<Arrow /></a>}<span>{result ? `${result.cached ? (kr ? '최근 결과 · ' : 'Recent result · ') : ''}${formatTime(result.generatedAt, kr)} KST` : busy ? (kr ? '조회 결과부터 표시합니다' : 'Source results appear as they arrive') : (kr ? '실제 공개 데이터를 조회합니다' : 'Queries real public data')}</span></div>
      <SignalMap key={mission} mission={mission} sources={displaySources} loading={feedState === 'loading' && !displaySources.length} kr={kr} />
      <div className="desk-connections" aria-label={kr ? '정보원 연결 상태' : 'Source connections'}>
        {providers.map(p => {
          const source = displaySources.find(s => s.id === p.id);
          const state = tools[p.id];
          const unsupported = source?.status === 'not_applicable' || (mission === 'panama' && p.id === 'weather');
          let status = kr ? '연결 대기' : 'Waiting';
          if (feedState === 'loading' && !source) status = kr ? '불러오는 중' : 'Loading';
          if (source?.status === 'ok') status = kr ? `${source.records.length}건 ${result || state === 'ok' ? '확인' : '준비'}` : `${source.records.length} records ${result || state === 'ok' ? 'checked' : 'ready'}`;
          if (unsupported) status = kr ? '이 지역 미지원' : 'Outside coverage';
          if (source?.status === 'unavailable' || (feedState === 'error' && !source)) status = kr ? '연결 실패' : 'Unavailable';
          if (state === 'running') status = kr ? '조회 중' : 'Querying';
          return <div className="desk-connection" key={p.id} data-state={state === 'running' ? 'running' : unsupported ? 'unsupported' : source?.status}>
            <span className="connection-label">{p.label[l]}</span><strong>{p.name}</strong><span className="connection-status"><i aria-hidden="true" />{status}</span>
          </div>;
        })}
      </div>

      <div className="desk-brief" id="signal-brief" aria-busy={busy}>
        {result ? <>
          <h5 className="brief-headline">{result.brief.title}</h5><p className="brief-summary">{result.brief.summary}</p>
          <ol className="brief-findings">{result.brief.findings.map((f, i) => <li key={i}>
            <span className="finding-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div><h6>{f.title}</h6><p className="brief-action">{f.action}</p>
              <details className="finding-detail"><summary>{kr ? '판단 근거' : 'Why this matters'}</summary><p>{f.detail}</p><button className="brief-citation" onClick={() => showEvidence(f)} aria-pressed={filter?.records === f.records}>{kr ? '원문 확인' : 'View sources'} <span>{f.sources.map(id => providers.find(p => p.id === id)?.name).join(' · ')}</span><Arrow /></button></details>
            </div>
          </li>)}</ol>
        </> : <div className="brief-awaiting">
          {busy && <div className="brief-progress" aria-label={kr ? '실행 단계' : 'Run stages'}>{[[kr ? 'API 조회' : 'Query APIs'], [kr ? '핵심 정리' : 'Find signals'], [kr ? '브리핑' : 'Brief']].map(([label], i) => <span key={i} data-state={step > i + 1 ? 'done' : step === i + 1 ? 'active' : 'pending'}><b aria-hidden="true">0{i + 1}</b>{label}</span>)}</div>}
          <h5>{busy ? phases[phase][l] : (kr ? '이 구간에서, 무엇을 확인해야 할까?' : 'What needs a closer look on this leg?')}</h5>
          <p>{busy ? (phase === 'synthesizing' ? (kr ? '도착한 관측을 읽고, 확인할 이슈와 다음 행동을 정리하고 있습니다.' : 'Reading the observations to identify relevant signals and next steps.') : (kr ? '정보원을 동시에 조회합니다. 도착한 결과는 위에 바로 표시됩니다.' : 'Querying sources in parallel. Results appear above as they arrive.')) : (kr ? '지도의 관측만으로 운송 영향을 단정할 수는 없습니다. AI가 조회한 근거를 읽고, 담당자가 추가로 확인할 일을 정리합니다.' : 'An observation alone does not establish a shipping impact. The agent reads the evidence and suggests what an operator should check next.')}</p>
          {busy && <p className="desk-elapsed"><span>{elapsed}{kr ? '초 경과' : 's elapsed'}</span>{elapsed >= 15 && <span>{kr ? '응답이 늦어지고 있습니다. 수집한 원문은 아래에서 먼저 볼 수 있습니다.' : 'Taking a little longer. You can already open the source records below.'}</span>}</p>}
        </div>}
        {error && <div className="desk-error" role="alert"><p>{error[l]}</p><button onClick={run}>{kr ? '다시 실행' : 'Retry'}</button></div>}
      </div>
      <details className="desk-evidence" id="signal-evidence" open={evidenceOpen} onToggle={event => setEvidenceOpen(event.currentTarget.open)}>
        <summary>{kr ? '근거와 조회 범위' : 'Sources & coverage'}<span>{kr ? `수집 원문 ${records.length}건` : `${records.length} retrieved records`}</span></summary>
        <div className="evidence-content">
          <div className="evidence-ledger-head"><h5 ref={ledger} tabIndex={-1}>{filter ? (kr ? '브리핑의 근거' : 'Briefing evidence') : (kr ? '수집한 원문' : 'Source observations')}</h5>{filter && <button onClick={() => { setFilter(null); setExpanded(true); }}>{kr ? '전체 보기' : 'Show all'}</button>}</div>
          {visibleRecords.length ? <ul>{visibleRecords.map(r => <li key={r.id}><span>{providers.find(p => p.id === r.source)?.name}</span><a href={r.url || providers.find(p => p.id === r.source).url} target="_blank" rel="noreferrer">{r.title}<Arrow /></a><time dateTime={r.occurredAt}>{formatTime(r.occurredAt, kr)} KST</time></li>)}</ul> : <p className="ledger-empty">{feedState === 'loading' ? (kr ? '공개 API에서 정보를 불러오고 있습니다.' : 'Loading observations from public APIs.') : displaySources.some(s => s.status === 'ok') ? (kr ? '조회 범위에 표시할 관측이 없습니다. 위험이 없다는 뜻은 아닙니다.' : 'No observations in this scope. This does not establish the absence of risk.') : (kr ? '현재 원문을 가져오지 못했습니다.' : 'Source records are unavailable.')}</p>}
          {!filter && records.length > previewRecords.length && <button className="desk-retry-feeds" onClick={() => setExpanded(v => !v)}>{expanded ? (kr ? '미리보기로 접기' : 'Collapse to preview') : (kr ? `원문 ${records.length}건 모두 보기` : `Show all ${records.length} records`)}</button>}
          <div className="source-metadata">{providers.map(p => {
            const source = displaySources.find(s => s.id === p.id);
            return <p key={p.id}><a href={p.url} target="_blank" rel="noreferrer">{p.name} ↗</a><span>{p.coverage[l]}{source?.status === 'ok' ? (kr ? ` · 조회 ${source.count}건 중 ${source.records.length}건 수집` : ` · ${source.records.length} of ${source.count} retrieved`) : ''}{source?.fetchedAt ? ` · ${formatTime(source.fetchedAt, kr)} KST` : ''}</span></p>;
          })}</div>
          <p className="desk-scope-note">{mission === 'world' ? (kr ? '기상 특보는 미국, 재해·지진은 전 세계를 조회합니다.' : 'Weather alerts cover the US; natural events and earthquakes cover the world.') : mission === 'panama' ? (kr ? '파나마 운하 반경 1,000km를 조회합니다. NOAA 기상 특보는 이 지역을 지원하지 않습니다.' : 'Within 1,000 km of the Panama Canal. NOAA alerts do not cover this area.') : (kr ? '재해·지진은 Newark 반경 750km, 기상 특보는 Newark 지점 기준입니다.' : 'Events and earthquakes within 750 km of Newark; weather alerts at Newark point.')}</p>
          {result?.brief.unknowns.length > 0 && <div className="brief-unknown"><h6>{kr ? '추가 확인이 필요한 부분' : 'Still to verify'}</h6><ul>{result.brief.unknowns.map(v => <li key={v}>{v}</li>)}</ul></div>}
          {feedState === 'error' && !busy && <button className="desk-retry-feeds" onClick={() => { setFeedState('loading'); setReload(v => v + 1); }}>{kr ? '정보원 다시 조회' : 'Retry sources'}</button>}
          <p className="desk-scope-note">{kr ? '최대 10분 캐시 · NASA 목록 최대 100건 · 원문 영어. 항만 운영·선박 위치·고객 일정은 연결하지 않았습니다.' : 'Up to 10-minute cache · NASA catalog capped at 100 · English source text. Port operations, vessel positions, and client schedules are not connected.'}</p>
        </div>
      </details>
      <footer className="desk-footnote"><p>{kr ? '공개 데이터 데모 · 수집된 표본 기준이며, 운송 영향이나 안전 여부를 판단하지 않습니다.' : 'Public-data demo · Based on retrieved samples, not a determination of shipping impact or safety.'}</p></footer>
    </div>
    <a className="text-link intelligence-case-link" href="/case-study/fsk">{kr ? '운송 관제와 출고 계획의 실제 설계 과정' : 'The shipment monitoring and planning case study'}<Arrow /></a>
  </section>;
}
export default function IntelligenceHub() { const { lang } = useLang(); return <Desk key={lang} kr={lang === 'kr'} />; }
