<template>

  <div class="form-group" :class="{'error': error, 'required': required, 'inline': inline}">

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
      v-for="(option, index) in options" :key="index"
      @click="optionClicked(option)">

      <input
        type="checkbox"
        :name="option.value"
        :checked="isActive(option)"
      />

      {{option.label}}

    </label>

    <p class="form-error-text">{{error}}</p>

  </div>

</template>

<script>
  import InputMixin from '../../../mixins/InputMixin'
  import OptionsJSON from '../../../../static/data/forms/options.json'

  export default {
    name: 'checkbox-input',
    mixins: [InputMixin],
    props: {
      optionSource: {
        type: String,
        required: true
      },
      inline: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        options: []
      }
    },
    mounted () {
      this.options = OptionsJSON[this.optionSource]
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
      isActive (option) {
        return this.inputValue.some(selectedOption => selectedOption.value === option.value)
      },
      getIndex (option) {
        return this.inputValue.findIndex(o => option.value === o.value)
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
      .f-r;
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
      border: @input-error-border;
    }
  }

</style>
