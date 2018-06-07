<template>
  <div id="app" :class="{'hide-nav': !hasNav}">

    <!--bread crumbs-->
    <!--<app-bread-crumbs v-if="showHeader"></app-bread-crumbs>-->

    <!-- nav bar -->
    <app-nav-bar></app-nav-bar>

    <!-- page content -->
    <div class="content">

      <!-- page -->
      <transition name="default-page-transition" mode="out-in">
        <router-view :key="$route.name" />
      </transition>

      <!-- footer -->
      <!--<app-footer></app-footer>-->

    </div>

    <!-- header -->
    <app-header></app-header>

    <!-- progress bar -->
    <vue-progress-bar></vue-progress-bar>

  </div>
</template>

<script>
  import AppNavBar from '@/components/partials/AppNavBar'
  import AppFooter from '@/components/partials/AppFooter'
  import AppHeader from '@/components/partials/AppHeader'
  import AppBreadCrumbs from '@/components/partials/AppBreadCrumbs'

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppNavBar,
      AppFooter,
      AppBreadCrumbs
    },
    computed: {
      hasNav () {
        return (this.$route.meta.hasNav === undefined)
          ? true
          : this.$route.meta.showHeader
      }
    }
  }

</script>

<style lang="less">

  // import default page overrides
  @import 'styles/app-overrides.less';

  // import global styles
  @import 'styles/app.less';
  @import 'styles/app-transitions.less';

  // import uiv styles
  @import 'styles/uiv/app-dropdown.less';
  @import 'styles/uiv/app-modal.less';
  @import 'styles/uiv/app-tooltip.less';

  // import grid styles
  @import 'styles/grid/app-ag-grid.less';
  @import 'styles/grid/app-ag-fresh.less';

</style>
