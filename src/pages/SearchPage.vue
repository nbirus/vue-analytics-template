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
      <grid style="height: 80vh; padding-bottom: 10px;"
        id="test-grid"

        :data="data"
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
  import AppPageHeader from '@/components/core/AppPageHeader'
  import ChartReport from '@/components/reporting/ChartReport'

  import SearchInput from '@/components/inputs/SearchInput'
  import Grid from '@/components/reporting/grid/Grid'

  import TestData from '../../static/data/grid-headers/test-data2.json'
  import TestColumns from '../../static/data/grid-headers/test-headers2.json'

  export default {
    name: 'search-page',
    components: {
      ChartReport,
      AppPageHeader,
      SearchInput,
      Grid
    },
    data () {
      return {
        data: TestData,
        columns: TestColumns
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
