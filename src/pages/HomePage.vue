<template>
  <div class='page'>

    <app-page-header
      pageTitle='Home Page'
    >
    </app-page-header>

    <div class='page-body'>

      <chart-report
        style='height: 400px; width: 700px; margin-bottom: 10px'
        id='dates'
        title='Test Stacked Bar Chart'
        chartType='stacked-vertical-bar'
        :chartData='chartData3'
        :labelFilters="['date']"
        :subLabelFilters="['titleCase']"
        :colors="['#3FAFD1', '#9A5CB4', '#68C472']"
        :showTotal="false"
        :abbreviateLabelsBy="3"
        :customModifiers="{
          dataZoom: [
            {
                show: true
            }
          ],
          grid: {
            bottom: '50px'
          }
        }"
      >
      </chart-report>

      <chart-report
        style='height: 300px; width: 400px'
        id='phase'
        title='Test Pie Chart'
        chartType='vertical-bar'
        :chartData='chartData'
        :labelFilters="['upperCase', 'replaceUnderscores']"
      >
      </chart-report>

    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/core/AppPageHeader'
  import ChartReport from '@/components/reporting/ChartReport'

  export default {
    name: 'home',
    components: {
      ChartReport,
      AppPageHeader
    },
    data () {
      return {
        chartData: [
          {'count': 1755, 'phase': 'ii'},
          {'count': 1294, 'phase': 'i'},
          {'count': 1138, 'phase': 'na'},
          {'count': 663, 'phase': 'i_ii'},
          {'count': 397, 'phase': 'iii'},
          {'count': 47, 'phase': 'ii_iii'}
        ],
        chartData3: {
          dates: ['2018-05-11T00:00:00.000Z', '2018-05-12T00:00:00.000Z', '2018-05-13T00:00:00.000Z'],
          data: [
            {
              type: 'person',
              counts: [15903, 167, 48]
            },
            {
              type: 'organization',
              counts: [5248, 139, 32]
            },
            {
              type: 'trial',
              counts: [17455, 239, 66]
            }
          ]
        }
      }
    }
  }
</script>

<style lang='less' scoped>

  @import (reference) '../styles/app-helper.less';

</style>
