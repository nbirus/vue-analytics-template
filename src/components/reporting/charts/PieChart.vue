<template>
  <e-charts class="chart" :options="activeOptions" :autoResize="true"></e-charts>
</template>

<script>
  import ChartMixin from '../../../mixins/ChartMixin'
  import DataMixin from '../../../mixins/DataMixin'
  import 'echarts/lib/chart/pie'

  import { merge, isEmpty } from 'lodash'

  export default {
    name: 'pie-chart',
    mixins: [ChartMixin, DataMixin],
    data () {
      return {
        defaultChartOptions: {
          textStyle: {
            fontSize: 12
          },
          legend: {
            show: false
          },
          label: {
            confine: true,
            normal: {
              formatter: (label) => {
                console.log(label)
                return label.data.name
              }
            }
          },
          series: [{
            name: '',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: []
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
              name: item[this.id],
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
