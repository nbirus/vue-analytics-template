<template>
  <div class="chart-builder">

    <!--<div class="header">-->

      <!--<div class="title">-->
        <!--<h2>Build Chart</h2>-->
        <!--<h4>Fill out the form on the left to create a chart</h4>-->
      <!--</div>-->

      <!--<div class="actions">-->
        <!--<btn>Reset Chart</btn>-->
      <!--</div>-->

    <!--</div>-->

    <div class="builder">

      <form-generator ref="commonForm"
        :schema="chartBuilderSchema"
        :initialValues="commonModel"
        :hasButtons="false"
        @formChanged="updateCommonModel"
      />

      <!-- type -->

      <!-- title -->

      <!-- theme -->


    </div>

    <div class="chart" v-if="renderChart">
      <chart-report
        id="label" class="chart-builder-report"

        v-bind="[activeChartOptions]"

        :chartData="chartData"

        noShadow
        :labelFilters="['upperCase', 'replaceUnderscores']"
      >
      </chart-report>
    </div>

  </div>
</template>

<script>
  import FormGenerator from '@/components/generators/FormGenerator'
  import ChartReport from '@/components/reporting/ChartReport'

  import ChartBuilderJSON from '../../../static/data/forms/chart-builder'

  export default {
    name: 'chart-builder',
    components: {
      FormGenerator,
      ChartReport
    },
    computed: {
      renderChart () {
        return this.activeChartOptions.hasOwnProperty('chartType')
      },
      activeChartOptions () {
        return {
          ...this.activeCommonModel
        }
      }
    },
    data () {
      return {
        activeCommonModel: {},
        commonModel: {},
        chartData: [
          {'count': 1755, 'label': 'ii'},
          {'count': 1294, 'label': 'i'},
          {'count': 1138, 'label': 'na'},
          {'count': 663, 'label': 'i_ii'},
          {'count': 397, 'label': 'iii'},
          {'count': 47, 'label': 'ii_iii'}
        ],

        chartBuilderSchema: ChartBuilderJSON
      }
    },
    mounted () {
      this.updateCommonModel()
    },
    methods: {
      updateCommonModel () {
        this.activeCommonModel = this.$refs.commonForm.getFormattedInputValues('api')
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .chart-builder {
    display: flex;
    flex-wrap: wrap;
    font-size: 1rem;
    padding: 0 1rem;

    .header {
      flex: 0 0 100%;
      padding-bottom: 2.1em;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .title {
        h4 {
          margin-top: .3em;
          font-weight: @regular;
        }
      }

      .actions {

      }

    }

    .builder {
      flex: 1 1 auto;
      padding: 1.3em;
      background-color: @grey1;
      border: solid thin @grey2;

      max-width: 300px;
    }

    .chart {
      flex: 1 1 70%;
      padding-left: 1.3em;
      height: 60vh;
      margin-top: -1em;

    }

  }

</style>
