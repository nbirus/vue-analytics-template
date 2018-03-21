<template>
  <button
    class="btn" :class="classConstructor"
    :id="id"
    :name="name"
    :disabled="disabled"
    v-ripple="rippleColor"
    @click="onClick"
  >
    <slot></slot>
  </button>

</template>

<script>

  export default {
      name: 'btn',
      props: {

        onClick: {
          type: Function,
          required: false,
          default: () => {}
        },

        // common
        id: {
          type: String,
          default: null
        },
        name: {
          type: String,
          default: null
        },

        // action
        disabled: {
          type: Boolean,
          default: false
        },

        // style
        theme: {
          default: false
        },
        block: {
          type: Boolean,
          default: false
        },
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
        flatIcon: {
          type: Boolean,
          default: false
        },
        rounded: {
          type: Boolean,
          default: false
        },
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
            (this.flatIcon) ? 'btn-flat-icon' : null,
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

  @import (reference) '../../styles/component-helper.less';

  // ------------- default -------------
  .btn {
    height: @btn-height;
    padding: 0 15px;

    border: solid thin @grey4;
    .vertical-gradient(white, @grey2);

    color: fadeout(@grey9, 20%);
    font-size: 11pt;
    .f-b;

    cursor: pointer;

    &:hover {
      color: @grey9;
      border-color: darken(@grey4, 5%);
    }

    &:active {
      .box-shadow(inset 0px 1px 3px 1px fadeout(@grey7, 65%))
    }

    &:focus {
      // outline: 0 0 0 1px @btn-focus-color;
    }

    &:hover, &:focus { outline: none; }
  }

  // ------------- icon -------------
  .btn.btn-icon {
    width: @btn-height;
    line-height: @btn-height;
    font-size: 11pt;

    &.btn-large {
      width: @btn-height-lg;
      line-height: @btn-height-lg;
      font-size: 12pt;
    }

    &.btn-small {
      width: @btn-height-sm;
      line-height: @btn-height-sm;
      font-size: 8pt;
    }

    border-radius: 50%;
    padding: 0;

    text-align: center;
    vertical-align: middle;

    &:focus {
      // outline: none!important;
      // .box-shadow(0 0 0 1px @btn-focus-color);
    }
  }

  // ------------- block -------------
  .btn.btn-block {
    width: 100%;
  }

  // ------------- small -------------
  .btn.btn-small {
    height: @btn-height-sm!important;
  }

  // ------------- large -------------
  .btn.btn-large {
    height: @btn-height-lg!important;
  }

  // ------------- large -------------
  .btn.btn-flat-icon {
    background: none!important;
    background-color: transparent!important;
    border: none!important;
    color: @grey8!important;

    width: @btn-height;
    padding: 0;
  }

  // ------------- rounded -------------
  .btn.btn-rounded {
    border-radius: @btn-height;

    &.btn-large {
      border-radius: @btn-height-lg;
    }

    &.btn-small {
      border-radius: @btn-height-sm;
    }

  }

  // ------------- generator theme classes -------------
  @scope: {
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
            color: @grey9!important;
          }
        }
      }

    });
  };
  @scope();

  // ------------- helpers -------------
  .btn-shadow(@color) {
    &:active {
      .box-shadow(inset 0px 1px 3px 1px fadeout(@color, 65%))
    }
  }

</style>
