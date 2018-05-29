<template>
  <div class="footer">
    <div class="footer-content">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'base-footer'
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .footer {
    width:100%; height:60px;

    background: @page-bg-color;

    .footer-content {
      width: 100%; height: 100%;
      max-width: 1000px;

      border-top: solid 1px @grey5;

      margin: 0 auto;
      padding: 15px;

      color: white;
      font-size: 11pt;

    }
  }
</style>
