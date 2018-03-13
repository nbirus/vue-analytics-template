<template>
  <div id="app">

    <!-- nav bar -->
    <app-nav-bar></app-nav-bar>

    <!-- page content -->
    <div class="content">

      <!-- nav bar -->
      <!-- <app-header></app-header> -->

      <!-- page -->
      <router-view/>

      <!-- footer -->
      <app-footer></app-footer>

    </div>

  </div>
</template>

<script>
  import AppHeader from '@/components/core/AppHeader'
  import AppNavBar from '@/components/core/AppNavBar'
  import AppFooter from '@/components/core/AppFooter'

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppNavBar,
      AppFooter
    }
  }

</script>

<style lang="less">

  // import global styles
  @import 'styles/app.less';
  @import 'styles/app-overrides.less';

  // import uiv styles
  @import 'styles/uiv/app-dropdown.less';
  @import 'styles/uiv/app-modal.less';
  @import 'styles/uiv/app-datepicker.less';

</style>
