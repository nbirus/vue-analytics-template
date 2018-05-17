<template>
  <div class="page">

    <app-page-header
      pageTitle="Search Page"
    >
    </app-page-header>

    <div class="page-body">

    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/core/AppPageHeader'

  export default {
    name: 'search-page',
    components: {
      AppPageHeader
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

</style>
