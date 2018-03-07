<template>
  <div class="nav-bar">

    <div class="search-container" :class="{'active': searchOpen}">

      <div class="search-input-wrapper">

        <input class="search-input" placeholder="Search on anything..."/>

        <div class="close" @click="searchOpen = false">
          <i class="icons icon-close"></i>
        </div>
      </div>

    </div>

    <div class="fluid-container">

      <div class="identity">
        <span class="identity-text">analytics</span>
      </div>

      <div class="nav-items">
        <router-link class="nav-item" id="home-navbar" to="/home" tag="a"><i class="icon-home icons"></i>Home</router-link>
        <router-link class="nav-item" id="search-navbar" to="/search" tag="a"><i class="icon-magnifier icons"></i>Search</router-link>
        <router-link class="nav-item" id="style-guide-navbar" to="/style-guide" tag="a"><i class="icon-screen-desktop icons"></i>Style Guide</router-link>
      </div>

      <div class="search">
        <!-- <i class="fa fa-search"></i> -->
        <i class="icon-magnifier icons"></i>
        <input class="search-input" placeholder="Search on anything.."/>
      </div>

      <div class="user" v-ripple>
        <!-- <span class="username-text">Nathan Birus</span> -->
        <!-- <i class="fa fa-sign-out-alt"></i> -->
        <!-- <i class="icon-user icons"></i> -->
        <i class="icon-logout icons"></i>
        Logout

      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        searchOpen: false
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../static/styles/component-helper.less';

  .nav-bar {
    // .vertical-gradient(@nav-bg-color, darken(@nav-bg-color, 10%));
    background-color: @nav-bg-color;

    .search-container {
      position: absolute;
      width: 100vw; height: auto;
      top: calc((@nav-header-height - 10px) * -1); left: 0; right: 0;
      transition: @transition;
      padding: 5px 105px 10px 0;
      .max-page-width;
      text-align: right;
      z-index: -1;

      .search-input-wrapper {
        width: 100%; height: auto;
        max-width: 600px;
        display: inline-block;
        background-color: darken(@nav-bg-color, 5%);
        padding: 5px;

        .search-input {
          width: 100%; height: 40px;
          background-color: lighten(@nav-bg-color, 85%);
          border: none;
          // color: white;

          padding: 0 15px;

          &::placeholder {
            // color: white;
          }
        }

        .close {
          flex: 0 0 auto;
          padding: 15px;
          color: white;
          cursor: pointer;
          display: none;

        }
      }

      &.active {
        top: @nav-header-height;
      }

    }

    .fluid-container {
      display: flex;
      padding: 0 18px;
      .max-page-width;
      background-color: @nav-bg-color;

      .identity {
        flex: 0 0 auto; height: @nav-header-height;
        padding: 0 15px;
        background-color: darken(@nav-bg-color, 5%);
        border-top: solid 3px @c-first;

        line-height: @nav-header-height;
        vertical-align: middle;


        .identity-text {
          font-family: 'Title', sans-serif;
          display: block;
          color: white;
          font-size: 16pt;
          margin-top: -3px;
        }
      }

      .nav-items {
        flex: 0 1 100%;
        padding: 0 20px;

        display: flex;

        .nav-item {
          flex:  0 0 auto;
          line-height: @nav-header-height;
          vertical-align: middle;
          // transition: @transition;

          margin: 0; padding: 0 15px;
          font-size: 11pt;

          color: fadeout(white, 55%);
          cursor: pointer !important;
          text-decoration: none;

          .icons {
            font-size: 8pt;
            margin-right: 5px;
            display: none;
          }

          &:active {
            background-color: darken(@nav-bg-color, 5%);
          }

          &.is-active {
            color: white;
            cursor: default;
            // background-color: darken(@nav-bg-color, 2%);
            // text-decoration: underline;
            &:hover {
              color: white;
            }
          }

          &:hover {
            color: fadeout(white, 25%);
          }
        }
      }

      .search {
        flex: 0 0 auto; height: @nav-header-height;
        padding: 0 10px 0 25px;

        display: flex;
        align-items: center;

        .search-input {
          width: 200px; height: 35px;
          background-color: darken(@nav-bg-color, 5%);
          border: none;
          color: fadeout(white, 25%);
          transition: width .04s ease-in-out;

          padding: 1px 0 0 40px;
          border-radius: 5px;

          &::placeholder {
            color: fadeout(white, 25%);
          }

          &:focus {
            width: 500px;
            max-width: 500px;
            outline: 0;
            background-color: darken(@nav-bg-color, 10%);
            color: white;
            .box-shadow(@input-focus-shadow);

            &::placeholder {
              color: white;
            }
          }
        }

        .icon-magnifier {
          color: white;
          font-size: 11pt;
          font-weight: 100;
          position: absolute;
          margin-left: 12px;
          margin-top: 1px;
        }

        &.active {
          border-top: solid 3px @c-first;
          background-color: darken(@nav-bg-color, 5%);
        }
      }

      .user {
        flex: 0 0 auto; height: @nav-header-height;
        // background: darken(@nav-bg-color, 3%);
        padding: 0 15px;

        display: flex;
        align-items: center;
        color: white;
        font-size: 11pt;

        cursor: pointer;

        i {
          font-size: 9pt;
          margin-right: 8px;
        }

        &:hover {
          background-color: darken(@nav-bg-color, 1%);
        }

        &:active {
          background-color: darken(@nav-bg-color, 5%);
        }
      }
    }
  }

</style>
