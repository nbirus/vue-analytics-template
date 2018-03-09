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

    <!-- input -->
    <!-- <input
      class="form-control"
      type="text"

      :id="id + '-input'"
      :name="id"
      :placeholder="placeholder"

      :value="inputValue"
      @input="event => $updateValue(event.target.value)"
    /> -->

  </div>

</template>

<script>
  import InputMixin from '../../../mixins/InputMixin'
  import { Dropdown, DatePicker } from 'uiv'

  export default {
    components: { Dropdown, DatePicker },
    mixins: [InputMixin],
    data () {
      return {
      }
    },
    updateDate () {

    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/component-helper.less';

  .form-control {
    display: flex;

    .to {
      padding: 0 10px;
      line-height: @input-height;
      vertical-align: middle;
    }

    input {
      line-height: @input-height;
      background-color: @input-bg-color;
      border: @input-border;
      font-size: @input-font-size;

      padding: 0 8px;

      &:focus {
        outline: 0;
        border: @input-focus-border;
        background-color: @input-focus-bg-color;
        .box-shadow(@input-focus-shadow);
      }
    }


  }
</style>
