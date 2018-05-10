<template>

  <div class="form-group" :class="[formGroupClass, optionsClass, {'inline': inline}]">

    <!-- label -->
    <label
      class="form-label"
      v-if="label"
      :for="id + '-input'"
    >
      {{label}}
    </label>

    <label class="checkbox"
       v-for="(option, index) in activeOptions"
       :key="index"
       @click="$updateValue(value)">

      <input
        type="radio"
        :name="option[optionValueAccessor]"
        :checked="inputValue[optionValueAccessor] === option[optionValueAccessor]"
      />

      {{option[optionLabelAccessor]}}

    </label>

    <p class="form-error-text">{{error}}</p>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'
  import OptionsMixin from '@/mixins/OptionsMixin'

  export default {
    name: 'radio-input',
    mixins: [InputMixin, OptionsMixin],
    props: {
      inline: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/app-helper.less';

  .form-group {

    display: flex;
    flex-wrap: wrap;

    .form-label {
      flex: 0 0 100%;
    }

    .checkbox {
      flex: 0 0 100%;
      font-weight: @regular;
      margin-right: 15px;
      margin-bottom: 3px;
      font-size: @input-font-size;;

      &:last-child {
        margin-right: 0;
      }
    }

    .form-error-text {
      flex: 0 0 100%;
    }

    &.inline {
      .checkbox {
        flex: 0 0 auto;
      }
    }

    &.error > .checkbox {
      color: @input-error-color;
    }
  }

</style>
