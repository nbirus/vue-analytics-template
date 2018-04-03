<template>
  <e-charts class="chart" :options="activeOptions" :autoResize="true"></e-charts>
</template>

<script>
  import ChartMixin from '../../../mixins/ChartMixin'
  import DataMixin from '../../../mixins/DataMixin'
  import 'echarts/lib/chart/bar'

  import { isEmpty } from 'lodash'

  export default {
    name: 'vertical-bar-chart',
    mixins: [ChartMixin, DataMixin],
    data () {
      return {
        defaultChartOptions: {
          xAxis: {
            type: 'category',
            axisLabel: {
              textStyle: {
                  color: this.axisTextColor
              }
            },
            axisLine: { show: false },
            axisTick: { show: false }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                  color: this.axisTextColor
              }
            },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
              lineStyle: {
                color: ['#e7e7e7']
              }
            }
          },
          grid: {
            top: '5px',
            left: '0',
            right: '5px',
            bottom: '0',
            containLabel: true
          },
          series: [{
            type: 'bar'
          }]
        },
        expandedChartOptions: {}
      }
    },
    computed: {

      // fill the data elements of the chart options object
      dataModifiers () {
        return (isEmpty(this.filteredChartData)) ? {}
          : {
            xAxis: {
              data: this.filteredChartData.map(item => item.name)
            },
            series: [{
              data: this.filteredChartData.map(item => {
                return {
                  ...item,
                  itemStyle: { normal: { color: item.color } } // merge color object
                }
              })
            }]
          }
      }

    },
    methods: {

      // format data specific for this chart
      handleDataReturn (data) {
        return data.map((item, index) => {
          return {
            name: item[this.id],
            value: item.count,
            color: this.colors[index]
          }
        })
      }

    }
  }
</script>

<style>
  .chart {
    width: 100%!important; height: 100%!important;
  }
</style>
