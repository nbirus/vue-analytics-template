<template>
  <button
    class="btn" :class="classConstructor"
    :id="id"
    :name="name"
    :disabled="disabled"
    v-ripple="rippleColor"
    @click="$emit('onClick')"
  >
    <slot></slot>
  </button>

</template>

<script>
  /**
   * Common button
   *
   * @example @/../docs/Btn.md
   */
  export default {
    name: 'Button',
    props: {
      id: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      /**
      * The color for the button
      */
      theme: {
        default: false
      },
      /**
      * If the button takes up all horizontal space
      */
      block: {
        type: Boolean,
        default: false
      },
      /**
      * Will turn the button into a circle, use when the button only contains an icon
      */
      icon: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      },
      /**
      * Gets rid of background color and border
      */
      flat: {
        type: Boolean,
        default: false
      },
      /**
      * Rounds the edges
      */
      rounded: {
        type: Boolean,
        default: false
      },
      /**
      * If the button will ripple on click
      */
      ripple: {
        type: Boolean,
        default: true
      }
    },
    computed: {

      // build class to be applyed to the button
      classConstructor () {
        return [
          (this.theme) ? 'btn-' + this.theme : null,
          (this.icon) ? 'btn-icon' : null,
          (this.block) ? 'btn-block' : null,
          (this.flat) ? 'btn-flat-icon' : null,
          (this.small) ? 'btn-small' : null,
          (this.large) ? 'btn-large' : null,
          (this.rounded) ? 'btn-rounded' : null
        ]
      },

      rippleColor () {
        return (this.ripple) ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)'
      }
    }
  }

</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';
  @import (reference) '../../styles/theme-generator.less';

  // ------------- default -------------
  .btn {
    font-size: @btn-font-size;
    padding: .5em 1em;

    border: solid @btn-border-weight @grey4;
    border-radius: @btn-border-radius;

    .vertical-gradient(white, @grey2);

    color: fadeout(@grey9, 20%);
    font-weight: @btn-font-weight;

    cursor: pointer;

    &:hover {
      color: @grey9;
      border-color: darken(@grey4, 5%);
    }

    &:active {
      .box-shadow(inset 0px 1px 3px 1px fadeout(black, 90%))
    }

    &:focus {
      // outline: 0 0 0 1px @btn-focus-color;
    }

    &:hover, &:focus { outline: none; }

    i {
      margin-right: .2em;
    }
  }

  // ------------- icon -------------
  .btn.btn-icon {
    line-height: 1em;

    border-radius: 50%;
    padding: .6em .6em;

    text-align: center;
    vertical-align: middle;
  }

  // ------------- block -------------
  .btn.btn-block {
    width: 100%;
  }

  // ------------- small -------------
  .btn.btn-small {
    font-size: .8em!important;
  }

  // ------------- large -------------
  .btn.btn-large {
    font-size: 1.1em;
  }

  // ------------- large -------------
  .btn.btn-flat-icon {
    background: none!important;
    background-color: transparent!important;
    border: none!important;
    color: @grey8!important;

    height: 2.4em; width: 2.4em;
    padding: 0;

    // padding: .6em .8em;
  }

  // ------------- rounded -------------
  .btn.btn-rounded {
    border-radius: 2em;
  }

  // ------------- generator theme classes -------------
  @btn-scope: {
    .generateThemeClasses({

      .btn.btn-@{name} {
        color: fadeout(white, 15%);
        background-color: @color;
        border-color: @color-dark;
        .vertical-gradient(@color, darken(@color, 6%));

        .btn-shadow(@color-dark);

        &:hover {
          color: white;
          border-color: darken(@color, 5%)!important;
        }

        &.btn-flat-icon {
          &:hover {
            background-color: fadeout(black, 97%)!important;
            color: @color!important;
          }
        }
      }

    });
  };
  @btn-scope();

  // ------------- helpers -------------
  .btn-shadow(@color) {
    &:active {
      .box-shadow(inset 0px 1px 3px 1px fadeout(@color, 65%))
    }
  }

  // ------------- edge cases -------------

</style>
