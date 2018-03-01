<template>
  <header>

  </header>
</template>

<script>
  export default {
    name: 'base-header'
  }
</script>

<style lang="less" scoped>

  @import '../../styles/config.less';

  @color: @header-bg-color;
  @color-dark: darken(@header-bg-color, 2%);

  header {
    // width: 100%; height: 50px;
    background: @color;
    // border-bottom: solid 2px lighten(@header-bg-color, 15%);
    background: @color; /* Old browsers */
    background: -moz-linear-gradient(left,  @color 0%, @color-dark 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left,  @color 0%, @color-dark 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right,  @color 0%, @color-dark 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='@color', endColorstr='@color-dark',GradientType=1 ); /* IE6-9 */

  }

</style>
