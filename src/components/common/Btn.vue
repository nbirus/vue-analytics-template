<template>
  <button

    :id="id"
    :name="name"
    class="btn" :class="classConstructor"

    v-ripple="ripple"
    :disabled="disabled"
  >
    <slot></slot>
  </button>

</template>

<script>

  export default {
      name: 'btn',
      props: {

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
          type: String,
          default: ''
        },
        block: {
          type: Boolean,
          default: false
        },
        icon: {
          type: Boolean,
          default: false
        }
      },
      computed: {

        // build class to be applyed to the button
        classConstructor () {
          return [
            (this.theme) ? 'btn-' + this.theme : null,
            (this.icon) ? 'btn-icon' : null,
            (this.block) ? 'btn-block' : null
          ]
        },

        ripple () {
          return 'rgba(0, 0, 0, 0.1)'
        }
      },
      methods: {
        handleClick (e) {
          this.$emit('click', e)
        }
      }
  }

</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  // ------------- default -------------
  .btn {
    height: @btn-height;
    padding: 0 15px;

    border: solid thin @grey4;
    .vertical-gradient(@grey2, @grey3);
    .btn-shadow(@grey6);

    color: fadeout(@grey9, 15%);
    font-size: 11pt;
    .f-b;

    cursor: pointer;

    &:hover {
      color: @grey9;
      border-color: @grey3;
   }
  }

  // ------------- icon -------------
  .btn.btn-icon {
    width: @btn-height;
    border-radius: 50%;
    padding: 0;

    line-height: 43px;
    text-align: center;
    vertical-align: bottom;

    &:focus {
      outline: none!important;
      .box-shadow(0px 0px 2px 1px #32a1ce);
    }
  }

  /// ------------- block -------------
  .btn.btn-block {
    width: 100%;
  }

  // ------------- generator theme classes -------------
  @scope: {
    .generateThemeClasses({

      .btn.btn-@{name} {
        color: fadeout(white, 15%);
        background-color: @color !important;
        border-color: @color-dark !important;
        .vertical-gradient(@color, darken(@color, 6%));

        .btn-shadow(@color-dark);

        &:hover {
          color: white;
          border-color: @color-dark !important;
        }
      }

    });
  };
  @scope();

  // ------------- helpers -------------
  .btn-shadow(@color) {
    &:active {
      -webkit-box-shadow: inset 0px 1px 3px 1px fadeout(@color, 95%);
      -moz-box-shadow: inset 0px 1px 3px 1px fadeout(@color, 95%);
      box-shadow: inset 0px 1px 3px 1px fadeout(@color, 65%);
    }
  }

</style>
