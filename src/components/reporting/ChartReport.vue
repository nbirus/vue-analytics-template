<template>

  <div class="panel chart-report-panel">

    <!--bar chart-->
    <bar-chart v-if="chartType === 'bar'"
    >
    </bar-chart>

    <!--pie chart-->
    <pie-chart v-else-if="chartType === 'pie'"
    >
    </pie-chart>

  </div>

</template>

<script>
  import Charts from './Charts'

  export default {
    name: 'chart-report',
    components: {
      ...Charts
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

<style>
  .chart-report-panel {
    height: 100%;
  }
</style>
