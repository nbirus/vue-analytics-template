<template>
  <data-wrapper :apiConfig="activeConfig">
    <template slot-scope="{ _response, _state }">
      <component
        :is="reportType"

        v-bind="[reportProps]"

        :loading="_state.loading"
        :error="_state.error"
        :chartData="_response.analytics"
      >
      </component>
    </template>
  </data-wrapper>
</template>

<script>
  import { cloneDeep, merge } from 'lodash'
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
      },
      initialParams: {
        type: Object,
        required: true
      }
    },
    computed: {
      activeConfig () {
        return {
          ...cloneDeep(this.reportApiConfig),
          params: merge(
            this.initialParams,
            this.reportApiConfig.params
          )
        }
      }
    }
  }

</script>
