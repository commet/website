export const missions = [
  { id: 'world', name: ['전 세계 이슈', 'Global signals'], prompt: ['지금 확인할 기상·재해 이슈를 정리해줘.', 'Brief me on weather and natural events worth checking.'] },
  { id: 'panama', name: ['파나마 주변', 'Around Panama'], prompt: ['파나마 주변에서 확인할 일이 있을까?', 'What should I check around Panama?'] },
  { id: 'newark', name: ['미국 도착지', 'Newark arrival'], prompt: ['Newark 도착지 주변 상황을 확인해줘.', 'Check conditions around the Newark arrival area.'] },
];
export const providers = [
  { id: 'weather', name: 'NOAA / NWS', label: ['기상 특보', 'Weather alerts'], coverage: ['미국 기상 특보', 'US weather alerts'], url: 'https://www.weather.gov/documentation/services-web-api' },
  { id: 'disasters', name: 'NASA EONET', label: ['자연재해', 'Natural events'], coverage: ['최근 30일 자연재해 목록', 'Natural events in the last 30 days'], url: 'https://eonet.gsfc.nasa.gov/docs/v3' },
  { id: 'earthquakes', name: 'USGS', label: ['지진 관측', 'Earthquakes'], coverage: ['최근 7일 · 규모 4.5 이상', 'Last 7 days · magnitude 4.5+'], url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php' },
];
