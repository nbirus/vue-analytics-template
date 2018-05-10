<template>
  <div class="nav-bar">

    <div class="main">
      <div class="fluid-container">

        <!--identity-->
        <div class="identity">
          <img height="32" src="../../../assets/nci-logo-full-blue.png" alt="National Cancer Institute"/>
        </div>

        <!--search-->
        <div class="search">
          <a>
            <i class="fa fa-search"></i>
            Search
          </a>
        </div>

        <!--user-->
        <dropdown menu-right>

          <div class="user" data-role="trigger" v-ripple>
            <span>Nathan Birus</span>
            <i class="fa fa-chevron-down"></i>
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

          <li
            v-for="route in $router.options.routes" :key="route.name"
            v-if="route.meta.navBarLink"
          >

            <router-link
              class="nav-item"
              :id="`${route.name}-navbar`"
              :to="`/${route.name}`"
              tag="a"
            >
              <i class="icons" :class="`icon-${route.meta.icon}`"></i>
              <span>{{route.meta.pageHeaderName}}</span>
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
    border-bottom: solid thin @grey3;

    .main {
      padding: 15px 0;

      .fluid-container {
        display: flex;
        align-items: center;
      }

      .identity {
        flex: 1 1 auto;
        margin-left: -2px;
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
          font-size: .6rem;
        }
      }
    }

    .navigation {
      padding: 0 0 10px ;

      .nav-items {
        display: flex;

        li {
          padding: 0 .5rem;
          margin: 0 .5rem;

          a {
            font-size: 1.1rem;
            text-decoration: none;
            color: @grey8;

            display: flex;
            align-items: center;

            i {
              margin-right: .5rem;
            }

            &.is-active {
              color: @c-first;

              &:hover {
                color: @c-first;
              }

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

  }

</style>
