<template>
  <div>

    <!-- ------- chart report ------- -->
    <chart-report
      v-if="reportType === 'chart-report'"

      :chartType="reportProps.chartType"
      :chartProps="reportProps.chartProps"

      :apiConfig="reportProps.apiConfig"

      :title="reportProps.title"
      :countType="reportProps.countType"
      :theme="reportProps.theme"
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

    <!-- ------- progress widget ------- -->
    <progress-widget
      v-else-if="reportType === 'progress-widget'"

      :title="reportProps.title"
      :theme="reportProps.theme"
      :size="reportProps.size"
      :apiConfig="reportProps.apiConfig"
      :icon="reportProps.icon"
    >
    </progress-widget>

  </div>
</template>

<script>
  import ChartReport from '@/components/reporting/ChartReport'
  import NumberWidget from '@/components/reporting/widgets/CountWidget'
  import ProgressWidget from '@/components/reporting/widgets/ProgressWidget'

  export default {
    name: 'report-container',
    components: {
      ChartReport,
      NumberWidget,
      ProgressWidget
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
