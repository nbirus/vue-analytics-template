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
          default: 'default'
        },
        block: {
          type: Boolean,
          default: false
        },
        icon: {
          type: Boolean,
          default: false
        },
        large: {
          type: Boolean,
          default: false
        }
      },
      computed: {

        // build class to be applyed to the button
        classConstructor () {
          return 'btn-' + this.theme
        },

        ripple () {
          return 'rgba(0, 0, 0, 0.05)'
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

  @import '../../styles/config.less';

  // default
  .btn {
    padding: 10px 15px;

    border: solid thin @grey1;
    .vertical-gradient(@grey2, @grey3);

    color: @grey9;
    font-size: 11pt;
    .f-b;

    cursor: pointer;

    &:hover { border-color: @grey3; }
    .btn-shadow(@grey6);
  }

  // .createThemeClasses();

  // generator theme options
  .createThemeClasses({

    .btn.btn-@{name} {
      color: white !important;
      background-color: @color !important;
      border-color: @color-dark !important;
      .vertical-gradient(@color, darken(@color, 6%));

      .btn-shadow(@color-dark);

      &:hover {
        border-color: @color-dark !important;
      }
    }

  });

  // helpers
  .btn-shadow(@color) {
    &:active {
      -webkit-box-shadow: inset 0px 1px 3px 1px fadeout(@color, 95%);
      -moz-box-shadow: inset 0px 1px 3px 1px fadeout(@color, 95%);
      box-shadow: inset 0px 1px 3px 1px fadeout(@color, 65%);
    }
  }

</style>
