<template>
  <div class="page">

    <app-page-header
      title="Search"
      subTitle="This is a search page to search stuff"
      theme="cyan"
      hasTabs
    >
      <div slot="page-actions">

        <div class="search-actions">
          <search-input
            class="search-input"
            @submit="searchSubmit"
          >
          </search-input>

          <a class="advanced-search">Advanced Search</a>
        </div>

      </div>

    </app-page-header>

    <tabs theme="cyan" pageHeader>

      <tab name="Grid">
        <div class="page-body">
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

      </tab>

      <tab name="Analytics">
        <div class="page-body">

          <report-generator
            :reports="dashboard"
          >
          </report-generator>

        </div>
      </tab>


    </tabs>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/partials/AppPageHeader'

  import SearchInput from '@/components/inputs/SearchInput'
  import ElasticGrid from '@/components/reporting/grid/ElasticGrid'
  import LocalGrid from '@/components/reporting/grid/LocalGrid'

  import TestData from '../../static/data/grid-headers/test-data2.json'
  import TestColumns from '../../static/data/grid-headers/test-headers2.json'
  import TestDashboard from '../../static/data/dashboards/test-dashboard.json'

  import ReportGenerator from '@/components/generators/ReportGenerator'

  export default {
    name: 'search-page',
    components: {
      AppPageHeader,
      SearchInput,
      ElasticGrid,
      LocalGrid,
      ReportGenerator
    },
    data () {
      return {
        data: TestData,
        columns: TestColumns,
        dashboard: TestDashboard
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

  .search-actions {
    display: flex;
    align-items: center;

    .search-input {
      flex: 0 0 50vw;
    }

    .advanced-search {
      flex: 0 0 auto;
      margin-left: 1rem;
      font-size: 1.1rem;

      color: cornflowerblue;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .page-section {
    padding: 1rem 0;
  }

</style>
