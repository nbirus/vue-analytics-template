<template>

  <div class="panel chart-report-panel" :class="{'open': sidebar}">

    <div class="panel-header">

      <div class="chart-title">
        <h4 :class="'text-' + theme">{{title}}</h4>
        <h5><i class="icons icon-book-open icon-margin"></i>12,902 {{countType}}</h5>
      </div>

      <div class="chart-actions">

        <dropdown menu-right>

          <div >
            <i :class="'text-' + theme" class="icons icon-options-vertical" data-role="trigger"></i>
            <!-- <i :class="'text-' + theme" @click="sidebar = true" class="fa fa-check"></i> -->
          </div>

          <template slot="dropdown">
            <li><a role="button"><i class="icons icon-settings"></i>Chart Settings</a></li>
            <li><a role="button"><i class="icons icon-refresh"></i>Refresh</a></li>
            <li><a role="button" @click="sidebar = true"><i class="fa fa-check"></i>Hide Columns</a></li>
            <li><a role="button"><i class="icons icon-share-alt"></i>Export</a></li>
            <li><a role="button"><i class="icons icon-camera"></i>Screenshot</a></li>
          </template>

        </dropdown>



      </div>

    </div>

    <div class="panel-body">
      <div class="panel-block chart-body">

        <!--bar chart-->
        <bar-chart v-if="chartType === 'bar'"

          :id="chartProps.id"
          :apiConfig="chartProps.apiConfig"
          :theme="theme"

          :isExpanded="true"
          :suppressedHeaders="[]"
        >
        </bar-chart>

      </div>
    </div>

    <div class="chart-sidebar-mask">

      <div class="overlay" v-if="sidebar"></div>

      <transition name="slide-in-out">
        <div class="sidebar" v-if="sidebar">
          <i class="icons icon-close" @click="sidebar = false"></i>
        </div>
      </transition>

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
        sidebar: false
      }
    }
  }

</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  .slide-in-out-enter-active {
    transition: transform .05s;
  }
  .slide-in-out-leave-active {
    transition: transform .05s;
  }
  .slide-in-out-enter, .slide-in-out-leave-to {
    transform: translateX(430px);
  }

  .chart-report-panel {
    height: 100%;
    transition: transform .3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    &.open {
      transform: scale(1.08);
      z-index: 99;
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
        width: 80%; height: 100%;
        right: 0;
        position: absolute;
        background: @grey1;
        border-left: solid thin @grey3;
        pointer-events: auto;
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
    }

  }
</style>
