<template>
  <e-charts class="chart" :options="$activeOptions" :autoResize="true" @click="handleClick"></e-charts>
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
    props: {

    },
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

        let valid = true
        // let chartData = cloneDeep(this.chartData)

        // check data length
        valid = this.getDataLength() !== 0

        // check data is in correct format


        return valid

      },

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
