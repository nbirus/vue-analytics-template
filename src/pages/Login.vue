<template>
  <div class="page">

    <div class="page-body">

      <div class="panel login-panel">

        <div class="panel-header">
          <h2>Login</h2>
        </div>

        <div class="panel-body">
          <div class="panel-section">
            <text-input :required="true" style="margin-bottom: 15px" label="Username" placeholder="Enter username or email.."></text-input>
            <text-input :required="true" style="margin-bottom: 15px" label="Password" placeholder="Enter password.."></text-input>
            <btn @click="login" theme="lime" block>Login</btn>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'login',
    methods: {
      login () {

      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../styles/component-helper.less';

  .page {
    margin-top: -@nav-header-height;

    .login-panel {
      width: 300px;
      margin: 0 auto;

    }
  }


</style>
