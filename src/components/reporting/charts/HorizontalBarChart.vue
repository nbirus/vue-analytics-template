<template>
  <e-charts class="chart" :options="$activeOptions" :autoResize="true" @click="handleClick"></e-charts>
</template>

<script>
  import ChartMixin from '../../../mixins/ChartMixin'
  import DataMixin from '../../../mixins/DataMixin'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'

  import { isEmpty } from 'lodash'

  export default {
    name: 'horizontal-bar-chart',
    mixins: [ChartMixin, DataMixin],
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
          yAxis: {
            type: 'category',
            axisLabel: {
              textStyle: {
                  color: this.axisTextColor
              }
            },
            axisLine: { show: false },
            axisTick: { show: false }
          },
          xAxis: {
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
            right: '15px',
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
            yAxis: {
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

      // format data specific for this chart
      handleDataReturn (data) {
        return data.map((item, index) => {
          return {
            id: item[this.id],
            name: this.$filterLabel(item[this.id]),
            value: item.count,
            color: this.activeColors[index]
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
