import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Jan', '2018': 4000, '2019': 2400, amt: 2400,
  },
  {
    name: 'Feb', '2018': 3000, '2019': 1398, amt: 2210,
  },
  {
    name: 'Mar', '2018': 2000, '2019': 9800, amt: 2290,
  },
  {
    name: 'Apr', '2018': 2780, '2019': 3908, amt: 2000,
  },
  {
    name: 'Maj', '2018': 1890, '2019': 4800, amt: 2181,
  },
  {
    name: 'Jun', '2018': 2390, '2019': 3800, amt: 2500,
  },
  {
    name: 'Jul', '2018': 3490, '2019': 4300, amt: 2100,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="2019" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="2018" stroke="#82ca9d" />
      </LineChart>
    );
  }
}
