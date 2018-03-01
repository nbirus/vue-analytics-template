<template>

  <div id="app">

    <!-- nav bar -->
    <!-- <base-nav-bar class="nav-bar"></base-nav-bar> -->

    <!-- header -->
    <app-header class="nav-bar"></app-header>

    <!-- content -->
    <div class="content">

      <!-- page -->
      <router-view :key="$route.fullPath"></router-view>

      <!-- footer -->
      <app-footer class="footer"></app-footer>

    </div>

  </div>

</template>

<script>
  import AppHeader from '@/components/core/AppHeader'
  import AppNavBar from '@/components/core/AppNavBar'
  import AppFooter from '@/components/core/AppFooter'

  export default {
    name: 'app',
    components: {
      AppHeader,
      AppNavBar,
      AppFooter
    }
  }

</script>

<style lang="less">

  @import 'styles/base-overrides.css'; // overrides
  @import 'styles/app.less'; // app style sheet

  #app {
    display: flex;

    .nav-bar {
      flex: 0 0 230px;
      background-color: @c-inverse;
    }

    .content {
      flex: 0 1 100%;
    }

  }

</style>
