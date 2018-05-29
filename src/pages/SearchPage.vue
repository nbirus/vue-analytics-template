<template>
  <div class="page">

    <app-page-header
      title="Search"
      subTitle="This is a search page to search stuff"
      theme="cyan"
    >
      <div slot="page-actions">
        <search-input
          @submit="searchSubmit"
        >
        </search-input>
      </div>
    </app-page-header>

    <div class="page-body">

      <chart-report
        style='height: 300px; width: 400px; margin-right: 10px; display: inline-block'
        id='phase'
        chartTitle='Test Line Chart'
        chartType='pie'
        :chartData='chartData'
        :labelFilters="['upperCase', 'replaceUnderscores']"
      >
      </chart-report>

      <local-grid
        style="height: 80vh;"
        id="test-grid-1"

        :rows="data"
        :columns="columns"

        :canSort="true"
        :canResizeColumns="true"
        :canMoveColumns="false"
        :paginate="true"
        :initialPageSize="20"
        :canSearch="false"
        :canToggleColumns="true"
        :canSelect="false"
        :canSelectMultiple="false"

        :showRowDetail="false"
      />

    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/partials/AppPageHeader'
  import ChartReport from '@/components/reporting/ChartReport'

  import SearchInput from '@/components/inputs/SearchInput'
  import ElasticGrid from '@/components/reporting/grid/ElasticGrid'
  import LocalGrid from '@/components/reporting/grid/LocalGrid'

  import TestData from '../../static/data/grid-headers/test-data2.json'
  import TestColumns from '../../static/data/grid-headers/test-headers2.json'

  export default {
    name: 'search-page',
    components: {
      ChartReport,
      AppPageHeader,
      SearchInput,
      ElasticGrid,
      LocalGrid
    },
    data () {
      return {
        data: TestData,
        columns: TestColumns,
        chartData: [
          {'count': 1755, 'phase': 'ii'},
          {'count': 1294, 'phase': 'i'},
          {'count': 1138, 'phase': 'na'},
          {'count': 663, 'phase': 'i_ii'},
          {'count': 397, 'phase': 'iii'},
          {'count': 47, 'phase': 'ii_iii'}
        ]
      }
    },
    methods: {
      searchSubmit (searchString) {
        console.log(searchString)
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

</style>
