<template>
  <div class="form-group">

    <!-- label -->
    <label
      v-if="label"
      :for="id + '-input'"
      class="form-label"
      :class="{'required': required}"
    >
      {{label}}
    </label>

    <button type="button" class="form-control" v-for="(option, index) in options"
                      :key="index"
                      :class="{'active': option.value === inputValue}"
                      @click="$updateValue(option.value)">
      {{option.label}}
    </button>
  </div>
</template>

<script>
  import InputMixin from '../../../mixins/InputMixin'

  export default {
    name: 'pill-input',
    mixins: [InputMixin],
    props: {
      options: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/component-helper.less';

  @border: solid thin fadeout(black, 90%);

  .form-group {

    .form-control {
      width: auto; height: 40px;
      display: inline-block;

      background-color: fadeout(black, 97%);
      border: @border;
      border-right: none;

      .box-shadow(inset 1px 2px 4px 0 fadeout(@grey8, 90%));

      .f-b;
      color: @grey6;
      font-size: @input-font-size;

      padding: 0 15px;
      cursor: pointer;

      &:last-child {
        border-right: @border;
      }

      &:hover {
        background-color: @grey2;
        color: @grey7;
      }

      &.active {
        background-color: inherit;
        color: @grey8;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }

      &:focus {
        outline: none;
      }

    }
  }


</style>
