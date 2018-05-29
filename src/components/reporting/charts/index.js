// LEVEL 1
import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'
import HorizontalBarChart from './HorizontalBarChart'
import LineChart from './LineChart'

// [
//   {count: 0, id: ''}
// ]

// LEVEL 2
import StackedVerticalBarChart from './StackedVerticalBarChart'
import StackedHorizontalBarChart from './StackedHorizontalBarChart'

// {
//   id: [],
//   data: [
//     {
//       type: '',
//       counts: []
//     }
//   ]
// }


// OTHER
import SunburstChart from './SunburstChart'
// {
//   name: ''
//   value: 0
//   children: []
// }


export default {
  PieChart,
  LineChart,
  VerticalBarChart,
  HorizontalBarChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  SunburstChart
}
