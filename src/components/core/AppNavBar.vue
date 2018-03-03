<template>
  <div class="nav-bar">

    <div class="fluid-container">

      <div class="identity">

      </div>

      <div class="nav-items">
        <router-link id="home-navbar" to="/home" tag="a">Home</router-link>
        <router-link id="home-navbar" to="/search" tag="a">Search</router-link>
        <router-link id="home-navbar" to="/style-guide" tag="a">Style Guide</router-link>
      </div>

      <div class="user">
        <span class="username-text">Nathan Birus</span>
        <i class="fa fa-caret-down"></i>
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
    .vertical-gradient(@nav-bg-color, darken(@nav-bg-color, 3%));

    .fluid-container {
      .max-page-width;

      display: flex;
      padding: 0 25px;

      .identity {
        flex: 0 0 200px; height: @nav-header-height;

        background-color: lighten(@c-inverse, 5%);
      }

      .nav-items {
        flex: 0 1 100%;
        padding: 0 10px;

        line-height: @nav-header-height;
        vertical-align: middle;

        a {
          margin: 0 15px;
          font-size: 11pt;
          .f-b;

          color: fadeout(white, 35%);
          cursor: pointer;
          text-decoration: none;

          &.is-active {
            color: white;
            cursor: default;
          }

          &:hover {
            color: white;
          }
        }
      }

      .user {
        flex: 0 0 auto; height: @nav-header-height;
        // background: lighten(@c-inverse, 5%);
        padding: 0 15px;

        display: flex;
        align-items: center;
        color: lighten(@nav-bg-color, 65%);
        font-size: 11pt;

        cursor: pointer;

        i {
          font-size: 9pt;
          margin-left: 10px;
        }

        &:hover {
          background-color: lighten(@c-inverse, 8%);
        }
      }
    }
  }

</style>
