<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">

        <div class="page-title-container">
          <h2><i class="icons icon-grid"></i>Dashboard</h2>
        </div>

        <div class="page-actions">
          <btn class="dashboard-settings-btn" large><i class="fa fa-cog icon-margin"></i>Dashboard Settings</btn>
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

  @import (reference) '../styles/component-helper.less';

  .dashboard-settings-btn {
    .vertical-gradient(lighten(@c-light, 10%), transparent)!important;
    border-color: darken(@c-light, 5%)!important;
  }


</style>
