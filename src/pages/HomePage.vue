<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">
        <div class="page-title-container">
          <h2>Home</h2>
        </div>
      </div>


    </div>

    <div class="page-body">

      <dashboard :dashboard="dashboard"></dashboard>

    </div>

  </div>
</template>

<script>
  import Dashboard from '../components/generators/Dashboard'

  import DashboardJSON from '../../static/data/dashboards/test-dashboard.json'

  export default {
    name: 'home',
    components: {
      Dashboard
    },
    data () {
      return {
        dashboard: DashboardJSON
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../styles/component-helper.less';

  .panel-1 {
    width: 400px; height: 300px;

    .panel-footer {
      // background-color: @grey1;
      color: @c-inverse;
      font-size: 11pt;
    }
  }


</style>
