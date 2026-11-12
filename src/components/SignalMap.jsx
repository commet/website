import { useState } from 'react';
import { geoCircle, geoEqualEarth, geoGraticule10, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import atlas from '../data/land-110m.json';
import './SignalMap.css';

const land = feature(atlas, atlas.objects.land);
const regions = { panama: { center: [-79.7, 9.1], radius: 1000, name: 'Panama', ko: '파나마' }, newark: { center: [-74.15, 40.684], radius: 750, name: 'Newark', ko: 'Newark' } };
const width = 800, height = 280;
function date(value, kr) { return new Intl.DateTimeFormat(kr ? 'ko-KR' : 'en-US', { month:'short', day:'numeric', timeZone:'Asia/Seoul' }).format(new Date(value)); }

export default function SignalMap({ mission, sources, loading, error = false, kr }) {
  const [picked, setPicked] = useState(null);
  const observations = sources.flatMap(s => s.status === 'ok' ? s.records : []).filter(r => Array.isArray(r.coords) && r.coords.length >= 2 && r.coords.every(Number.isFinite)).sort((a,b) => (b.magnitude || 0) - (a.magnitude || 0));
  const selected = observations.find(r => r.id === picked) || observations[0];
  const region = regions[mission];
  const scope = region ? geoCircle().center(region.center).radius(region.radius / 6371 * 180 / Math.PI)() : null;
  const projection = region ? geoMercator().fitExtent([[280,25],[520,255]], scope) : geoEqualEarth().rotate([-150,0]).fitExtent([[15,12],[785,268]], { type:'Sphere' });
  projection.clipExtent([[0,0],[width,height]]);
  const path = geoPath(projection);
  const position = region ? projection(region.center) : null;
  const selectedIndex = selected ? observations.indexOf(selected) : 0;
  const failed = error || (sources.length > 0 && !sources.some(s => ['disasters','earthquakes'].includes(s.id) && s.status === 'ok'));  // 받지 못한 것을 관측 없음으로 보이지 않는다
  return <div className="signal-map">
    <div className="signal-map-canvas">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={kr ? `${region?.ko || '전 세계'} 주변의 재해와 지진 관측 위치` : `Natural event and earthquake observations around ${region?.name || 'the world'}`}>
        <path className="signal-map-grid" d={path(geoGraticule10())} />
        <path className="signal-map-land" d={path(land)} />
        {scope && <path className="signal-map-scope" d={path(scope)} />}
        {position && <g transform={`translate(${position})`} className="signal-map-center"><path d="M-6 0H6M0-6V6"/><text x="10" y="-10">{region.name}</text></g>}
        {observations.map(r => { const p = projection(r.coords); if (!p || p[0] < 0 || p[0] > width || p[1] < 0 || p[1] > height) return null;
          return <g key={r.id} transform={`translate(${p})`} className={`map-observation ${r.source} ${selected?.id === r.id ? 'selected' : ''}`}>
            {selected?.id === r.id && <circle className="observation-ring" r="13" />}
            {r.source === 'earthquakes' ? <circle r="5" /> : <path d="M0-6 6 0 0 6-6 0Z"/>}
          </g>;
        })}
      </svg>
      <div className="map-points" aria-label={kr ? '관측 선택' : 'Select an observation'}>{observations.map(r => { const p = projection(r.coords); if (!p || p[0] < 0 || p[0] > width || p[1] < 0 || p[1] > height) return null;
        return <button key={r.id} style={{left:`${p[0]/width*100}%`,top:`${p[1]/height*100}%`}} onClick={() => setPicked(r.id)} aria-label={r.title} aria-pressed={selected?.id === r.id} title={r.title} />;
      })}</div>
      <div className="map-legend"><span><i className="legend-quake"/>{kr ? '지진' : 'Earthquakes'}</span><span><i className="legend-event"/>{kr ? '자연재해' : 'Natural events'}</span>{region && <span className="map-radius">{kr ? '조회 반경 ' : 'Scope '}{region.radius.toLocaleString()}{kr ? 'km' : ' km'}</span>}</div>
      <a className="map-attribution" href="https://www.naturalearthdata.com/" target="_blank" rel="noreferrer">Natural Earth</a>
    </div>
    <div className="signal-map-reading" aria-live="polite">
      {selected ? <>
        <div className="map-reading-head"><span>{selected.source === 'earthquakes' ? 'USGS' : 'NASA EONET'} | {date(selected.occurredAt,kr)} KST</span><span>{selectedIndex + 1} / {observations.length}</span></div>
        <strong className="map-reading-value">{Number.isFinite(selected.magnitude) ? `M ${selected.magnitude.toFixed(1)}` : (kr ? '자연재해 관측' : 'Natural event')}</strong>
        <p>{selected.title}</p>
        <div className="map-reading-actions"><a href={selected.url} target="_blank" rel="noreferrer">{kr ? '관측 원문' : 'Source record'}<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></a><div>{[-1,1].map(delta => <button key={delta} onClick={() => setPicked(observations[(selectedIndex + delta + observations.length) % observations.length].id)} disabled={observations.length < 2} aria-label={delta < 0 ? (kr ? '이전 관측' : 'Previous observation') : (kr ? '다음 관측' : 'Next observation')}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={delta < 0 ? 'M16 5 9 12l7 7' : 'm8 5 7 7-7 7'} /></svg></button>)}</div></div>
      </> : <><strong className="map-empty-title">{loading ? (kr ? '관측을 불러오는 중' : 'Loading observations') : failed ? (kr ? '위치 정보를 가져오지 못했습니다' : 'Location data unavailable') : (kr ? '이 범위에 표시할 관측이 없습니다' : 'No mapped observations in this area')}</strong><p>{loading ? (kr ? 'NASA와 USGS의 위치 정보를 확인합니다.' : 'Checking location data from NASA and USGS.') : (kr ? '브리핑에서 다른 정보원과 조회 범위를 함께 확인하십시오.' : 'Check the briefing for other sources and coverage.')}</p></>}
      <span className="map-sample-note">{kr ? '위치가 제공된 재해와 지진 표본 | 기상 특보는 브리핑에서 확인' : 'Geolocated event samples · Weather alerts appear in the brief'}</span>
    </div>
  </div>;
}
