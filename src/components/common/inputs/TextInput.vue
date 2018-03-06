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
      type="text"

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
  import InputMixin from '../../../mixins/InputMixin'

  export default {
    mixins: [InputMixin]
  }
</script>

<style lang="less" scoped>

  @import '../../../styles/component-helper.less';

  .form-group {

    .form-control {
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
