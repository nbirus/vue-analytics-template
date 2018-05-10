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

    <label
      class="checkbox"
      v-for="(option, index) in activeOptions" :key="index"
      @click="optionClicked(option)">

      <input
        type="checkbox"
        :name="option[optionValueAccessor]"
        :checked="isActive(option)"
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
    name: 'checkbox-input',
    mixins: [InputMixin, OptionsMixin],
    props: {
      inline: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      optionClicked (option) {

        let selectedOptions = JSON.parse(JSON.stringify(this.inputValue))

        if (selectedOptions) {

          // toggle selected item
          if (this.isActive(option)) {
            selectedOptions.splice(this.getIndex(option), 1)
          }
          else {
            selectedOptions.push(option)
          }

          this.$updateValue(selectedOptions)
        }
      },

      // is the checkbox checked
      isActive (option) {
        return this.inputValue
          .some(selectedOption => selectedOption[this.optionValueAccessor] === option[this.optionValueAccessor])
      },
      getIndex (option) {
        return this.inputValue
          .findIndex(o => option[this.optionValueAccessor] === o[this.optionValueAccessor])
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
      cursor: default;
      font-weight: @regular;
      margin-right: 15px;
      margin-bottom: 3px;
      font-size: @input-font-size;

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
