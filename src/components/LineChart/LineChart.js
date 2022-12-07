import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts';

export default function CustomLineChart({ data }) {
  const WEEKDAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const mapData = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      mapData.push({
        day: WEEKDAY[+key - 1],
        tasks: data[key],
      });
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        style={{ position: 'absolute', left: '-10px' }}
        data={mapData}
        margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day[0]" />
        <YAxis />
        <Tooltip
          contentStyle={{
            background: 'linear-gradient(180deg, #3E3D45 0%, #202020 100%)',
            color: '#ffffff',
          }}
        />
        <Line
          type="monotone"
          dataKey="tasks"
          stroke="#ffffff"
          strokeWidth={3}
          dot={{ strokeWidth: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
