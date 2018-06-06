<template>

  <div class="container" :class="expandedClass">

    <transition name="fade" mode="in-out">
      <div class="overlay" v-if="isExpanded"></div>
    </transition>

    <div class="child" :class="childClass">
      <slot
        :_expand="onExpand"
        :_collapse="onCollapse"
      />
    </div>

    <!--<transition-->
      <!--@before-enter="beforeEnter"-->
      <!--@enter="enter"-->
      <!--@after-enter="afterEnter"-->
      <!--@enter-cancelled="enterCancelled"-->

      <!--@before-Leave="beforeLeave"-->
      <!--@leave="leave"-->
      <!--@after-leave="afterLeave"-->
      <!--@leave-cancelled="leaveCancelled"-->
      <!--:css="false">-->

    <!--</transition>-->

    <!--
    methods: {
      enterEl(el, done) {
        //entrance animation
        done();
      },
      leaveEl(el, done) {
        //exit animation
        done();
      },
    }
    -->

  </div>

</template>

<script>

  export default {
    name: 'fullscreen',
    data () {
      return {
        isExpanded: false,
        childClass: 'test'
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

        setTimeout(() => {
          this.childClass = 'test'
        }, 1000)
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
      opacity: 1;
    }

    .child {
      width: 100%; height: 100%;
    }

    &.expanded {
      z-index: 1060;

      .child {
        animation: expand 1s;

        position: fixed;
        top: 4rem; left: 4rem;
        width: calc(~'100% - 8rem'); height: calc(~'100% - 8rem');

      }
    }
  }

  @keyframes expand {
    0% {
      position: relative;
      transform: scale(1);
      opacity: 1;
    }
    30% {
      transform: scale(1.2);
      opacity: 0;
    }
    49% {
      position: relative;
      transform: scale(1.2);

      position: relative;
      width: 100%; height: 100%;
      top: initial; left: initial;
    }
    50% {
      transform: scale(.8);
      opacity: 0;

      position: fixed;
      top: 4rem; left: 4rem;
      width: calc(~'100% - 8rem'); height: calc(~'100% - 8rem');
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

</style>
