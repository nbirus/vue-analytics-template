<template>
  <e-charts class="chart" :options="polar"></e-charts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'

  // import ECharts modules manually to reduce bundle size
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'

  export default {
    name: 'test-chart',
    components: { ECharts },
    data () {

      var dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放']
      var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220]
      var yMax = 500
      var dataShadow = []

      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax)
      }

      return {
        polar: {
          title: {
            text: '特性示例：渐变色 阴影 点击缩放',
            subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
          },
          xAxis: {
            data: dataAxis,
            axisLabel: {
              inside: false,
              textStyle: {
                color: '#000'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            z: 10
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            {
              type: 'bar',
              data: data
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .chart {
    width: 100%!important; height: 100%!important;
  }
</style>
