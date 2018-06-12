<template>
  <div class="page">

    <!--header-->
    <app-page-header
      title="Trial Search"
      subTitle="Search trials"
      theme="cyan"
      hasTabs
    >
      <div slot="page-actions">

        <div class="search-actions">
          <search-input
            class="search-input"
            :inputValue="searchString"

            @changed="keywordChanged"
            @submit="keywordSubmit"
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
          <!-- <elastic-grid
            class="grid"
            id="search-grid"

            :columns="columns"
            :apiConfig="apiConfig"

            :canSort="true"
            :canExport="false"
            :canResizeColumns="true"
            :canMoveColumns="false"
            :paginate="true"
            :initialPageSize="20"
            :canSearch="false"
            :canToggleColumns="true"
            :canSelect="false"
            :canSelectMultiple="false"
            :showRowDetail="false"
          /> -->
        </div>
      </tab>

      <tab name="Analytics">
        <div class="page-body">

          <!-- <report-generator
            :reports="dashboard"
            :initialParams="reportsParams"
          >
          </report-generator> -->

        </div>
      </tab>

      <tab name="Build Chart">
        <div class="page-body">

          <chart-builder></chart-builder>

          <!-- <chart-builder
            style='height: 900px; width: 1000px; margin-right: 10px; display: inline-block'
            id='label'
            chartTitle='Test Pie Chart'
            chartType='pie'
            :chartData='chartData'
            :labelFilters="['upperCase', 'replaceUnderscores']"
          >
          </chart-builder> -->

        </div>
      </tab>
    </tabs>

    <!--advanced search-->
    <div class="advanced-search" v-if="advancedActive">

      <div class="header">
        <h1>Advanced Search</h1>
      </div>

      <div class="body">

        <div class="form-group-container">

          <form-group-generator
            ref="advancedForm"
            :schemaGroups="form"
            :initialValues="formObject"

            @formSubmit="advancedSubmit"
            @formChanged="advancedChanged"
            @formCancel="advancedActive = false"
          >
          </form-group-generator>

        </div>

        <div class="summary-container well">

          <form-summary
            :schema="form"
            :model="visualObject"
          >
          </form-summary>

          <div class="footer">
            <btn>Cancel</btn>
            <btn theme="lime">Search</btn>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/partials/AppPageHeader'
  import SearchInput from '@/components/inputs/SearchInput'
  import ElasticGrid from '@/components/reporting/grid/ElasticGrid'
  import ChartBuilder from '@/components/reporting/ChartBuilder'

  import TrialHeaders from '../../static/data/grid-headers/trial-headers.json'
  import Dashboard from '../../static/data/dashboards/strap-dashboard.json'

  // import TestForm from '../../static/data/forms/sample-form.json'
  import TestForm from '../../static/data/forms/test-form-group.json'

  import SearchString from 'search-string'

  import ReportGenerator from '@/components/generators/ReportGenerator'
  // import FormGenerator from '@/components/generators/FormGenerator'
  import FormGroupGenerator from '@/components/generators/FormGroupGenerator'
  import FormSummary from '@/components/utils/FormSummary'
  import FormService from '@/services/FormService'

  import { cloneDeep } from 'lodash'

  export default {
    name: 'search-page',
    components: {
      AppPageHeader,
      SearchInput,
      ElasticGrid,
      ReportGenerator,
      // FormGenerator,
      FormGroupGenerator,
      FormSummary,
      ChartBuilder
    },
    data () {
      return {

        // grid columns
        columns: TrialHeaders,

        dashboard: Dashboard,
        form: TestForm,

        // form
        searchString: '',
        formObject: {},
        visualObject: {},
        apiObject: {},

        advancedActive: false
      }
    },
    computed: {
      apiConfig () {
        return {
          baseURL: 'http://localhost:3003/api/v2/',
          endpoint: 'trials',
          params: {
            ...this.apiObject
          }
        }
      },
      reportsParams () {

        let params = cloneDeep(this.apiConfig.params)

        const gridParams = [
          'include',
          'from',
          'to',
          'sort',
          'order'
        ]

        for (let key in params) {
          if (gridParams.includes(key)) {
            delete params[key]
          }
        }
        return params
      }
    },
    methods: {

      // advanced
      advancedChanged () {
        this.visualObject = this.$refs.advancedForm.getFormattedInputValues('visual')
      },
      advancedSubmit (queryObject) {

        // set form object for persistence
        this.formObject = cloneDeep(queryObject)

        // set form search string
        this.searchString = this.stringifySearch(
          this.$refs.advancedForm.getFormattedInputValues(FormService.apiFormFormatter)
        )

        // close advanced search
        this.advancedActive = false

        // run query
        this.keywordSubmit(this.searchString)

      },

      // keyword
      keywordSubmit (searchString) {
        this.apiObject = cloneDeep(this.paramifySearch(searchString))
      },
      keywordChanged (searchString) {
        this.searchString = searchString
      },

      // converting
      stringifySearch (queryObject) {

        let searchString = SearchString.parse('')

        Object.keys(queryObject).forEach((key) => {
          searchString.addEntry(key, queryObject[key], false)
        })

        return searchString.clone().toString()

      },
      paramifySearch (searchString) {

        let searchObject = SearchString.parse(searchString)
        let result = {}

        console.log(searchObject)

        // correctly formatted
        searchObject.conditionArray.forEach(item => {

          let value = item.value

          // TODO: improve this
          try {
            value = value.split(',')
          }
          catch (error) {
            console.log(error)
          }

          result[item.keyword] = value
        })

        // random text segments
        if (searchObject.textSegments.length) {

          // if keyword exists add space, otherwise initialize
          result['_keyword'] = result.hasOwnProperty('_keyword') ? `${result._keyword} ` : ''

          // build up keyword
          result._keyword += searchObject.textSegments.map(item => item.text).join(' ')

        }


        return result

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

    .header {
      margin-bottom: 2em;
    }

    .body {
      display: flex;
      align-items: flex-start;
      max-width: 1200px;

      .form-group-container {
        flex: 0 0 70%;
      }

      .summary-container {
        flex: 0 1 100%;
        max-width: 700px;
        background-color: @grey1;
        border: solid thin @grey3;
        padding: 1rem;

        .footer {
          display: flex;
          justify-content: flex-end;
          background-color: white;
          background-color: transparent;
          margin-top: 1rem;


          button {
            flex: 0 1 auto;
            margin-left: .5em;

            &:first-child {
              margin-left: 0;
            }
          }
        }
      }

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
    & > .grid {
      height: 90vh;
    }
  }

</style>
