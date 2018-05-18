<template>
  <div class="page">

    <app-page-header
      pageTitle="Search Page"
    >
    </app-page-header>

    <div class="page-body">

      <chart-report
        style='height: 300px; width: 400px; margin-right: 10px; display: inline-block'
        id='phase'
        chartTitle='Test Verit Chart'
        chartType='vertical-bar'
        :chartData='chartData'
        :labelFilters="['upperCase', 'replaceUnderscores']"
      >
      </chart-report>

      <chart-report
        style='height: 300px; width: 400px; margin-right: 10px; display: inline-block'
        id='phase'
        chartTitle='Test Line Chart'
        chartType='pie'
        :chartData='chartData'
        :labelFilters="['upperCase', 'replaceUnderscores']"
      >
      </chart-report>

      <chart-report
        style='height: 300px; width: 400px; margin-right: 10px; display: inline-block'
        id='phase'
        chartTitle='Test Pie Chart'
        chartType='horizontal-bar'
        :chartData='chartData'
        :labelFilters="['upperCase', 'replaceUnderscores']"
      >
      </chart-report>

      <chart-report
        style='height: 400px; width: 600px; margin-top: 10px; display: inline-block'
        id='dates'
        chartTitle='Test stacked Chart'
        chartType='stacked-vertical-bar'
        :chartData='chartData2'
        :showTotal="false"

        :labelFilters="['date']"
        :subLabelFilters="['titleCase']"
      >
      </chart-report>

      <chart-report
        style='height: 400px; width: 600px; margin-top: 10px; display: inline-block'
        id='dates'
        chartTitle='Test stacked Chart'
        chartType='stacked-horizontal-bar'
        :chartData='chartData2'
        :showTotal="false"

        :labelFilters="['date']"
        :subLabelFilters="['titleCase']"
      >
      </chart-report>


    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/core/AppPageHeader'
  import ChartReport from '@/components/reporting/ChartReport'

  export default {
    name: 'search-page',
    components: {
      ChartReport,
      AppPageHeader
    },
    data () {
      return {
        test: ['test', 'test2', 'test3'],
        chartData: [
          {'count': 1755, 'phase': 'ii'},
          {'count': 1294, 'phase': 'i'},
          {'count': 1138, 'phase': 'na'},
          {'count': 663, 'phase': 'i_ii'},
          {'count': 397, 'phase': 'iii'},
          {'count': 47, 'phase': 'ii_iii'}
        ],
        chartData2: {
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

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

</style>
