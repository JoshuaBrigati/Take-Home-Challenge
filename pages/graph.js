/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react/cjs/react.development';
import InteractiveGraph from '../components/InteractiveGraph';

import {
  getAppCookies,
  verifyToken,
  absoluteUrl,
} from '../middleware/utils';

const Graph = ({ profile, chart }) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [graphDataSelection, setGraphDataSelection] = useState('apy');
  const [fullGraph, setFullChart] = useState({});

  useEffect(() => {
    setChartSeries(chart.series);
    setFullChart(chart);
  }, [chart])

  return (
    <div className='interactive-graph-container'>
      <section className='graph-details'>
        <h1 className='graph-title'>{fullGraph.chain} - {fullGraph.name}</h1>
        <h6>{fullGraph.protocol}</h6>
        <div className='apys'>
          <h5>Current APY: {fullGraph.apy}</h5>
          <h5>Base APY: {fullGraph.base}</h5>
        </div>
      </section>
      <div className='graph-options'>
        <button
          className={`graph-option-button left-button ${graphDataSelection === 'apy' ? 'selected' : ''}`}
          onClick={() => setGraphDataSelection('apy')}
        >
          APY
        </button>
        <button
          className={`graph-option-button right-button ${graphDataSelection === 'tvl' ? 'selected' : ''}`}
          onClick={() => setGraphDataSelection('tvl')}
        >
          TVL
        </button>
      </div>
      <InteractiveGraph
        chartSeries={chartSeries}
        graphDataSelection={graphDataSelection}
      />
    </div>
  )
}

export default Graph;

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api`;
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  if (!profile) {
    context.res.writeHead(307, { Location: '/' });
    context.res.end();
  }

  const res = await fetch(`${baseApiUrl}/chart`)
  const chart = await res.json()

  return {
    props: {
      chart,
      profile,
    },
  };
}