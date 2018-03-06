<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">
        <div class="page-title-container">
          <h2>Home</h2>
        </div>
      </div>


    </div>

    <div class="page-body">
      <div class="panel panel-1">

        <div class="panel-body">

        </div>

        <div class="panel-footer">
          Trials by Primary Purpose
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="less" scoped>

  @import '../../static/styles/component-helper.less';

  .panel-1 {
    width: 400px; height: 300px;

    .panel-footer {
      // background-color: @grey1;
      color: @c-inverse;
      font-size: 11pt;
    }
  }


</style>
