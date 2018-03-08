<template>

  <div class="panel chart-report-panel">

    <div class="panel-header">
      <div class="chart-title">
        <h4>{{title}}</h4>
        <h5>12,902 {{countType}}</h5>
      </div>

      <div class="chart-actions">
        <!-- <i class="icons icon-settings"></i> -->
        <!-- <i class="icons icon-refresh"></i> -->

        <dropdown menu-right>

          <div data-role="trigger">
            <i class="icons icon-options-vertical"></i>
          </div>

          <template slot="dropdown">
            <li><a role="button">Chart Settings</a></li>
            <li><a role="button">Refresh</a></li>
            <li><a role="button">Export</a></li>
            <li><a role="button">Screenshot</a></li>
          </template>

        </dropdown>
      </div>
    </div>

    <div class="panel-body">
      <div class="panel-block" style="height: 100%">

        <!--bar chart-->
        <bar-chart v-if="chartType === 'bar'"

          :id="chartProps.id"
          :apiConfig="chartProps.apiConfig"

          :isExpanded="true"
          :suppressedHeaders="[]"
        >
        </bar-chart>

      </div>
    </div>

  </div>

</template>

<script>
  import BarChart from './charts/BarChart'
  import { Dropdown } from 'uiv'

  export default {
    name: 'chart-report',
    components: {
      Dropdown,
      BarChart
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
      initialTheme: {
        type: String,
        default: 'info'
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

    }
  }

</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  .chart-report-panel {
    height: 100%;

    .panel-header {
      display: flex;
      justify-content: space-between;

      .chart-title {
        flex: 0 1 100%;
        h4 { color: @c-inverse; }
        h5 {
          color: @grey6;
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
  }
</style>
