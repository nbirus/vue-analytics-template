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

      <dropdown class="form-group">
        <div class="input-group">
          <input class="form-control" type="text" v-model="date">
          <div class="input-group-btn">
            <btn class="dropdown-toggle"><i class="fa fa-calender"></i></btn>
          </div>
        </div>
        <template slot="dropdown">
          <li>
            <date-picker v-model="date"/>
          </li>
        </template>
      </dropdown>

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
        date: 'date'
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../styles/component-helper.less';

  .form-control {
    // line-height: @input-height;
    // background-color: @input-bg-color;
    // border: @input-border;
    //
    // padding: 0 8px;
    //
    // &:focus {
    //   outline: 0;
    //   border: @input-focus-border;
    //   background-color: @input-focus-bg-color;
    //   .box-shadow(@input-focus-shadow);
    // }

  }
</style>
