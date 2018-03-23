<template>
  <e-charts class="chart" :options="activeOptions" :autoResize="true"></e-charts>
</template>

<script>
  import ChartMixin from '@/mixins/ChartMixin'
  import 'echarts/lib/chart/pie'

  import { merge, isEmpty } from 'lodash'

  export default {
    name: 'pie-chart',
    mixins: [ChartMixin],
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
