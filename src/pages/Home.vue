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
        console.log('test')
      }
    }
  }
</script>

<style lang="less" scoped>

  .test-panel {
    width: auto; height: auto;
    // padding: @pad;
  }

</style>
