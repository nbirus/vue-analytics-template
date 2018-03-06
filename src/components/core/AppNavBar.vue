<template>
  <div class="nav-bar">

    <div class="search-container" :class="{'active': searchOpen}">
      <input placeholder="Search on anything..."/>
      <div class="close" @click="searchOpen = false">
        <i class="fa fa-times"></i>
      </div>
    </div>

    <div class="fluid-container">

      <div class="identity">
        <img src="../../assets/strap-logo.png" alt="Paris">
        ctrp
      </div>

      <div class="nav-items">
        <router-link id="home-navbar" to="/home" tag="a">Home</router-link>
        <router-link id="home-navbar" to="/search" tag="a">Search</router-link>
        <router-link id="home-navbar" to="/style-guide" tag="a">Style Guide</router-link>
      </div>

      <div class="search" @click="searchOpen = true">
        <i class="fa fa-search"></i>
      </div>

      <div class="user">
        <!-- <span class="username-text">Nathan Birus</span> -->
        <i class="fa fa-sign-out-alt"></i>
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

  @import '../../styles/component-helper.less';

  .nav-bar {
    // .vertical-gradient(@nav-bg-color, darken(@nav-bg-color, 5%));
    background-color: @nav-bg-color;

    .search-container {
      position: fixed;
      width: 100vw; height: @nav-header-height;
      top: -@nav-header-height; left: 0; right: 0;
      z-index: 99;
      background-color: @nav-bg-color;
      padding: 0 25px;

      .max-page-width;

      display: flex;

      .close {
        flex: 0 0 auto;
        padding: 15px;
        color: white;
        cursor: pointer;

      }

      input {
        flex: 0 1 100%;
        height: 100%;
        margin: 0 auto;

        background-color: darken(@nav-bg-color, 5%);
        border: none;
        color: white;

        padding: 0 15px;

        &::placeholder {
          color: white;
        }
      }


      &.active {
        top: 0;
      }

    }

    .fluid-container {
      .max-page-width;

      display: flex;
      padding: 0 18px;

      .identity {
        flex: 0 0 auto; height: @nav-header-height;

        background-color: darken(@c-inverse, 5%);
        font-family: 'Roboto';
        color: white;
        font-size: 20pt;
        padding: 8px 15px;


        font-family: 'Title', sans-serif;
        vertical-align: middle;

        img {
          display: none;
          width: 30px;
        }
      }

      .nav-items {
        flex: 0 1 100%;
        padding: 0 10px;

        line-height: @nav-header-height;
        vertical-align: middle;
        // .f-b;

        a {
          margin: 0 15px;
          font-size: 11pt;

          color: fadeout(white, 55%);
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

      .search {
        flex: 0 0 auto; height: @nav-header-height;
        // background: darken(@c-inverse, 3%);
        padding: 0 25px;

        display: flex;
        align-items: center;
        color: white;
        font-size: 11pt;
        font-weight: 100;

        cursor: pointer;
      }

      .user {
        flex: 0 0 auto; height: @nav-header-height;
        background: darken(@c-inverse, 5%);
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
          background-color: darken(@c-inverse, 3%);
        }

        &:active {
          background-color: darken(@c-inverse, 5%);
        }
      }
    }
  }

</style>
