<template>
  <div class="nav-bar">

    <div class="fluid-container">

      <div class="identity">
        <!-- <img src="../../assets/strap-logo.png" height="20" width="20" /> -->
        <span class="identity-text">strap</span>
      </div>

      <div class="nav-items">
        <!-- <router-link class="nav-item" id="home-navbar" to="/home" tag="a">Home</router-link> -->
        <router-link class="nav-item" id="style-guide-navbar" to="/search" tag="a">Trials</router-link>
        <router-link class="nav-item" to="/org" tag="a">Organizations</router-link>
        <router-link class="nav-item" to="/Persons" tag="a">Persons</router-link>
        <!-- <router-link class="nav-item" id="search-navbar" to="/style-guide" tag="a">Data Table 4 Reports</router-link> -->

      </div>

      <div class="search">
        <i class="icon-magnifier icons"></i>
        <input class="search-input" placeholder="Search.."/>

        <dropdown menu-right>

          <div class="temp-dropdown" v-ripple>
            {{searchEntity}}
            <i class="icons icon-arrow-down"></i>
          </div>

          <template slot="dropdown">
            <li @click="searchEntity = 'Trials'"><a role="button">Trials</a></li>
            <li @click="searchEntity = 'Persons'"><a role="button">Persons</a></li>
            <li @click="searchEntity = 'Organizations'"><a role="button">Organizations</a></li>
          </template>

        </dropdown>

      </div>


      <dropdown menu-right>

        <div class="user" v-ripple>
          <i class="icons icon-user"></i>
          <i class="icons icon-arrow-down"></i>
        </div>

        <template slot="dropdown">
          <li class="user-id">Nathan Birus</li>
          <li><a role="button"><i class="icon-settings icons icon-margin"></i>User Settings</a></li>
          <li><a role="button"><i class="icon-logout icons icon-margin"></i>Logout</a></li>
        </template>

      </dropdown>

      <!-- <div class="logout" v-ripple>
        <i class="icon-logout icons"></i>
        Logout
      </div> -->

    </div>

  </div>
</template>

<script>
  import { Dropdown } from 'uiv'

  export default {
    name: 'navbar',
    components: { Dropdown },
    data () {
      return {
        searchEntity: 'Trials'
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/component-helper.less';

  .nav-bar {
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
          font-size: 17pt;
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
          text-decoration: none;

          cursor: pointer;

          &.is-active {
            color: white;
            cursor: default;
            &:hover { color: white; }
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

        .icon-magnifier {
          color: white;
          font-size: 11pt;
          font-weight: 100;
          position: absolute;
          margin-left: 12px;
          margin-top: 1px;
        }

        .search-input {
          width: 200px; height: 35px;
          padding: 1px 0 0 40px;
          border-radius: 5px 0 0 5px;

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

        .temp-dropdown {
          height: 35px;
          .vertical-gradient(lighten(@nav-bg-color, 5%), @nav-bg-color);
          border: solid thin darken(@nav-bg-color, 5%);
          color: fadeout(white, 10%);
          line-height: 35px;
          vertical-align: middle;
          padding: 0 8px;
          font-size: 10pt;
          margin-left: 0;

          border-radius: 0 5px 5px 0;

          cursor: pointer;

          .icon-arrow-down {
            font-size: 5pt;
          }

          &:hover {
            background: none;
            background-color: lighten(@nav-bg-color, 5%);
          }
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

        .icon-arrow-down {
          font-size: 5pt;
          margin: 0 0 0 5px;
        }

        &:hover {
          background-color: darken(@nav-bg-color, 1%);
        }

        &:active {
          background-color: darken(@nav-bg-color, 5%);
        }
      }

      .user-id {
        margin: 5px 20px;
        .f-b;
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
