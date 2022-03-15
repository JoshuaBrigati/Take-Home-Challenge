
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{moment(label).format('MMM DD YYYY')}</p>
        <p className='intro'>{payload[0].value}</p>
      </div>
    );
  }

  return null;
};

const InteractiveGraph = ({chartSeries, graphDataSelection}) => {
  return (
    <ResponsiveContainer width={'100%'} height={300}>
      <LineChart
        height={400}
        data={chartSeries}
        margin={
          graphDataSelection === 'tvl' ? {
            top: 0, right: 50, bottom: 0, left: 50
          } : {
            top: 0, right: 50, bottom: 0, left: 0
          }
        }
      >
        <XAxis
          dataKey='date'
          tickFormatter={(data) => moment(data).format('MMM DD')}
          minTickGap={10}
          axisLine={false}
          padding={{ left: 10 }}
        />
        <YAxis/>
        <Tooltip  content={<CustomTooltip />}/>
        <Legend />
        <Line
          type='monotone'
          dataKey={graphDataSelection}
          stroke='#8884d8'
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default InteractiveGraph;