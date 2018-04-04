<template>

  <div class="form-group" :class="{'error': error, 'required': required}">

    <!-- label -->
    <label
      v-if="label"
      :for="id + '-input'"
      class="form-label"
    >
      {{label}}
    </label>

    <!-- input -->
    <input
      class="form-control"
      :type="type"

      :id="id + '-input'"
      :name="id"
      :placeholder="placeholder"

      :value="inputValue"
      @input="event => $updateValue(event.target.value)"
    />

    <p class="form-error-text">{{error}}</p>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'

  export default {
    name: 'text-input',
    mixins: [InputMixin],
    props: {
      /**
      * Type of input
      **/
      type: {
        type: String,
        default: 'text'
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/app-helper.less';

  .form-group {

    .form-control {
      font-size: @input-font-size;
      padding: @input-padding;

      background-color: @input-bg-color;
      border: @input-border;
      border-radius: @input-border-radius;

      &:focus {
        outline: 0;
        border: @input-focus-border;
        background-color: @input-focus-bg-color;
        .box-shadow(@input-focus-shadow);
      }
    }

    &.error > .form-control {
      border: @input-error-border;
      background-color: @input-error-bg-color;
    }
  }

</style>
