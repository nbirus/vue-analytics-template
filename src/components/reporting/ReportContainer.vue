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

  </div>
</template>

<script>
  import ChartReport from './ChartReport'

  export default {
    name: 'report-container',
    components: {
      ChartReport
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
