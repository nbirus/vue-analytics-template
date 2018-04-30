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


    <div class="form-control">

      <div class="from-date">
        <input type="date" :value="inputValue[0]" @input="event => $updateValue([event.target.value, inputValue[1]])">
      </div>

      <div class="to">to</div>

      <div class="to-date">
        <input type="date" :value="inputValue[1]" @input="event => $updateValue([inputValue[0], event.target.value])">
      </div>

    </div>

  </div>

</template>

<script>
  import InputMixin from '../../../mixins/InputMixin'
  import { Dropdown, DatePicker } from 'uiv'

  export default {
    name: 'datepicker-input',
    components: { Dropdown, DatePicker },
    mixins: [InputMixin]
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/app-helper.less';

  .form-control {
    display: flex;

    .to {
      font-size: @input-font-size;

      padding: .6em 1em 0;
      vertical-align: middle;
    }

    input {
      font-size: @input-font-size;

      background-color: @input-bg-color;
      border: @input-border;

      padding: @input-padding;

      &:focus {
        outline: 0;
        border: @input-focus-border;
        background-color: @input-focus-bg-color;
        .box-shadow(@input-focus-shadow);
      }
    }

  }
</style>
