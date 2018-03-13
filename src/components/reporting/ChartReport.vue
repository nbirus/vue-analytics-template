<template>

  <div class="panel chart-report-panel" :class="{'open': sidebar}">

    <div class="panel-header">

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

    <div class="panel-body">
      <div class="panel-block chart-body">

        <!--vertical bar chart-->
        <vertical-bar-chart v-if="chartType === 'vertical-bar'"

          :id="chartProps.id"
          :apiConfig="chartProps.apiConfig"
          :theme="theme"

          :isExpanded="true"
          :suppressedHeaders="suppressedHeaders"
          @chartRendered="chartRendered"
        >
        </vertical-bar-chart>

        <!--horizontal bar chart-->
        <horizontal-bar-chart
          v-if="chartType === 'horizontal-bar'"

          :id="chartProps.id"
          :apiConfig="chartProps.apiConfig"
          :theme="theme"

          :isExpanded="true"
          :suppressedHeaders="suppressedHeaders"
          @chartRendered="chartRendered"
        >
        </horizontal-bar-chart>

        <!--pie chart-->
        <pie-chart
          v-if="chartType === 'pie'"

          :id="chartProps.id"
          :apiConfig="chartProps.apiConfig"
          :theme="theme"

          :isExpanded="true"
          :suppressedHeaders="suppressedHeaders"
          @chartRendered="chartRendered"
        >
        </pie-chart>


      </div>
    </div>

    <div class="chart-sidebar-mask">

      <div class="overlay" v-if="sidebar"></div>

      <transition name="slide-in-from-left">
        <div class="sidebar" v-if="sidebar">
          <div class="checkbox-list">

            <div class="header">

              <div class="input-row">
                <input @click="toggleAllHeaders" class="select-all" type="checkbox" :checked="!suppressedHeaders.length"/>
                <text-input :inputValue.sync="toggleColumnSearchText" class="filter-input" placeholder="Type to filter.."></text-input>
              </div>

              <btn class="close-icon" icon flat small
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
  import HorizontalBarChart from './charts/HorizontalBarChart'
  import VerticalBarChart from './charts/VerticalBarChart'
  import PieChart from './charts/PieChart'
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

      // ------ model ------
      chartType: {
        type: String,
        required: true
      },
      chartProps: {
        type: Object,
        required: true
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
        sidebar: false,
        toggleColumnSearchText: '',
        chartHeaders: [],
        suppressedHeaders: []
      }
    },
    computed: {
      filteredHeaders () {
        return this.chartHeaders.filter(column => {
          return (column.name.toLowerCase().indexOf(this.toggleColumnSearchText.toLowerCase()) > -1)
        })
      }
    },
    methods: {
      chartRendered (headers) {
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

    .panel-header {
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
      height: 100%;
      padding: 0 20px 20px;
    }

  }
</style>
