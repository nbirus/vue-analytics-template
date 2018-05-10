<template>
  <div class="bread-crumbs">
    <div class="fluid-container">
      {{$route.name}}
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
    border-bottom: solid thin darken(white, 8%);

    .fluid-container {
      padding: 10px @page-padding;
      .max-page-width;



    }
  }

</style>
