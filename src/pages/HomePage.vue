<template>
  <div class="page">

    <!-- <div class="page-header"> -->

      <!-- <div class="page-header-content">

        <div class="page-title-container">
          <div class="icon">
            <i class="icons icon-grid"></i>
          </div>

          <transition name="page-header" mode="out-in">
            <h2 v-if="rendered">Dashboard</h2>
          </transition>

        </div>

        <div class="page-actions">
          <btn class="dashboard-settings-btn" large><i class="fa fa-cog icon-margin"></i>Dashboard Settings</btn>
        </div>
      </div> -->

    <!-- </div> -->

    <div class="page-body">
      <dashboard :dashboard="dashboard"></dashboard>
    </div>

  </div>
</template>

<script>
  import Dashboard from '../components/generators/ReportGenerator'
  import DashboardJSON from '../../static/data/dashboards/strap-dashboard.json'

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

  @import (reference) '../styles/app-helper.less';

  .dashboard-settings-btn {
    .vertical-gradient(lighten(@c-light, 10%), transparent)!important;
    border-color: darken(@c-light, 5%)!important;
  }


</style>
