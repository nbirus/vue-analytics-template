<template>
  <div class="nav-bar">

    <div class="fluid-container">

      <div class="identity">
        <span class="identity-text">analytics</span>
      </div>

      <div class="nav-items">
        <router-link class="nav-item" id="home-navbar" to="/search" tag="a">Home</router-link>
        <router-link class="nav-item" id="style-guide-navbar" to="/dashboard" tag="a">Dashboard</router-link>
        <router-link class="nav-item" to="/style-guide" tag="a">Style Guide</router-link>
      </div>

      <!--<div class="search">-->
        <!--<i class="icon-magnifier icons"></i>-->
        <!--<input class="search-input" placeholder="Search.."/>-->

        <!--<dropdown menu-right>-->

          <!--<div class="temp-dropdown" v-ripple>-->
            <!--{{searchEntity}}-->
            <!--<i class="icons icon-arrow-down"></i>-->
          <!--</div>-->

          <!--<template slot="dropdown">-->
            <!--<li @click="searchEntity = 'Trials'"><a role="button">Trials</a></li>-->
            <!--<li @click="searchEntity = 'Persons'"><a role="button">Persons</a></li>-->
            <!--<li @click="searchEntity = 'Organizations'"><a role="button">Organizations</a></li>-->
          <!--</template>-->

        <!--</dropdown>-->

      <!--</div>-->


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

  @import (reference) '../../styles/app-helper.less';

  // @nav-bar-width: 200px;

  .nav-bar {
    background-color: @nav-bg-color;
    border-top: solid 2px @c-first;
    z-index: 100;

    .fluid-container {
      height: calc(@nav-height - 2px);

      display: flex;
      padding: 0 @page-padding;
      .max-page-width;
      background-color: @nav-bg-color;

      .identity {
        font-size: 1.7rem;

        flex: 0 0 auto; height: 100%;
        padding: 3px .5em;

        // .vertical-gradient(lighten(@nav-bg-color, 1%), darken(@nav-bg-color, 2%));
        // .vertical-gradient(lighten(@c-cyan, 1%), darken(@c-cyan, 2%));
        background-color: lighten(@nav-bg-color, 5%);

        line-height: @nav-height;
        vertical-align: middle;

        .identity-text {
          font-family: 'Title', sans-serif;
          display: block;
          color: white;
          margin-top: -3px;
        }
      }

      .nav-items {
        flex: 0 1 100%;
        padding: 0 1rem;

        display: flex;

        .nav-item {
          font-size: 1.1rem;

          flex: 0 0 auto;
          line-height: @nav-height;
          vertical-align: middle;

          margin: 0; padding: 0 1em;

          font-weight: @bold;
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
        flex: 0 0 auto; height: @nav-height;
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
          border-top: solid 3px @c-cyan;
          background-color: darken(@nav-bg-color, 5%);
        }
      }

      .user {
        flex: 0 0 auto; height: @nav-height;
        padding: 0 1rem;

        display: flex;
        align-items: center;
        color: white;

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
        flex: 0 0 auto; height: @nav-height;
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

    &.sidebar > .fluid-container {
      flex-direction: column;
      max-width: inherit;
      width: 200px;
      padding: 0;

      .identity {
        width: 100%; height: auto;
        flex: 0 0 auto;
        padding: .57rem 1rem;

        border-top: solid 3px @c-cyan;
      }

      .nav-items {
        flex: 0 1 100%;
        flex-direction: column;
      }

      .user {
        flex: 0 0 auto; height: @nav-height;
        display: none;
      }

      .user-id {
        margin: 5px 20px;
        .f-b;
      }

      .logout {
        flex: 0 0 auto; height: @nav-height;
      }
    }

  }

</style>
