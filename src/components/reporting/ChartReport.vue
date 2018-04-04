<template>

  <div class="panel chart-report-panel" :class="chartStateClass">

    <!--chart header-->
    <div class="panel-header chart-header">

      <div class="chart-title">
        <h4 :class="textColor">{{title}}</h4>
        <h5 v-if="!error">12,902 {{countType}}</h5>
      </div>

      <div class="chart-actions">

        <dropdown menu-right>

          <i :class="textColor" @click="toggleExpand" class="fa fa-expand"></i>
          <i :class="textColor" class="icons icon-options-vertical" data-role="trigger"></i>
          <i :class="textColor" @click="sidebar = true" class="fa fa-chevron-left"></i>

          <template slot="dropdown">
            <li><a role="button"><i class="icons icon-settings"></i>Chart Settings</a></li>
            <li><a role="button"><i class="icons icon-share-alt"></i>Export</a></li>
            <li><a role="button"><i class="icons icon-camera"></i>Screenshot</a></li>
            <li><a role="button"><i class="icons icon-lock"></i>Lock</a></li>
          </template>

        </dropdown>

      </div>

    </div>

    <!--chart-->
    <div class="panel-body chart-body" v-if="isChartReady">
      <div class="panel-block">

        <!-- horizontal-bar chart -->
        <horizontal-bar-chart
          v-if="chartType === 'horizontal-bar'"

          :id="id"
          :chartData="chartData"

          :theme="theme"
          :expanded="expanded"
          :suppressedHeaders="suppressedHeaders"

          @chartRendered="setHeaders"
        >
        </horizontal-bar-chart>

        <!-- vertical-bar chart -->
        <vertical-bar-chart
          v-if="chartType === 'vertical-bar'"

          :id="id"
          :chartData="chartData"

          :theme="theme"
          :expanded="expanded"
          :suppressedHeaders="suppressedHeaders"

          @chartRendered="setHeaders"
        >
        </vertical-bar-chart>

        <!-- pie chart -->
        <pie-chart
          v-if="chartType === 'pie'"

          :id="id"
          :chartData="chartData"

          :theme="theme"
          :expanded="expanded"
          :suppressedHeaders="suppressedHeaders"

          @chartRendered="setHeaders"
        >
        </pie-chart>

      </div>
    </div>

    <!--api states-->
    <div class="panel-body chart-api-states">

      <!-- loading -->
      <transition name="icon-circle" appear>
        <div class="loading" v-if="loading">
          <div class="icon-circle">
            <i class="fa fa-sync-alt fa-spin"></i>
          </div>
        </div>
      </transition>

      <!-- error -->
      <div class="error" v-if="error">
        <div class="icon-circle"><i class="fa fa-exclamation"></i></div>
        <h4 class="error-message">{{error}}</h4>
      </div>

    </div>

    <!--sidebar-->
    <div class="chart-sidebar-mask">

      <div class="overlay" v-if="sidebar"></div>

      <transition name="slide-in-from-right">
        <div class="sidebar" v-if="sidebar">
          <div class="checkbox-list">

            <!-- <div class="header-total">
              12,245 total trial
            </div> -->

            <div class="header">

              <div class="input-row">
                <input @click="toggleAllHeaders" class="select-all" type="checkbox" :checked="!suppressedHeaders.length"/>
                <text-input :inputValue.sync="toggleColumnSearchText" class="filter-input" placeholder="Type to filter.."></text-input>
              </div>

              <btn class="close-icon"
                   flat
                   @onClick="sidebar = false">
                <i class="fa fa-chevron-right"></i>
              </btn>

            </div>

            <div class="body">

              <ul class="header-list">
                <li class="list-item"
                    v-for="(header, index) in filteredHeaders"
                    :key="index"
                    v-if="header.name"
                    @click="toggleHeader(header.name)">

                  <input type="checkbox" :checked="!suppressedHeaders.includes(header.name)"/>
                  <div class="label">{{header.name}}</div>
                  <div class="value">{{(header.value) ? header.value.toLocaleString() : null}}</div>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </transition>

    </div>

  </div>

</template>

<script>
  import HorizontalBarChart from '@/components/reporting/charts/HorizontalBarChart'
  import VerticalBarChart from '@/components/reporting/charts/VerticalBarChart'
  import PieChart from '@/components/reporting/charts/PieChart'

  import { Dropdown } from 'uiv'

  export default {
    name: 'chart-report',
    components: {
      Dropdown,
      VerticalBarChart,
      HorizontalBarChart,
      PieChart
    },
    props: {

      // ------ state ------
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      },

      // ------ model ------
      chartData: {
        type: Array,
        required: false
      },
      chartType: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      chartProps: {
        type: Object,
        required: false
      },

      // ------ data ------
      title: {
        type: String,
        default: ''
      },
      countType: {
        type: String,
        default: 'items'
      },
      theme: {
        type: String,
        default: 'inverse'
      },
      settings: {
        type: Array,
        default: () => []
      },

      initialParams: {
        type: Object,
        default () {
          return {}
        }
      },

      // ------ flags ------
      showTotal: {
        type: Boolean,
        default: true
      },
      hasHeader: {
        type: Boolean,
        default: true
      },
      hasActionBar: {
        type: Boolean,
        default: true
      },
      canExpand: {
        type: Boolean,
        default: true
      },
      hasLegend: {
        type: Boolean,
        default: true
      },
      canExport: {
        type: Boolean,
        default: true
      },
      canScreenshot: {
        type: Boolean,
        default: true
      }

    },
    data () {
      return {

        // header data
        sidebar: false,
        toggleColumnSearchText: '',
        chartHeaders: [],

        // chart props
        suppressedHeaders: [],
        expanded: false

      }
    },
    computed: {

      isChartReady () {
        return !this.loading && !this.error && !!this.chartData
      },

      filteredHeaders () {
        return this.chartHeaders.filter(column => {
          return (column.name.toLowerCase().indexOf(this.toggleColumnSearchText.toLowerCase()) > -1)
        })
      },

      chartStateClass () {
        return {
          'loading ': this.loading,
          'error': this.error,
          'open': this.sidebar,
          'expanded': this.expanded
        }
      },

      textColor () {
        return [
          (!this.error) ? 'text-' + this.theme : null,
          (this.error) ? 'text-danger' : null
        ]
      }

    },
    methods: {

      // actions
      toggleExpand () {
        this.expanded = !this.expanded
      },

      // headers
      setHeaders (headers) {
        this.chartHeaders = headers
      },
      toggleHeader (header) {
        let index = this.suppressedHeaders.indexOf(header)

        if (index === -1) {
          this.suppressedHeaders.push(header)
        }
        else {
          this.suppressedHeaders.splice(index, 1)
        }
      },
      toggleAllHeaders () {
        (this.suppressedHeaders.length)
          ? this.suppressedHeaders = []
          : this.suppressedHeaders = this.chartHeaders.map(header => header.name)
      }

    }
  }

</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .chart-report-panel {
    height: 100%;
    overflow: hidden;

    font-size: @font-size;

    &.open {
      transform: scale(1.03);
      z-index: 99;
      .box-shadow(0 0 50px 0 fadeout(black, 85%));
      border: solid thin @grey6;
    }

    &.expanded {
      position: absolute;
      top: 2em; left: 2em; right: 2em;
      height: calc(~'100vh - 4rem');
      z-index: 999;
    }

    &.error, &.loading {
      .stripe-gradient(white, 1%);
      background-color: white;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;

      .chart-title {
        flex: 0 1 100%;

        h4 {
          color: @c-inverse;
          font-size: 1.2em;
        }
        h5 {
          color: @grey6;
          font-weight: @regular;
          font-size: .9em;
        }
      }

      .chart-actions {
        flex: 0 0 auto;

        i {
          font-size: 1em;
          margin-left: .5em;

          cursor: pointer;
          color: @c-inverse;

          &:hover {
            color: black;
          }

          &:first-child {
            margin: 0;
          }
        }
      }
    }

    .chart-body {
      & > .panel-block {
        height: 100%;
        padding: 0 1em 1em;
        overflow: visible;
      }
    }

    .chart-api-states {
      width: 100%; height: 100%;
      pointer-events: none;

      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;

      .error {
        display: flex;
        flex-direction: column;
        align-items: center;

        /*margin-top: -40px;*/


        .icon-circle {
          background-color: fadeout(@c-danger, 95%);
          border-color: fadeout(@c-danger, 90%);
          font-size: 1.2em;
          i { font-size: 1.5em; }
          color: @c-danger;
        }
        .error-message {
          font-weight: normal;
          color: @c-danger;
          font-size: 1em;
          margin-top: .5em;
        }
      }

      .loading > .icon-circle {
        font-size: 1.5rem;

        background-color: fadeout(black, 55%);
        color: fadeout(white, 10%);

        i {
          font-size: 1em;
        }
      }
    }

    .chart-sidebar-mask {
      height: 100%; width: 100%;
      position: absolute;
      overflow: hidden;
      pointer-events: none;

      .overlay {
        top: 0; bottom: 0; right: 0; left: 0;
        position: absolute;
        background-color: fadeout(black, 60%);
      }

      .sidebar {
        width: auto; height: 100%;
        right: 0;
        position: absolute;
        background: @grey1;
        border-left: solid thin @grey3;
        pointer-events: auto;

        .checkbox-list {
          width: 300px;
          background-color: white;
          position: absolute;
          top: 0; bottom: 0; right: 0;
          border: solid thin @grey5;
          border: none;
          border-left: solid thin @grey6;

          pointer-events: auto;

          display: flex;
          flex-direction: column;

          overflow: hidden;

          .header-total {
            width: 100%;
            text-align: center;
            font-size: 11pt;
            color: @grey8;
            padding: 5px 0;
            background-color: @grey2;
            border-bottom: solid thin @grey4;
            font-weight: bold;
          }

          .header {
            flex: 0 0 auto;

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 10px;
            background: @grey2;
            border-bottom: solid thin @grey4;

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

                display: flex;

                .checkbox {
                  flex: 0 0 auto;
                }

                .label {
                  flex: 0 1 100%;
                  padding-left: 5px;
                  color: @grey9;
                }

                .value {
                  flex: 0 0 auto;
                  font-size: 10pt;
                  color: @grey6;
                }

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
    }

  }
</style>
