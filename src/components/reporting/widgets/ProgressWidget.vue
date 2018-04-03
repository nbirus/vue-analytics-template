<template>
  <div class="panel progress-widget">
    count: {{count}}
    <br />
    target: {{target}}
  </div>
</template>

<script>
  export default {
    name: 'progress-widget',
    props: {
      count: {
        type: Number,
        default: 0
      },
      target: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/app-helper.less';

  .progress-widget {
    height: 100%;
  }

</style>
