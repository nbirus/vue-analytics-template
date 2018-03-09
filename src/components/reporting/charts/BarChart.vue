<template>
  <e-charts class="chart" :options="activeOptions" :autoResize="true"></e-charts>
</template>

<script>
  import ChartMixin from '../../../mixins/ChartMixin'
  import DataMixin from '../../../mixins/DataMixin'
  import 'echarts/lib/chart/bar'

  import { merge, isEmpty } from 'lodash'

  export default {
    name: 'bar-chart',
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
            top: '5px', left: '0', right: '5px', bottom: '0',
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

      // visible chart object
      activeOptions () {
        return merge({},
          this.defaultChartOptions,
          this.dataModifiers, // insert data
          this.customModifiers, // insert custom properties
          this.isExpanded ? this.expandedChartOptions : {} // if expanded
        )
      },

      // fill the data elements of the chart options object
      dataModifiers () {
        return (isEmpty(this.filteredChartData)) ? {}
          : {
            xAxis: {
              data: this.filteredChartData.map(item => item.label)
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
        return this.chartData.filter(item => item && item.label && !this.suppressedHeaders.includes(item.label))
      }

    },
    mounted () {
      this.buildChart()
    },
    methods: {

      async buildChart () {

        try {

          // get data
          let result = await this.$get(this.apiConfig)

          // get colors
          this.colors = this.$generateColors(result.analytics.length)

          // format data
          this.chartData = result.analytics.map((item, index) => {
            return {
              label: item[this.id],
              value: item.count,
              color: this.colors[index]
            }
          })

          this.$chartRendered()
        }
        catch (error) {
          this.$throwError(error)
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
