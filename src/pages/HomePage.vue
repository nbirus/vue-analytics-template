<template>
  <div class="page">

    <app-header>
      <div slot="page-actions">
        <btn class="dashboard-settings-btn" large><i class="fa fa-cog icon-margin"></i>Dashboard Settings</btn>
      </div>
    </app-header>

    <div class="page-body">
      <dashboard :dashboard="dashboard"></dashboard>
    </div>

  </div>
</template>

<script>
  import AppHeader from '@/components/core/AppHeader'
  import Dashboard from '../components/generators/ReportGenerator'
  import DashboardJSON from '../../static/data/dashboards/strap-dashboard.json'

  export default {
    name: 'home',
    components: {
      Dashboard,
      AppHeader
    },
    data () {
      return {
        dashboard: DashboardJSON
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

  .dashboard-settings-btn {
    .vertical-gradient(lighten(@c-light, 10%), transparent)!important;
    border-color: darken(@c-light, 5%)!important;
  }


</style>
