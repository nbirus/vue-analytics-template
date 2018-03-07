<template>
  <button
    class="btn" :class="classConstructor"
    :id="id"
    :name="name"
    :disabled="disabled"
    v-ripple="ripple"
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
        },
        flat: {
          type: Boolean,
          default: false
        },
        small: {
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
            (this.block) ? 'btn-block' : null,
            (this.flat) ? 'btn-flat' : null,
            (this.small) ? 'btn-small' : null
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

  @import '../../../static/styles/component-helper.less';

  // ------------- default -------------
  .btn {
    height: @btn-height;
    padding: 0 15px;

    border: solid thin @grey4;
    .vertical-gradient(white, @grey2);
    .btn-shadow(@grey6);

    color: fadeout(@grey9, 20%);
    font-size: 11pt;
    .f-b;

    cursor: pointer;

    &:hover {
      color: @grey9;
      border-color: @grey5;
   }

    &:hover, &:active { outline: none; }
  }

  // ------------- icon -------------
  .btn.btn-icon {
    width: @btn-height;
    line-height: 36px;

    &.btn-small {
      width: 30px;
      line-height: 33px;
    }

    border-radius: 50%;
    padding: 0;

    text-align: center;
    vertical-align: bottom;

    &:focus {
      outline: none!important;
      .box-shadow(0px 0px 2px 1px #32a1ce);
    }
  }

  // ------------- block -------------
  .btn.btn-block {
    width: 100%;
  }

  // ------------- flat -------------
  .btn.btn-flat {
    background: none;
    border: none;
    font-size: 14pt;
    border-radius: 0;
  }

  // ------------- small -------------
  .btn.btn-small {
    height: 30px;
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
      .box-shadow(inset 0px 1px 3px 1px fadeout(@color, 65%))
    }
  }

</style>
