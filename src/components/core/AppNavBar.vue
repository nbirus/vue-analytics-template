<template>
  <div class="nav-bar">

    <div class="fluid-container">

      <div class="identity">

      </div>

      <div class="links">
        <a>Home</a>
        <a>Dashboards</a>
        <a class="active">Style Guide</a>
        <a>Search</a>
      </div>

      <div class="user">

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'navbar'
  }
</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';


  .nav-bar {
    // background-color: @nav-bg-color;
    .vertical-gradient(@nav-bg-color, darken(@nav-bg-color, 7%));

    .fluid-container {
      .max-page-width;

      display: flex;
      padding: 0 35px;

      .identity {
        flex: 0 0 200px; height: @nav-header-height;

        background-color: lighten(@c-inverse, 5%);
      }

      .links {
        flex: 0 1 100%;
        padding: 0 10px;

        line-height: @nav-header-height;
        vertical-align: middle;

        a {
          color: fadeout(white, 35%);
          margin: 0 15px;
          cursor: pointer;
          font-size: 11pt;
          .f-b;

          &.active {
            color: white;
            cursor: default;
          }

          &:hover {
            color: white;
          }
        }
      }

      .user {
        flex: 0 0 @nav-header-height; height: @nav-header-height;

        background: lighten(@c-inverse, 5%);
      }
    }
  }

</style>
