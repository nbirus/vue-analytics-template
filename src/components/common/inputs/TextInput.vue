<template>

  <div class="form-group">

    <!-- label -->
    <label
      v-if="label"
      :for="id + '-input'"
      :class="{'required': required}"
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

  .form-control {
    line-height: @input-height;
    background-color: @input-bg-color;
    border: @input-border;

    padding: 0 8px;

    &:focus {
      outline: 0;
      border: @input-focus-border;
      background-color: @input-focus-bg-color;
      .box-shadow(@input-focus-shadow);
    }

  }
</style>
