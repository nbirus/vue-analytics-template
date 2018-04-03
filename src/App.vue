<template>
  <div id="app" class="">

    <!-- nav bar -->
    <app-nav-bar v-if="!hideHeader" :sidebar="true"></app-nav-bar>

    <!-- page content -->
    <div class="content">

      <!-- nav bar -->
      <app-header v-if="!hideHeader"></app-header>

      <!-- page -->
      <transition name="default-page-transition" mode="out-in">
        <router-view :key="$route.name"/>
      </transition>

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
    },
    computed: {
      hideHeader () {
        return (this.$route.path === '/login')
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


</style>
