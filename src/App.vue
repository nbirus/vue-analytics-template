<template>
  <div id="app">

    <app-header></app-header>

    <!-- nav bar -->
    <app-nav-bar v-if="showHeader"></app-nav-bar>

    <!--bread crumbs-->
    <!--<app-bread-crumbs v-if="showHeader"></app-bread-crumbs>-->

    <!-- page content -->
    <div class="content">

      <!-- page -->
      <transition name="default-page-transition" mode="out-in">
        <router-view :key="$route.name" />
      </transition>

      <!-- footer -->
      <!--<app-footer></app-footer>-->

    </div>

  </div>
</template>

<script>
  import AppNavBar from '@/components/core/AppNavBar'
  import AppFooter from '@/components/core/AppFooter'
  import AppHeader from '@/components/core/AppHeader'
  import AppBreadCrumbs from '@/components/core/AppBreadCrumbs'

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppNavBar,
      AppFooter,
      AppBreadCrumbs
    },
    computed: {
      showHeader () {
        return (this.$route.meta.showHeader === undefined)
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
