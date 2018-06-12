<template>
  <e-charts class="chart" :options="$activeOptions" :autoResize="true"></e-charts>
</template>

<script>
  import ChartMixin from '@/mixins/ChartMixin'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'

  import { isEmpty } from 'lodash'

  export default {
    name: 'line-chart',
    mixins: [ChartMixin],
    data () {
      return {
        defaultChartOptions: {
          tooltip: {
            trigger: 'item',
            extraCssText: 'box-shadow: 0 1px 3px rgba(0, 0, 0, .4)',
            backgroundColor: 'white',
            confine: true,
            textStyle: {
              color: 'black',
              fontSize: 13
            }
          },
          grid: {
            top: '5px',
            left: '0',
            right: '5px',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: [],
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
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: this.axisTextColor
              }
            },
            axisLine: { show: false },
            axisTick: { show: false }
          },
          series: [{
            data: [],
            type: 'line'
          }]
        },
        expandedChartOptions: {
          legend: {
            show: true,
            orient: 'vertical',
            x: 'left'
          }
        }
      }
    },
    computed: {

      // fill the data elements of the chart options object
      dataModifiers () {
        return (isEmpty(this.filteredChartData)) ? {}
          : {
            xAxis: {
              data: this.filteredChartData.map(item => {
                return item.name
              })
            },
            series: [
              {
                data: this.filteredChartData.map(item => {
                  return item.value
                })
              }
            ]
          }
      },

      // filter out suppressed headers and null fields
      filteredChartData () {
        return this.formattedChartData.filter(item =>
          item &&
          item.id &&
          !this.suppressedHeaders.includes(item.id))
      }

    },
    methods: {

      verifyChartData () {
        return true
      },

      // format data specific for this chart
      handleDataReturn (data) {
        return data.map((item) => {
          return {
            id: item[this.id],
            name: this.$filterLabel(item[this.id]),
            value: item.count
          }
        })
      },

      getDataLength () {
        return this.chartData.length
      },

      handleClick (e) {
        this.$emitClick({
          [this.id]: e.data.id
        })
      }

    }
  }
</script>

<style scoped>
  .chart {
    width: 100%!important; height: 100%!important;
  }
</style>
