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

          <fullscreen ref="fullscreen" style="width: 500px; height: 400px;">
            <template slot-scope="{ _expand, _collapse, _isExpanded }">

              <chart-report
                style='height: 100%'
                id='phase'
                chartTitle='Test Line Chart'
                chartType='pie'
                :chartData='chartData'
                :labelFilters="['upperCase', 'replaceUnderscores']"
                :expandActive="_isExpanded"

                @expand="_expand"
                @collapse="_collapse"
              >
              </chart-report>

            </template>

          </fullscreen>

          <!--<chart-report-->
            <!--style='height: 900px; width: 1000px; margin-right: 10px; display: inline-block'-->
            <!--id='phase'-->
            <!--chartTitle='Test Line Chart'-->
            <!--chartType='sunburst'-->
            <!--:chartData='data2'-->
            <!--:labelFilters="['upperCase', 'replaceUnderscores']"-->
          <!--&gt;-->
          <!--</chart-report>-->
        </div>
      </tab>

      <tab name="Over Time">
        <div class="page-body">

        </div>
      </tab>

    </tabs>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/partials/AppPageHeader'
  import ChartReport from '@/components/reporting/ChartReport'
  import Fullscreen from '@/components/utils/Fullscreen'

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
      LocalGrid,
      Fullscreen
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
        ],
        data2: [
          {
            name: 'Grandpa',
            children: [{
              name: 'Uncle Leo',
              value: 15,
              children: [
                {
                  name: 'Cousin Jack',
                  value: 2
                },
                {
                  name: 'Cousin Mary',
                  value: 5,
                  children: [
                    {
                      name: 'Jackson',
                      value: 2
                    }
                  ]
                },
                {
                  name: 'Cousin Ben',
                  value: 4
                }
              ]
            }]
          }
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
