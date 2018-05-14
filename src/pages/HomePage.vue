<template>
  <div class='page'>

    <app-page-header
      pageTitle='Home Page'
    >
    </app-page-header>

    <div class='page-body'>
      <chart-report
        style='height: 300px; width: 400px'
        id='phase'
        title='Test Chart'
        chartType='pie'
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
        ]
      }
    }
  }
</script>

<style lang='less' scoped>

  @import (reference) '../styles/app-helper.less';

</style>
