<template>
  <div class="bread-crumbs">
    <div class="fluid-container">
      {{$route.meta.pageHeaderName}}
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .bread-crumbs {
    background-color: darken(white, 4%);
    border-bottom: solid thin @grey3;

    .fluid-container {
      padding: 10px @page-padding;
      .max-page-width;
      color: @grey6;
      font-size: 1.1rem;
    }
  }

</style>
