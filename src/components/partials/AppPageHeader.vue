<template>
  <div class="header" :class="[{'has-tabs': hasTabs}, `${layout}-layout`]">
    <div class="page-header-content">

      <!-- title -->
      <div class="page-title-container">
        <h2 class="title">{{title}}</h2>
        <h4 class="sub-title">{{subTitle}}</h4>
      </div>

      <!-- actions -->
      <div class="page-actions" v-if="this.$slots['page-actions']">
        <slot name="page-actions"/>
      </div>

    </div>

    <div class="page-header-body">
      <slot name="header-body"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'app-header',
    props: {
      title: {
        type: String,
        default () {
          return this.$route.meta.navBarTitle
        }
      },
      subTitle: {
        type: String,
        default: ''
      },
      hasTabs: {
        type: Boolean,
        default: false
      },
      layout: {
        type: String,
        default: 'search'
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../styles/app-helper.less';

  .header {
    width: 100%;
    top: 0;
    padding: 1.2rem 0 1.2rem .5rem; margin: 0;

    background-color: @page-header-color;
    border-bottom: solid 1px darken(@page-header-color, 5%);
    overflow: hidden;

    // main
    .page-header-content {
      width: 100%; height: 100%;
      padding: 0 @page-padding;

      .page-title-container {
        height: 100%;
        padding: 0; margin: 0;

        .title {
          color: @c-inverse;
          font-weight: @bold;
          font-size: 1.6rem;
        }

        .sub-title {
          color: @c-inverse;
          font-size: 1rem;
        }
      }

      .page-actions {
        width: 100%; height: auto;
        padding: 1rem 0 1.3rem;
      }
    }

    // layouts
    &.search-layout {

    }

    &.buttons-layout {
      // padding-top: .5rem;
      // padding-bottom: .5rem;

      .page-header-content {

        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: .5em;
        padding-bottom: .5em;

        .page-title-container {
          flex: 0 0 auto;
        }

        .page-actions {
          flex: 0 1 auto;
          width: auto;
          padding: 0;

          button {
            margin-left: .5rem;
          }
        }
      }
    }

    // if page has tabs
    &.has-tabs {
      padding-bottom: 0;
      border-bottom: 0;
    }

  }


</style>
