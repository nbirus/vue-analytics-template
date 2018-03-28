<template>
  <header class="header">
    <div class="page-header-content">

      <div class="page-title-container">
        <div class="icon">
          <i class="icons icon-grid"></i>
        </div>

        <transition name="page-header" mode="out-in" >
          <h2 :key="$route.fullPath">{{$route.name}}</h2>
        </transition>

      </div>

      <div class="page-actions">

      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'base-header'
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/component-helper.less';

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
          margin-right: 8px;
          padding: 3px 8px 0 0;

          // background-color: fadeout(black, 96%);
          border-right: solid 1px fadeout(black, 90%);
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
