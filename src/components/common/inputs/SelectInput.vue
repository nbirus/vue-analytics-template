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

    <multiselect
      :value="displayValue"
      @input="optionSelected"

      :options="activeOptions"

      :trackBy="(hasLabel) ? optionLabel : undefined"
      :label="(hasLabel) ? optionLabel : undefined"

      :multiple="multiselect"

    >
    </multiselect>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'
  import OptionsJSON from '../../../../static/data/forms/options.json'
  import Multiselect from 'vue-multiselect'

  import { cloneDeep } from 'lodash'

  export default {
    name: 'select-input',
    mixins: [InputMixin],
    components: { Multiselect },
    props: {

      // options
      optionSource: {
        type: String,
        default: 'inline',
        validator (value) {
          return ['inline', 'api', 'local'].includes(value)
        }
      },
      options: {
        type: Array,
        default: () => []
      },
      optionPath: {
        type: String,
        default: ''
      },
      optionAPIConfig: {
        type: Object,
        default () { return {} }
      },
      optionLabel: {
        type: String,
        default: 'label'
      },
      optionValue: {
        type: String,
        default: 'value'
      },

      // multiselect props
      multiselect: {
        type: Boolean,
        default: false
      },
      hasLabel: {
        type: Boolean,
        default: false
      }

    },
    data () {
      return {
        activeOptions: [],
        displayValue: undefined
      }
    },
    async mounted () {

      // if there is no initial value, initialize it
      if (!this.inputValue) {
        this.$nextTick(() => { this.$updateValue(this.getDefaultValue()) })
      }

      // get options
      this.activeOptions = await this.getOptions()

    },
    methods: {
      optionSelected (selectedValue) {
        let updateValue = (selectedValue)
          ? this.formatValueForReturn(selectedValue)
          : this.getDefaultValue()

        this.$updateValue(updateValue)
      },

      getOptions () {
        if (this.optionSource === 'inline') {
          return cloneDeep(this.options)
        }
        else if (this.optionSource === 'local') {
          return cloneDeep(OptionsJSON[this.optionPath])
        }
        else if (this.optionSource === 'api') {
          // get from api
        }
      },
      getDefaultValue () {
        return (this.multiselect) ? [] : ''
      },

      formatValueForReturn (value) {
        return (this.multiselect)
          ? value.map(valueItem => (this.hasLabel) ? valueItem[this.optionValue] : valueItem) // multi-select
          : (this.hasLabel) ? value[this.optionValue] : value // single-select
      },
      formatValueForDisplay (value) {
        return (this.multiselect)
          ? value.map(valueItem => (this.hasLabel) ? this.activeOptions.find(item => item[this.optionValue] === valueItem) : valueItem) // multi-select
          : (this.hasLabel) ? this.activeOptions.find(item => item[this.optionValue] === value) : value // single-select
      }
    },
    watch: {
      inputValue (value) {
        this.displayValue = (value)
          ? this.formatValueForDisplay(value)
          : this.getDefaultValue()
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="less">

  @import (reference) '../../../styles/app-helper.less';

  // .form-group {
  //
  //   .form-control {
  //     width: auto;
  //     line-height: @input-height;
  //     background-color: @input-bg-color;
  //     border: @input-border;
  //     font-size: 11pt;
  //
  //     padding: 0 8px;
  //
  //     &:focus {
  //       outline: 0;
  //       border: @input-focus-border;
  //       background-color: @input-focus-bg-color;
  //       .box-shadow(@input-focus-shadow);
  //     }
  //   }
  //
  //   &.error > .form-control {
  //     border-color: @input-error-border-color ;
  //     background-color: @input-error-bg-color;
  //   }
  // }

</style>
