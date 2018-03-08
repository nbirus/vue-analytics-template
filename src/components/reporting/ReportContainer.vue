<template>
  <div>

    <!-- ------- chart report ------- -->
    <chart-report
      v-if="reportType === 'chart-report'"

      :chartType="reportProps.v"
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

    <number-widget
      v-else-if="reportType === 'number-widget'"

      :id="'count'"
      :title="'total trials'"
      :theme="reportProps.theme"
      :bordered="'left'"
      :icon="'user'">

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
