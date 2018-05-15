<template>
  <e-charts class="chart" :options="$activeOptions" :autoResize="true"></e-charts>
</template>

<script>
  import ChartMixin from '@/mixins/ChartMixin'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'

  import { isEmpty } from 'lodash'

  export default {
    name: 'pie-chart',
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
          textStyle: {
            fontSize: 12
          },
          legend: {
            show: false
          },
          series: [{
            name: '',
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: []
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
        return (isEmpty(this.$filteredChartData)) ? {}
          : {
            series: [{
              data: this.$filteredChartData.map(item => {
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
            id: item[this.id],
            name: this.$filterLabel(item[this.id]),
            value: item.count,
            color: this.activeColors[index]
          }
        })
      },

      getDataLength () {
        return this.chartData.length
      }

    }
  }
</script>

<style>
  .chart {
    width: 100%!important; height: 100%!important;
  }
</style>
