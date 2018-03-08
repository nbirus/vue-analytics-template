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
            type: 'category'
          },
          yAxis: {
            type: 'value'
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
