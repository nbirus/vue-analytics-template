<template>
  <header class="header">

    <!--identity-->
    <div class="identity">
      <img height="30" src="../../../assets/nci-logo-full-blue.png" alt="National Cancer Institute"/>
    </div>

    <div class="actions" v-if="isAuthenticated">
      <!--search-->
      <!--<div class="search">-->
        <!--<a>-->
          <!--<i class="fa fa-search"></i>-->
          <!--Search-->
        <!--</a>-->
      <!--</div>-->

      <!--user-->
      <dropdown menu-right>

        <div class="user" data-role="trigger" v-ripple>
          <span>{{user}}</span>
          <i class="fa fa-chevron-down"></i>
        </div>

        <template slot="dropdown">
          <li><a role="button"><i class="icon-settings icons icon-margin"></i>User Settings</a></li>
          <li><a role="button" @click="logout"><i class="icon-logout icons icon-margin"></i>Logout</a></li>
        </template>

      </dropdown>

    </div>

  </header>
</template>

<script>
  import { Dropdown } from 'uiv'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app-header',
    components: { Dropdown },
    computed: {
      ...mapGetters({
        user: 'auth/getUser',
        isAuthenticated: 'auth/isAuthenticated'
      })
    },
    methods: {
      logout () {
        this.$store.dispatch('auth/logout')
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .header {
    padding: 0 1.3rem;
    background-color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .box-shadow(0 1px 8px fadeout(black, 95%));
    border-bottom: solid thin @grey3;
    // z-index: 1;

    .identity {
      flex: 0 0 auto;
      margin-top: 4px;
    }

    .actions {
      flex: 0 0 auto;

      display: flex;
      align-items: center;

      .search {
        flex: 0 0 auto;
        color: dodgerblue;
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
  }



</style>
