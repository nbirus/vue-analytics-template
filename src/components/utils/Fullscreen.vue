<template>

  <div class="container" :class="expandedClass">

    <div class="overlay" v-if="isExpanded"></div>

    <!-- <transition name="expand"> -->
    <div class="child">
      <slot
        class="slot"
        :_expand="onExpand"
        :_collapse="onCollapse"
      />
    </div>
    <!-- </transition> -->


  </div>

</template>

<script>

  export default {
    name: 'fullscreen',
    data () {
      return {
        isExpanded: false,
        test: 'test'
      }
    },
    computed: {
      expandedClass () {
        return {
          'expanded': this.isExpanded
        }
      }
    },
    methods: {
      onExpand () {
        this.isExpanded = true
      },
      onCollapse () {
        this.isExpanded = false
      }
    }
  }

</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .container {
    width: 100%; height: 100%;

    .overlay {
      position: fixed;
      top: 0; right: 0; bottom: 0; left: 0;
      background-color: fadeout(black, 80%);
      padding: 2rem;
    }

    .child {
      width: 100%; height: 100%;
      // transition: all 1s;
    }

    &.expanded {
      z-index: 1060;
      // animation: expand 1s;

      .child {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: 1061;

        padding: 2rem;
      }
    }
  }

</style>
