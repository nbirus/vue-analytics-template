<template>

    <transition-group name="dashboard-list" appear mode="out-in" class="dashboard" tag="div">
      <report-container

        v-for="(report, index) in activeDashboard.reportContainers"
        :key="index"

        class="dashboard-item"
        :class="buildReportClass(report.display)"
        :id="'report-' + report.id"

        :reportApiConfig="report.reportApiConfig"
        :reportType="report.reportType"
        :reportProps="report.reportProps"
      >
      </report-container>
    </transition-group>

</template>

<script>
  import ReportContainer from '../reporting/ReportContainer'

  export default {
    name: 'reporting-generator',
    components: { ReportContainer },
    props: {
      dashboard: {
        type: Object,
        required: true
      },
      initialProps: {
        type: Object,
        default () { return {} }
      }
    },
    computed: {
      activeDashboard () {
        return this.dashboard.dashboards[0]
      }
    },
    methods: {

      buildReportClass (display) {
        if (display) {

          let lg = `sr-lg-${display[0].row} sc-lg-${display[0].col} order-lg-${display[0].order} `
          let md = `sr-md-${display[1].row} sc-md-${display[1].col} order-md-${display[1].order} `
          let sm = `sr-sm-${display[2].row} sc-sm-${display[2].col} order-sm-${display[2].order}`

          return lg + md + sm
        }
      }

    }
  }
</script>

<style lang="less" scoped>

  .dashboard {

    display: grid;
    grid-gap: 1.2rem;

    grid-template-columns: repeat(16, 1fr);
    grid-auto-rows: 2.6rem;

    .dashboard-item {

      // create span classes
      .foreach ({

        // > 1100px
        @media screen and (min-width: 1100px) {
          &.sc-lg-@{value} { grid-column: span @value }
          &.sr-lg-@{value} { grid-row: span @value }
          &.order-lg-@{value} { order: @value }
        }

        // < 1100px
        @media screen and (max-width: 1100px) {
          &.sc-md-@{value} { grid-column: span @value }
          &.sr-md-@{value} { grid-row: span @value }
          &.order-md-@{value} { order: @value }
        }

        // < 500px
        // @media screen and (max-width: @bp-sm) {
          // &.sc-sm-@{value} { grid-column: span @value }
          // &.sr-sm-@{value} { grid-row: span @value }
          // &.order-sm-@{value} { order: @value }
        /*}*/

      }, 20);

    }

  }

  // ----- dashboard items -----

  .foreach(@body, @i) when (@i>0) {
    .foreach(@body, @i - 1);

    @value: @i;
    @body();
  }


</style>
