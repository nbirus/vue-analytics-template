<template>

  <div class="panel chart-report-panel" :class="{'open': sidebar}">

    <!--chart header-->
    <div class="panel-header chart-header">

      <div class="chart-title">
        <h4 :class="'text-' + theme">{{title}}</h4>
        <h5>12,902 {{countType}}</h5>
      </div>

      <div class="chart-actions">

        <dropdown menu-right>

          <i :class="'text-' + theme" class="icons icon-options-vertical" data-role="trigger"></i>
          <i :class="'text-' + theme" @click="sidebar = true" class="fa fa-chevron-left"></i>

          <template slot="dropdown">
            <li><a role="button"><i class="icons icon-settings"></i>Chart Settings</a></li>
            <li><a role="button"><i class="icons icon-refresh"></i>Refresh</a></li>
            <!-- <li><a role="button" @click="sidebar = true"><i class="fa fa-check"></i>Hide Columns</a></li> -->
            <li><a role="button"><i class="icons icon-share-alt"></i>Export</a></li>
            <li><a role="button"><i class="icons icon-camera"></i>Screenshot</a></li>
          </template>

        </dropdown>

      </div>

    </div>

    <!--chart-->
    <div class="panel-body chart-body" v-if="isChartReady">
      <div class="panel-block">

        <!--vertical bar chart-->
        <!--<vertical-bar-chart v-if="chartType === 'vertical-bar'"-->

          <!--:id="chartProps.id"-->
          <!--:apiConfig="chartProps.apiConfig"-->
          <!--:theme="theme"-->

          <!--:isExpanded="true"-->
          <!--:suppressedHeaders="suppressedHeaders"-->
          <!--@chartLoading="chartLoading"-->
          <!--@chartRendered="chartRendered"-->
          <!--@chartError="chartError"-->
        <!--&gt;-->
        <!--</vertical-bar-chart>-->

        <!--&lt;!&ndash;horizontal bar chart&ndash;&gt;-->
        <!--<horizontal-bar-chart-->
          <!--v-if="chartType === 'horizontal-bar'"-->

          <!--:id="chartProps.id"-->
          <!--:apiConfig="chartProps.apiConfig"-->
          <!--:theme="theme"-->

          <!--:isExpanded="true"-->
          <!--:suppressedHeaders="suppressedHeaders"-->
          <!--@chartRendered="chartRendered"-->
        <!--&gt;-->
        <!--</horizontal-bar-chart>-->

        <!--pie chart-->
        <pie-chart
          v-if="chartType === 'pie'"

          :id="chartProps.id"
          :chartData="chartData"
          :theme="theme"

          :isExpanded="isExpanded"
          :suppressedHeaders="suppressedHeaders"
          @chartRendered="setHeaders"
        >
        </pie-chart>

      </div>
    </div>

    <!--api states-->
    <div class="panel-body chart-api-states" v-else>

      <!-- loading -->
      <div class="loading" v-if="loading">
        <div class="icon-circle">
          <i class="fa fa-sync-alt fa-spin"></i>
        </div>
      </div>

      <!-- error -->
      <div class="error" v-if="error">
        <div class="icon-circle">
          <i class="fa fa-exclamation"></i>
        </div>
        {{errorMessage}}
      </div>
    </div>

    <!--sidebar-->
    <div class="chart-sidebar-mask">

      <div class="overlay" v-if="sidebar"></div>

      <transition name="slide-in-from-right">
        <div class="sidebar" v-if="sidebar">
          <div class="checkbox-list">

            <div class="header">

              <div class="input-row">
                <input @click="toggleAllHeaders" class="select-all" type="checkbox" :checked="!suppressedHeaders.length"/>
                <text-input :inputValue.sync="toggleColumnSearchText" class="filter-input" placeholder="Type to filter.."></text-input>
              </div>

              <btn class="close-icon" flatIcon
                   :onClick="() => { sidebar = false }"><i class="fa fa-chevron-right"></i>
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
                  <span>{{header.name}}</span>

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
  import DataMixin from '@/mixins/DataMixin'

  export default {
    name: 'chart-report',
    mixins: [DataMixin],
    components: {
      Dropdown,
      VerticalBarChart,
      HorizontalBarChart,
      PieChart
    },
    props: {

      // ------ model ------
      chartType: {
        type: String,
        required: true
      },
      chartProps: {
        type: Object,
        required: true
      },

      // ------ data ------
      apiConfig: {
        type: Object,
        default: () => { return {} }
      },

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
        chartData: [],
        suppressedHeaders: [],
        isExpanded: false

      }
    },
    computed: {

      isChartReady () {
        return !this.loading && !this.error
      },

      filteredHeaders () {
        return this.chartHeaders.filter(column => {
          return (column.name.toLowerCase().indexOf(this.toggleColumnSearchText.toLowerCase()) > -1)
        })
      }

    },
    mounted () {
      this.getData()
    },
    methods: {

      // data
      async getData () {

        try {
          let result = await this.$get(this.apiConfig)
          this.chartData = result.analytics
          this.loading = false
        }
        catch (error) {
          this.$throwError(error)
        }

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

  @import (reference) '../../styles/component-helper.less';

  .chart-report-panel {
    height: 100%;
    transition: transform .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    overflow: hidden;

    &.open {
      transform: scale(1.03);
      z-index: 99;
      .box-shadow(0 0 50px 0 fadeout(black, 85%));
      border: solid thin @grey6;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;

      .chart-title {
        flex: 0 1 100%;
        h4 {
          color: @c-inverse;
          font-size: 13pt;
        }
        h5 {
          color: @grey6;
          font-size: 9pt;
          .f-r;
        }
      }

      .chart-actions {
        flex: 0 0 auto;

        i {
          margin-left: 5px;
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
        padding: 0 20px 20px;
      }
    }

    .chart-api-states {
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-circle {
        background-color: fadeout(black, 97%);
        border-color: fadeout(black, 95%);
        margin-top: -40px;
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
