<template>
  <data-wrapper :apiConfig="reportApiConfig">
    <template slot-scope="{ _response, _state }">

      <!-- ------- chart report ------- -->
      <chart-report
        v-if="reportType === 'chart-report'"

        :loading="_state.loading"
        :error="_state.error"
        :chartData="_response.analytics"

        :id="reportProps.id"
        :chartType="reportProps.chartType"
        :chartProps="reportProps.chartProps"

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
      <count-widget
        v-else-if="reportType === 'count-widget'"

        :loading="_state.loading"
        :error="_state.error"
        :count="_response.count"

        :title="reportProps.title"
        :theme="reportProps.theme"
        :size="reportProps.size"
        :icon="reportProps.icon"
      >
      </count-widget>

      <!-- ------- progress widget ------- -->
      <!--<data-wrapper v-else-if="reportType === 'progress-widget'">-->
        <!--<template slot-scope="{ _response, _state }">-->
          <!--<progress-widget-->
            <!--:title="reportProps.title"-->
            <!--:theme="reportProps.theme"-->
            <!--:size="reportProps.size"-->
            <!--:apiConfig="reportProps.apiConfig"-->
            <!--:icon="reportProps.icon"-->
          <!--&gt;-->
          <!--</progress-widget>-->
        <!--</template>-->
      <!--</data-wrapper>-->

    </template>
  </data-wrapper>
</template>

<script>
  import DataWrapper from '@/components/reporting/DataWrapper'

  import ChartReport from '@/components/reporting/ChartReport'
  import CountWidget from '@/components/reporting/widgets/CountWidget'
  import ProgressWidget from '@/components/reporting/widgets/ProgressWidget'

  export default {
    name: 'report-container',
    components: {
      DataWrapper,

      ChartReport,
      CountWidget,
      ProgressWidget
    },
    props: {
      reportApiConfig: {
        type: Object,
        required: false
      },
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
