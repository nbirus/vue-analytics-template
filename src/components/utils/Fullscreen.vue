<template>

  <div class="container" :class="expandedClass">

    <transition name="fade" mode="in-out">
      <div class="overlay" v-if="expandActive"></div>
    </transition>

    <div class="child" :class="{'expanded': expandActive}">
      <slot/>
    </div>

  </div>

</template>

<script>

  export default {
    name: 'fullscreen',
    props: {
      onExpand: {
        type: Function,
        default: () => {}
      },
      onCollapse: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        expandActive: false
      }
    },
    computed: {
      expandedClass () {
        return {
          'expanded': this.expandActive
        }
      }
    },
    mounted () {
      window.addEventListener('keydown', this.onEscape)
    },
    methods: {

      expand () {
        this.expandActive = true
        this.onExpand()

        // add body class
        document.body.classList.add('modal-open')

      },
      collapse () {
        this.expandActive = false
        this.onCollapse()

        // remove body class
        document.body.classList.remove('modal-open')
      },

      onEscape (e) {
        e = e || window.event
        if (e.keyCode === 27) {
          this.collapse()
        }
      }
    },
    beforeDestroy () {
      document.removeEventListener('keydown', this.onEscape, false)
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
      background-color: fadeout(black, 83%);
      z-index: 1;
    }

    .child {
      width: 100%; height: 100%;
    }

    &.expanded {
      z-index: 1060;

      .child {
        animation: expand .6s cubic-bezier(1,.05,.11,.99);

        &.expanded {
          position: fixed;
          top: 3rem; left: 3rem;
          z-index: 2;
          width: calc(~'100% - 6rem'); height: calc(~'100% - 6rem');
        }

      }
    }
  }

  @keyframes expand {

    0% {
      position: relative;
      // transform: rotateY(0);
      transform: scale(1);

      opacity: 1;
    }
    40% {
      // transform: rotateY(180deg);
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
      position: fixed;
      top: 4rem; left: 4rem;
      width: calc(~'100% - 8rem'); height: calc(~'100% - 8rem');
    }
    60% {
      transform: scale(.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

</style>
