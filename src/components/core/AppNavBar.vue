<template>
  <div class="nav-bar">

    <div class="main">
      <div class="fluid-container">

        <!--identity-->
        <div class="identity">
          <img height="30" src="../../../assets/nci-logo-full.svg" alt="National Cancer Institute"/>
        </div>

        <!--search-->
        <div class="search">
          <a>Search</a>
        </div>

        <!--user-->
        <dropdown menu-right>

          <div class="user" data-role="trigger" v-ripple>
            <span>Nathan Birus</span>
            <i class="icons icon-arrow-down"></i>
          </div>

          <template slot="dropdown">
            <li><a role="button"><i class="icon-settings icons icon-margin"></i>User Settings</a></li>
            <li><a role="button"><i class="icon-logout icons icon-margin"></i>Logout</a></li>
          </template>

        </dropdown>

      </div>
    </div>

    <div class="navigation">
      <div class="fluid-container">

        <ul class="nav-items">

          <li>
            <router-link class="nav-item" id="home-navbar" to="/search" tag="a">
              <i class="icons" :class="`icon-${getIcon('/search')}`"></i>
              <span>Home</span>
            </router-link>
          </li>

          <li>
            <router-link class="nav-item" id="style-guide-navbar" to="/dashboard" tag="a">
              <i class="icons" :class="`icon-${getIcon('/dashboard')}`"></i>
              <span>Dashboard</span>
            </router-link>
          </li>

          <li>
            <router-link class="nav-item" to="/style-guide" tag="a">
              <i class="icons" :class="`icon-${getIcon('/style-guide')}`"></i>
              <span>Style Guide</span>
            </router-link>
          </li>

        </ul>
      </div>

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
    },
    methods: {
      getIcon (path) {
        let route = this.$router.options.routes.find(r => r.path === path)
        return route.meta.icon
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .fluid-container {
    padding: 0 @page-padding;
    .max-page-width;
  }

  .nav-bar {
    background-color: @nav-bg-color;
    z-index: 100;

    .main {
      border-bottom: solid thin fadeout(black, 95%);
      padding: 15px 0;

      .fluid-container {
        display: flex;
        align-items: center;
      }

      .identity {
        flex: 1 1 auto;
      }

      .search {
        flex: 0 0 auto;
        color: cornflowerblue;
        font-size: 1.1rem;
        font-weight: bold;
        margin-right: 1rem;
      }

      .user {
        flex: 0 0 auto;

        display: flex;
        align-items: center;

        padding: .2rem .4rem;
        cursor: default;

        span {
          font-size: 1.1rem;
          margin-right: .5rem;
        }

        i {
          font-size: .7rem;
        }
      }
    }

    .navigation {
      border-bottom: solid thin fadeout(black, 90%);
      padding: 10px 0;

      .nav-items {
        display: flex;

        li {
          padding: 0 .5rem;
          margin: 0 .5rem;

          a {
            font-size: 1.1rem;
            text-decoration: none;
            color: @grey7;

            display: flex;
            align-items: center;

            i {
              margin-right: .5rem;
            }

            &.is-active {
              color: @c-first;
            }

            &:hover {
              color: @grey9;
            }

            &:focus {
              .default-focus;
            }
          }

          &:first-child {
            padding-left: 0;
            margin-left: 0;
          }
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
        flex: 0 0 auto; height: 100%;
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
