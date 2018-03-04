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

  @import '../../../styles/component-helper.less';

  .form-group {

    .form-control {
      width: auto; height: @input-height;
      display: inline-block;

      background-color: fadeout(@grey8, 95%);
      border: @input-border;
      border-right: none;

      -webkit-box-shadow: inset 2px 2px 2px 0 fadeout(@grey8, 85%);
      -moz-box-shadow: inset 2px 2px 2px 0 fadeout(@grey8, 85%);
      box-shadow: inset 2px 2px 2px 0 fadeout(@grey8, 85%);

      .f-b;
      color: @grey6;

      padding: 0 10px;
      cursor: pointer;

      &:last-child {
        border-right: solid 1px @grey6;
      }

      &:hover {
        background-color: @grey2;
        color: @grey7;
      }

      &.active {
        background-color: white;
        color: @grey9;

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
