<template>
  <div>

    <!-- ------- chart report ------- -->
    <chart-report
      v-if="reportType === 'chart-report'"

      :chartType="reportProps.chartType"
      :chartProps="reportProps.chartProps"

      :title="reportProps.title"
      :countType="reportProps.countType"
      :settings="reportProps.settings"

      :showTotal="reportProps.showTotal"
      :hasHeader="reportProps.hasHeader"
      :hasActionBar="reportProps.hasActionBar"
      :canExpand="reportProps.canExpand"
      :hasLegend="reportProps.hasLegend"
      :canExport="reportProps.canExport"
      :canScreenshot="reportProps.canScreenshot"
    >
    </chart-report>

    <!-- ------- number widget ------- -->
    <number-widget
      v-else-if="reportType === 'number-widget'"

      :title="reportProps.title"
      :theme="reportProps.theme"
      :size="reportProps.size"
      :apiConfig="reportProps.apiConfig"
      :icon="reportProps.icon"
    >
    </number-widget>

  </div>
</template>

<script>
  import ChartReport from './ChartReport'
  import NumberWidget from './widgets/NumberWidget'

  export default {
    name: 'report-container',
    components: {
      ChartReport,
      NumberWidget
    },
    props: {
      reportType: {
        required: true
      },
      reportProps: {
        type: Object,
        required: true
      }
    }
  }

</script>
