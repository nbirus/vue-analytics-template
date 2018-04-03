<template>
  <header class="header">
    <div class="page-header-content">

      <div class="page-title-container">
        <div class="icon">
          <transition name="page-header-icon" mode="out-in" >
            <i class="icons" :class="'icon-' + $route.meta.icon" :key="$route.meta.icon"></i>
          </transition>
        </div>

        <transition name="page-header" mode="out-in">
          <h2 :key="pageKey">{{$route.name}}</h2>
        </transition>

      </div>

      <div class="page-actions">
        <!--<text-input placeholder="Search.." style="width: 300px; margin-right: 10px"></text-input>-->
        <!--
        <btn class="settings-btn" large>
          <i class="fa fa-cogs"></i>
          Settings
        </btn> -->
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'app-header',
    computed: {
      pageKey () {
        return this.$route.name
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .settings-btn {
    .vertical-gradient(lighten(@c-light, 10%), transparent)!important;
    border-color: darken(@c-light, 5%)!important;
  }


  .header {
    width: 100%;
    top: 0;
    padding: 1rem 0; margin: 0;

    background-color: lighten(@page-bg-color, 3%);
    border-bottom: solid 2px darken(@page-bg-color, 7%);
    overflow: hidden;

    .page-header-content {
      width: 100%; height: 100%;
      .max-page-width;

      display: flex;
      justify-content: space-between;

      padding: 0 @page-padding;


      // features
      .page-title-container {
        flex: 0 0 auto;
        height: 100%;

        padding: 0; margin: 0;

        display: flex;


        .icon {
          margin-right: 1rem;
          padding: 3px 0 0;

          // background-color: fadeout(black, 96%);
          // border-right: solid 2px fadeout(black, 97%);
          // color: fadeout(black, 75%);
          color: @c-inverse;
          // color: fadeout(black, 5%);

          font-size: 1.8rem;
          height: 100%;

          i {
            display: inline-block;
          }
        }

        h2 {
          color: @c-inverse;
          // color: white;
          font-weight: 100;
          font-size: 1.9rem;

          // if icon exists
          i {
            margin-right: 8px;
            font-size: 1.5rem;
          }
        }

      }

      .page-actions {
        flex: 0 0 auto;

        display: flex;
        align-items: center;
      }
    }



  }


</style>
