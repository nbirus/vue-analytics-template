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
          <elastic-grid
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
          />
        </div>

      </tab>

      <tab name="Analytics">
        <div class="page-body">

          <report-generator
            :reports="dashboard"
            :initialParams="reportsParams"
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
          ref="advancedForm"
          :schema="form"
          :initialValues="formObject"

          @formSubmit="advancedSubmit"
          @formChanged="advancedChanged"
          @formCancel="advancedActive = false"
        >
        </form-generator>

      </div>

      <div class="summary-container">
        <form-summary
          :schema="form"
          :model="visualObject"
        >
        </form-summary>
      </div>

    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/partials/AppPageHeader'
  import SearchInput from '@/components/inputs/SearchInput'
  import ElasticGrid from '@/components/reporting/grid/ElasticGrid'

  import TrialHeaders from '../../static/data/grid-headers/trial-headers.json'
  import Dashboard from '../../static/data/dashboards/strap-dashboard.json'

  import TestForm from '../../static/data/forms/sample-form.json'

  import SearchString from 'search-string'

  import ReportGenerator from '@/components/generators/ReportGenerator'
  import FormGenerator from '@/components/generators/FormGenerator'
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
      FormGenerator,
      FormSummary
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

        delete params['include']
        delete params['from']
        delete params['to']
        delete params['sort']
        delete params['order']

        return params
      }
    },
    methods: {

      // advanced
      advancedChanged () {
        this.visualObject = this.$refs.advancedForm.getFormattedInputValues(FormService.visialFormFormatter)
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

        console.log(result)


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
      max-width: 700px;

      border-left: solid thin @grey2;
      padding: 0 3em;
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
      height: 90vh;
    }
  }

</style>
