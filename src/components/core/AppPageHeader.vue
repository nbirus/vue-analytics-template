<template>
  <header class="header">
    <div class="page-header-content">

      <!-- title -->
      <div class="page-title-container">
        <div class="icon">
          <transition name="page-header-icon" mode="out-in" appear>
            <i class="icons" :class="'icon-' + $route.meta.icon" :key="$route.meta.icon"></i>
          </transition>
        </div>

        <transition name="page-header" mode="out-in" appear>
          <h2 :key="$route.name">{{$route.meta.pageHeaderName}}</h2>
        </transition>
      </div>

      <!-- actions -->
      <div class="page-actions">
        <slot name="page-actions"/>
      </div>

    </div>

    <div class="page-header-body">
      <slot name="header-body"/>
    </div>

  </header>
</template>

<script>
  export default {
    name: 'app-header'
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../styles/app-helper.less';

  .header {
    width: 100%;
    top: 0;
    padding: 1.5rem 0 1rem .5rem; margin: 0;

    background-color: @page-header-color;
    border-bottom: solid 1px darken(@page-header-color, 5%);
    overflow: hidden;

    .page-header-content {
      width: 100%; height: 100%;
      .max-page-width;

      display: flex;
      padding: 0 @page-padding;

      .page-title-container {
        flex: 0 0 auto;
        height: 100%;

        padding: 0; margin: 0;

        display: flex;


        .icon {
          margin-right: 1rem;
          padding: 3px 0 0;
          color: @c-inverse;

          font-size: 1.8rem;
          height: 100%;

          i {
            display: inline-block;
          }
        }

        h2 {
          color: @c-inverse;
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
        flex: 0 1 100%;

        display: flex;
        align-items: center;
        justify-content: flex-end;

        & > div {
          display: flex;
        }
      }
    }

  }


</style>
