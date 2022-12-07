import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts';

export default function CustomBarChart({ data }) {
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
        number: data[key],
      });
    }
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={mapData}
        style={{ position: 'absolute', left: '-10px' }}
        margin={{ top: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day[0]" tickCount={10} />
        <YAxis />
        <Tooltip
          contentStyle={{
            background: 'linear-gradient(180deg, #3E3D45 0%, #202020 100%)',
            color: '#ffffff',
          }}
        />
        <Bar dataKey="number" fill="#ffffff" barSize={12} />
      </BarChart>
    </ResponsiveContainer>
  );
}
