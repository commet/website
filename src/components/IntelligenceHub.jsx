/*
 * Existing technical monograph, local extension. Experience → operate.
 * FIRST VIEWPORT: one concrete request, live source connections, and a readable briefing.
 * Signature: actual tool-call events become cited observations; citations filter the evidence ledger.
 * Preserve full Electrovaya capture; this separate public-data demo replaces homepage sailing tabs.
 * FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
 */
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../LangContext';
import { missions, providers } from '../intelligence-config';
import './IntelligenceHub.css';

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
  const [mission, setMission] = useState('world');
  const [sources, setSources] = useState([]);
  const [result, setResult] = useState(null);
  const [phase, setPhase] = useState('idle');
  const [tools, setTools] = useState({});
  const [feedState, setFeedState] = useState('loading');
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [reload, setReload] = useState(0);
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
  function changeMission(id) {
    if (busy || id === mission) return;
    setMission(id); setSources([]); setResult(null); setError(null); setFilter(null); setExpanded(false); setTools({}); setPhase('idle'); setFeedState('loading');
  }
  function showEvidence(finding) {
    setFilter({ records: finding.records, sources: finding.sources });
    requestAnimationFrame(() => { ledger.current?.focus({ preventScroll: true }); ledger.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); });
  }
  async function run() {
    if (busy) return;
    setPhase('planning'); setError(null); setResult(null); setFilter(null); setExpanded(false); setTools({});
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
  const phases = { idle: ['요청 대기', 'Ready'], planning: ['조회할 정보 선택 중', 'Choosing sources'], collecting: ['API 조회 중', 'Checking APIs'], synthesizing: ['근거 대조 · 브리핑 작성 중', 'Comparing evidence · Writing brief'], done: ['브리핑 완료', 'Brief ready'], error: ['실행 중단', 'Run interrupted'] };
  return <section className="intelligence" id="intelligence" ref={root} aria-labelledby="intelligence-title">
    <div className="intelligence-intro">
      <h4 id="intelligence-title">{kr ? '정보를 모으고, 확인할 일을 찾는 에이전트.' : 'An agent that finds what needs a closer look.'}</h4>
      <p>{kr ? '질문에 맞는 API를 조회하고, 흩어진 관측 정보를 근거와 함께 정리합니다. 아래에서 직접 실행해 보세요.' : 'It chooses APIs for the question, checks observations, and builds a briefing with sources. Run it below.'}</p>
    </div>
    <div className="signal-desk">
      <header className="desk-header"><h5>Signal Desk</h5><span>{kr ? '공개 데이터로 실행하는 AI 데모' : 'Working AI demo · Public data'}</span></header>
      <div className="desk-task">
        <div className="desk-scopes" role="group" aria-label={kr ? '조회 범위' : 'Scope'}>{missions.map(m => <button key={m.id} aria-pressed={mission === m.id} disabled={busy} onClick={() => changeMission(m.id)}>{m.name[l]}</button>)}</div>
        <div className="desk-request"><p>{selected.prompt[l]}</p><button className="desk-run" onClick={run} disabled={busy}>{busy ? (kr ? '실행 중' : 'Running') : result ? (kr ? '브리핑 다시 확인' : 'Check briefing again') : (kr ? '에이전트 실행' : 'Run agent')}<Arrow /></button></div>
      </div>
      <div className="desk-status" role="status" aria-live="polite"><span className={busy ? 'status-dot running' : 'status-dot'} aria-hidden="true" /><strong>{phases[phase][l]}</strong><span>{result ? `${result.cached ? (kr ? '최근 결과 · ' : 'Recent result · ') : ''}${formatTime(result.generatedAt, kr)} KST` : kr ? '정보 선택 → API 조회 → 근거 대조 → 브리핑' : 'Choose sources → Query APIs → Compare → Brief'}</span></div>
      <div className="desk-workspace">
        <div className="desk-brief" aria-busy={busy}>
          {result ? <>
            <h5>{result.brief.title}</h5><p className="brief-summary">{result.brief.summary}</p>
            <ol className="brief-findings">{result.brief.findings.map((f, i) => <li key={i}><h6>{f.title}</h6><p>{f.detail}</p><p className="brief-action"><strong>{kr ? '다음 확인' : 'Follow up'}</strong> {f.action}</p><button className="brief-citation" onClick={() => showEvidence(f)} aria-pressed={filter?.records === f.records}>{kr ? '근거 보기' : 'Show evidence'} <span>{f.sources.map(id => providers.find(p => p.id === id)?.name).join(' · ')}</span><Arrow /></button></li>)}</ol>
            {result.brief.unknowns.length > 0 && <div className="brief-unknown"><h6>{kr ? '아직 확인되지 않은 것' : 'What remains unverified'}</h6><ul>{result.brief.unknowns.map(v => <li key={v}>{v}</li>)}</ul></div>}
          </> : <div className="brief-awaiting"><svg viewBox="0 0 180 62" width="180" height="62" fill="none" aria-hidden="true"><path d="M12 10h42l34 21h70M12 31h146M12 52h42l34-21" stroke="currentColor" strokeWidth="1.2"/><circle cx="12" cy="10" r="4" fill="currentColor"/><circle cx="12" cy="31" r="4" fill="currentColor"/><circle cx="12" cy="52" r="4" fill="currentColor"/><rect x="146" y="19" width="24" height="24" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5"/></svg><h5>{busy ? (kr ? '공개 정보를 확인하고 있습니다.' : 'Checking the public sources.') : (kr ? '어떤 정보를 봐야 할지부터.' : 'Start with what to look at.')}</h5><p>{busy ? (kr ? '조회한 데이터가 도착하면 출처 목록에 표시됩니다. 브리핑에는 확인된 근거와 추가로 살펴볼 일을 나눠 담습니다.' : 'Source results appear as they arrive. The briefing separates observations from suggested follow-up.') : (kr ? '범위를 고르고 실행하면 AI가 필요한 소스를 선택합니다. 기상 특보, 자연재해, 지진 관측을 대조해 읽기 쉬운 브리핑으로 만듭니다.' : 'Choose a scope and run the agent. It selects relevant sources and turns weather alerts, natural events, and earthquake observations into a readable briefing.')}</p></div>}
          {error && <div className="desk-error" role="alert"><p>{error[l]}</p><button onClick={run}>{kr ? '다시 실행' : 'Retry'}</button></div>}
        </div>
        <aside className="desk-sources" aria-label={kr ? '연결된 정보원' : 'Connected sources'}><h5>{kr ? '연결된 정보원' : 'Connected sources'}</h5>
          {providers.map(p => {
            const source = displaySources.find(s => s.id === p.id); const state = tools[p.id];
            let status = kr ? '조회 대기' : 'Not queried';
            if (feedState === 'loading' && !source) status = kr ? '불러오는 중' : 'Loading';
            if (source?.status === 'ok') status = kr ? `${source.count}건 중 ${source.records.length}건 수집` : `${source.records.length} of ${source.count} records retrieved`;
            if (source?.status === 'not_applicable' || (mission === 'panama' && p.id === 'weather')) status = kr ? '해당 지역 미지원' : 'Outside coverage';
            if (source?.status === 'unavailable' || (feedState === 'error' && !source)) status = kr ? '조회 실패' : 'Unavailable';
            if (state === 'running') status = kr ? '에이전트가 조회 중' : 'Agent is querying';
            return <div className="source-row" key={p.id}><div><strong>{p.name}</strong><a href={p.url} target="_blank" rel="noreferrer">{kr ? 'API 안내' : 'API docs'}<Arrow /></a></div><p>{p.coverage[l]}</p><span className={source?.status === 'ok' ? 'source-ok' : ''}>{status}</span>{source?.fetchedAt && <time dateTime={source.fetchedAt}>{kr ? '수집 ' : 'Retrieved '}{formatTime(source.fetchedAt, kr)} KST</time>}</div>;
          })}
          <p className="desk-scope-note">{mission === 'world' ? (kr ? '기상 특보는 미국, 재해·지진은 전 세계를 조회합니다.' : 'Weather alerts cover the US; natural events and earthquakes cover the world.') : mission === 'panama' ? (kr ? '파나마 운하 기준 반경 1,000km의 관측을 조회합니다. NOAA 기상 특보는 이 지역을 지원하지 않습니다.' : 'Observations within 1,000 km of the Panama Canal. NOAA alerts do not cover this area.') : (kr ? '재해·지진은 Newark 반경 750km, 기상 특보는 Newark 지점 기준입니다.' : 'Events and earthquakes within 750 km of Newark; weather alerts at the Newark point.')}</p>
          {feedState === 'error' && !busy && <button className="desk-retry-feeds" onClick={() => { setFeedState('loading'); setReload(v => v + 1); }}>{kr ? '정보원 다시 조회' : 'Retry sources'}</button>}
        </aside>
      </div>
      <div className="desk-evidence" id="signal-evidence">
        <div className="evidence-ledger-head"><h5 ref={ledger} tabIndex={-1}>{filter ? (kr ? '브리핑의 근거' : 'Briefing evidence') : (kr ? '수집한 원문' : 'Source observations')}</h5>{filter ? <button onClick={() => { setFilter(null); setExpanded(true); }}>{kr ? '전체 보기' : 'Show all'}</button> : <span>{kr ? '원문 제목 · 관측 시각' : 'Original title · Observation time'}</span>}</div>
        {visibleRecords.length ? <ul>{visibleRecords.map(r => <li key={r.id}><span>{providers.find(p => p.id === r.source)?.name}</span><a href={r.url || providers.find(p => p.id === r.source).url} target="_blank" rel="noreferrer">{r.title}<Arrow /></a><time dateTime={r.occurredAt}>{formatTime(r.occurredAt, kr)} KST</time></li>)}</ul> : <p className="ledger-empty">{feedState === 'loading' ? (kr ? '공개 API에서 정보를 불러오고 있습니다.' : 'Loading observations from public APIs.') : sources.some(s => s.status === 'ok') ? (kr ? '조회 범위에서 표시할 관측이 없습니다. 이것이 위험이 없다는 뜻은 아닙니다.' : 'No observations to display in this scope. This does not establish the absence of risk.') : (kr ? '현재 원문을 가져오지 못했습니다. 정보원을 다시 조회해 주세요.' : 'Source records are unavailable. Retry the sources.')}</p>}
        {!filter && records.length > previewRecords.length && <button className="desk-retry-feeds" onClick={() => setExpanded(v => !v)}>{expanded ? (kr ? '미리보기로 접기' : 'Collapse to preview') : (kr ? `수집한 원문 ${records.length}건 모두 보기` : `Show all ${records.length} retrieved records`)}</button>}
      </div>
      <footer className="desk-footnote"><p>{kr ? '고객 시스템과 별개인 공개 데이터 데모입니다. 관측 사실이 운송 지연을 뜻하지는 않습니다. 항만 운영·선박 위치·고객 일정은 연결하지 않았습니다.' : 'A public-data demo, separate from client systems. An observation does not establish a shipping delay. Port operations, vessel positions, and client schedules are not connected.'}</p><span>{kr ? '최대 10분 캐시 · NASA 목록 최대 100건 · 원문 영어' : 'Up to 10-minute cache · NASA catalog capped at 100 · English source text'}</span></footer>
    </div>
    <a className="text-link intelligence-case-link" href="/case-study/fsk">{kr ? '운송 관제와 출고 계획의 실제 설계 과정' : 'The shipment monitoring and planning case study'}<Arrow /></a>
  </section>;
}
export default function IntelligenceHub() { const { lang } = useLang(); return <Desk key={lang} kr={lang === 'kr'} />; }
