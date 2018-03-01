<template>
  <div class="page">

    <div class="page-header bg-fifth">

    </div>

    <div class="page-body">

      <div class="panel test-panel">
        <h2>Test Panel</h2>
        <br />


        <btn>TEST</btn>
        <btn theme="blue">TEST</btn>
        <btn theme="fifth">TEST</btn>


        <!-- <touch-ripple class="btn">Test Button</touch-ripple>
        <touch-ripple class="btn btn-primary">Primary</touch-ripple>
        <touch-ripple class="btn btn-secondary">Secondary</touch-ripple>
        <touch-ripple class="btn btn-third">Third</touch-ripple>
        <touch-ripple class="btn btn-fourth">Fourth</touch-ripple>
        <touch-ripple class="btn btn-fifth">Fifth</touch-ripple> -->

      </div>
    </div>

  </div>
</template>

<script>
  import Btn from '@/components/common/Btn'
  export default {
    components: {
      Btn
    },
    methods: {
      alert () {
        alert('test')
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../styles/config.less';

  .test-panel {
    width: auto; height: auto;
    padding: @pad;
  }

</style>
