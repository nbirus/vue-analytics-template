<template>
  <div class="page">

    <app-page-header
      pageTitle="Page Header"
    >
    </app-page-header>

    <div class="page-body">

    </div>

  </div>
</template>

<script>
  import AppPageHeader from '@/components/partials/AppPageHeader'

  export default {
    name: 'home',
    components: { AppPageHeader }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../styles/app-helper.less';

</style>
