<template>
  <div class="nav-bar">

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
        <i class="icon-magnifier icons"></i>
        <input class="search-input" placeholder="Search on anything.."/>
      </div>


      <dropdown menu-right>

        <div class="user" v-ripple>
          <i class="icons icon-user"></i>
          <i class="icons icon-arrow-down" style="font-size: 5pt; margin: 0 0 0 5px"></i>
        </div>

        <template slot="dropdown">
          <li>Nathan Birus</li>
          <li><a role="button">User Settings</a></li>
        </template>

      </dropdown>

      <div class="logout" v-ripple>
        <i class="icon-logout icons"></i>
        Logout
      </div>

    </div>

  </div>
</template>

<script>
  import { Dropdown } from 'uiv'

  export default {
    name: 'navbar',
    components: { Dropdown }
  }
</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  .nav-bar {
    // .vertical-gradient(@nav-bg-color, darken(@nav-bg-color, 10%));
    background-color: @nav-bg-color;

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

          margin: 0; padding: 0 15px;
          font-size: 11pt;
          .f-b;

          color: fadeout(white, 55%);
          cursor: pointer !important;
          text-decoration: none;

          .icons {
            font-size: 8pt;
            margin-right: 5px;
            display: none;
          }

          &.is-active {
            color: white;
            cursor: default;
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
          padding: 1px 0 0 40px;
          border-radius: 5px;

          color: fadeout(white, 25%);
          font-size: 11pt;

          background-color: darken(@nav-bg-color, 5%);
          border: none;

          transition: width .04s ease-in-out;

          &::placeholder {
            color: fadeout(white, 35%);
          }

          &:focus {
            width: 500px;
            max-width: 500px;
            outline: 0;
            background-color: darken(@nav-bg-color, 10%);
            color: white;
            .box-shadow(@input-focus-shadow);
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
        padding: 0 15px;

        display: flex;
        align-items: center;
        color: white;
        font-size: 11pt;

        cursor: pointer;

        &:hover {
          background-color: darken(@nav-bg-color, 1%);
        }

        &:active {
          background-color: darken(@nav-bg-color, 5%);
        }
      }

      .logout {
        flex: 0 0 auto; height: @nav-header-height;
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
