<template>
  <data-wrapper :apiConfig="reportApiConfig">
    <template slot-scope="{ _response, _state }">

      <!-- ------- chart report ------- -->
      <chart-report
        v-if="reportType === 'chart'"

        :loading="_state.loading"
        :error="_state.error"
        :chartData="[]"

        v-bind="reportProps"

      >
      </chart-report>

      <!-- ------- number widget ------- -->
      <count-widget
        v-else-if="reportType === 'count'"

        :loading="_state.loading"
        :error="_state.error"
        :count="_response.count"

        v-bind="reportProps"
      >
      </count-widget>


    </template>
  </data-wrapper>
</template>

<script>
  import ChartReport from '@/components/reporting/ChartReport'
  import CountWidget from '@/components/reporting/widgets/CountWidget'
  import ProgressWidget from '@/components/reporting/widgets/ProgressWidget'

  export default {
    name: 'report-container',
    components: {
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
