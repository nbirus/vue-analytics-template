<template>
  <div class="page">

    <!--header-->
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
            :inputValue="searchString"
            @submit="keywordSubmit"
            @changed="keywordSubmit"
          >
          </search-input>
        </div>

      </div>

    </app-page-header>

    <!--tabs-->
    <tabs theme="cyan" pageHeader>

      <div slot="extra-options">
        <div class="extra-options">
          <a class="option" @click="advancedActive = true">Advanced Search</a>
        </div>
      </div>

      <tab name="Grid">
        <div class="page-body">
          <local-grid
            class="grid"

            id="search-grid"

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

    <!--advanced search-->
    <div class="advanced-search" v-if="advancedActive">

      <div class="form-container">

        <h2>Advanced Search</h2>

        <form-generator
          formLayout="horizontal"

          :schema="form"
          :initialValues="searchObject"

          @formSubmit="advancedSubmit"
          @formCancel="advancedActive = false"
        >
        </form-generator>

      </div>

      <div class="summary-container">

      </div>

    </div>

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
  import TestForm from '../../static/data/forms/sample-form.json'

  import SearchString from 'search-string'

  import ReportGenerator from '@/components/generators/ReportGenerator'
  import FormGenerator from '@/components/generators/FormGenerator'

  export default {
    name: 'search-page',
    components: {
      AppPageHeader,
      SearchInput,
      ElasticGrid,
      LocalGrid,
      ReportGenerator,
      FormGenerator
    },
    data () {
      return {
        data: TestData,
        columns: TestColumns,

        dashboard: TestDashboard,
        form: TestForm,

        searchString: '',
        searchObject: {},
        advancedActive: false
      }
    },
    methods: {
      advancedSubmit (queryObject) {

        let searchString = SearchString.parse('')

        Object.keys(queryObject).forEach((key) => {
          searchString.addEntry(key, queryObject[key], false)
        })

        this.searchObject = queryObject
        this.searchString = searchString.clone().toString()
        this.advancedActive = false
      },
      keywordSubmit (searchString) {
        this.searchString = searchString
      }
    }
  }

</script>

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

  .advanced-search {
    background-color: white;
    position: absolute;
    top: 50px; right: 0; bottom: 0; left: @nav-width;

    padding: @page-padding;

    display: flex;

    .form-container {
      flex: 0 0 55vw;
      max-width: 700px;
      padding: 0 3em 0 1em;

      h2 {
        margin-bottom: 1em;
      }
    }

    .summary-container {
      flex: 0 1 100%;

      border-left: solid thin @grey2;
    }
  }

  .search-actions {
    display: flex;
    align-items: center;

    .search-input {
      flex: 0 0 55vw;
      min-width: 700px;
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

  .page-body {
    /*overflow: hidden;*/

    & > .grid {
      height: 80vh;
    }
  }

</style>
