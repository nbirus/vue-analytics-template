<template>

  <div class="form-group" :class="{'required': required}">

    <!-- label -->
    <label
      class="form-label"
      v-if="label"
      :for="id + '-input'"
    >
      {{label}}
    </label>

    <select class="form-control" @change="event => $updateValue(event.target.value)">
      <option
        v-for="(option, index) in options"
        :key="index"
      >
        {{option.label}}
      </option>
    </select>

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
    },
    methods: {
      optionClicked (value) {
        this.$updateValue(value)
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/component-helper.less';

  .form-group {

    .form-control {
      width: auto;
      line-height: @input-height;
      background-color: @input-bg-color;
      border: @input-border;
      font-size: 11pt;

      padding: 0 8px;

      &:focus {
        outline: 0;
        border: @input-focus-border;
        background-color: @input-focus-bg-color;
        .box-shadow(@input-focus-shadow);
      }
    }

    &.error > .form-control {
      border-color: @input-error-border-color ;
      background-color: @input-error-bg-color;
    }
  }

</style>
