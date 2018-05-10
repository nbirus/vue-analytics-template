<template>
  <div class="page">

    <app-header>

    </app-header>

    <div class="page-body analytics" v-if="value === 'charts'">
      <dashboard :dashboard="dashboard"></dashboard>
    </div>

    <transition name="dashboard-list" appear mode="out-in">
      <div class="page-body grid" v-if="value === 'grid'">

        <!--<progress-widget-->
          <!--style="width: 280px; height: 110px"-->
          <!--:target="29"-->
          <!--:count="15"-->
        <!--&gt;-->
        <!--</progress-widget>-->

        <grid style="height: 80vh; width: 100%"
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
              :canSelect="true"
              :canSelectMultiple="false"
              :showRowDetail="false"
        >
        </grid>




            <!--<data-wrapper :apiConfig="config">-->
              <!--<template slot-scope="{ _response, _state }">-->
                <!--<chart-report-->
                  <!--style="height: 370px; width: 400px"-->

                  <!--:loading="_state.loading"-->
                  <!--:error="_state.error"-->
                  <!--:chartData="_response.analytics"-->

                  <!--title="Test Title"-->
                  <!--chartType="pie"-->
                  <!--id="phase"-->
                  <!--theme="cyan"-->
                <!--&gt;-->
                <!--</chart-report>-->

                <!--&lt;!&ndash;<count-widget&ndash;&gt;-->
                  <!--&lt;!&ndash;style="height: 100px"&ndash;&gt;-->

                  <!--&lt;!&ndash;:loading="_state.loading"&ndash;&gt;-->
                  <!--&lt;!&ndash;:error="_state.error"&ndash;&gt;-->

                  <!--&lt;!&ndash;:count="_response.count"&ndash;&gt;-->
                  <!--&lt;!&ndash;title="TEST"&ndash;&gt;-->
                  <!--&lt;!&ndash;icon="grid"&ndash;&gt;-->
                  <!--&lt;!&ndash;theme="inverse"&ndash;&gt;-->
                <!--&lt;!&ndash;&gt;&ndash;&gt;-->
                <!--&lt;!&ndash;</count-widget>&ndash;&gt;-->

              <!--</template>-->
            <!--</data-wrapper>-->

      </div>
    </transition>

  </div>
</template>

<script>
  import AppHeader from '@/components/core/AppHeader'
  import TestData from '../../static/data/grid-headers/test-data2.json'
  import TestColumns from '../../static/data/grid-headers/test-headers2.json'
  import Grid from '../components/reporting/Grid'
  import ProgressWidget from '../components/reporting/widgets/ProgressWidget'
  import CountWidget from '../components/reporting/widgets/CountWidget'
  import ChartReport from '../components/reporting/ChartReport'

  import DataWrapper from '../components/reporting/DataWrapper'

  import Dashboard from '../components/generators/ReportGenerator'
  import DashboardJSON from '../../static/data/dashboards/test-dashboard.json'

  export default {
    name: 'trials',
    components: { AppHeader, DataWrapper, Grid, Dashboard, ProgressWidget, CountWidget, ChartReport },
    data () {
      return {
        load: false,
        data: TestData,
        columns: TestColumns,
        value: 'grid',
        config: {
          headers: {},
          endpoint: 'analytic/trials',
          params: {
            chart: 'phase'
          }
        },
        inputList: [
          { name: 'Key Word' },
          { name: 'Disease' },
          { name: 'Phase' },
          { name: 'Primary Purpose' },
          { name: 'Study Type' },
          { name: 'Intervention' },
          { name: 'Funding Source' }
        ],
        headerList: [
          'NCI ID',
          'Title',
          'Phase',
          'Primary Purpose',
          'Study Source'
        ],
        dashboard: DashboardJSON
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

  .dashboard-settings-btn {
    .vertical-gradient(lighten(@c-light, 10%), transparent)!important;
    border-color: darken(@c-light, 5%)!important;
  }

  .page-header {
    background-color: @page-bg-color;
  }

  .page-body {
    display: flex;

    .adder {
      flex: 0 0 auto;
      min-width: 300px;

      .panel-header {
        h4 {
          margin-bottom: 10px;
        }
      }

      .input-list {
        padding: 0;

        li {
          padding: 6px 15px;
          border-bottom: solid thin @grey2;

          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;

          .label {
            font-size: 11pt;
            color: @grey8;
            font-weight: 100;
          }

          .icon {
            font-size: 8pt;
            color: @grey5;
          }

          &:nth-child(odd) {
            background-color: fadeout(black, 98%);
          }

          &:hover {
            background-color: fadeout(black, 96%);

            .label {
              color: @grey9;
            }

            .icon {
              color: @grey7;
            }
          }

        }
      }
    }

    .query-builder-body {
      flex: 0 1 100%;
      padding: 0 25px 0;

      .query-item {
        width: 100%;
        padding: 15px;
        margin-bottom: 10px;

        &:after {
          content: "";
          position: absolute;
          width: 10px; height: 15px;
          background-color: @grey2;
          border: solid thin @grey4;

          bottom: -15px;
        }

        &:last-child {
          &:after {
            display: none;
          }
        }
      }
    }



    .left-actions {
      flex: 0 0 300px;

      .header-builder {
        margin-bottom: 15px;

        .checkbox-list {
          width: 100%;
          background-color: white;

          pointer-events: auto;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          h4 {
            margin: 15px 15px 10px;
          }

          .header {
            flex: 0 0 auto;

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0 15px 15px;

            border-bottom: solid thin @grey3;

            .close-icon {
              flex: 0 0 auto;
            }

            .input-row {
              flex: 0 1 100%;
              display: flex;
              padding-right: 10px;

              .select-all {
                flex: 0 0 auto;
                margin: 10px 15px 0 5px;
                cursor: pointer;
              }

              .filter-input {
                flex: 0 1 100%;
              }
            }
          }

          .body {
            flex: 0 1 100%;
            overflow-y: auto;

            .header-list {

              .list-item {
                font-size: 11pt;
                padding: 5px 10px;
                cursor: pointer;
                color: @grey8;

                &:nth-child(odd) {
                  background-color: @grey1;
                }

                &:hover {
                  background-color: @grey2;
                }
              }
            }
          }
        }
      }

      .search-btn {
        padding: 15px;
      }
    }
  }



</style>
