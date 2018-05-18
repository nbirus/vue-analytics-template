<template>
  <e-charts class="chart" :options="$activeOptions" :autoResize="true" @click="handleClick"></e-charts>
</template>

<script>
  import ChartMixin from '../../../mixins/ChartMixin'
  import DataMixin from '../../../mixins/DataMixin'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/dataZoom'

  import { isEmpty } from 'lodash'

  export default {
    name: 'stacked-vertical-bar-chart',
    mixins: [ChartMixin, DataMixin],
    props: {
      subLabelFilters: {
        type: Array,
        default: () => []
      }
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
            type: 'log',
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
            right: '25px',
            bottom: '0',
            containLabel: true
          },
          series: []
        },
        expandedChartOptions: {},
        series: []
      }
    },
    computed: {

      dataModifiers () {
        return (isEmpty(this.$filteredChartData)) ? {}
          : {
            yAxis: {
              axisLabel: {
                formatter: (label) => {
                  return this.$filterLabel(label)
                }
              },
              data: this.$filteredChartData.map(item => {
                return {
                  value: item.id
                }
              })
            },
            series: this.series.map(item => {

              return {
                type: 'bar',
                id: item.id,
                name: this.$filterLabel(item.name, this.subLabelFilters),
                barGap: 0,
                itemStyle: { normal: { color: item.color } },
                data: item.data
              }

            })
          }
      }

    },
    methods: {

      // format data specific for this chart
      handleDataReturn (chartData) {

        let headerData = []
        let series = []

        // set up y axis
        chartData[this.id]
          .forEach(item => {

            headerData.push({
              id: item,
              name: this.$filterLabel(item)
            })

          })

        // set up series
        chartData.data
          .forEach((item, index) => {

            series.push({
              id: item.type,
              name: item.type,
              data: item.counts,
              color: this.activeColors[index]
            })

          })

        this.series = series
        return headerData

      },

      getDataLength () {
        return this.chartData.data.length
      },

      handleClick (e) {
        this.$emitClick({
          [e.seriesId]: e.name
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
