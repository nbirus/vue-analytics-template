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
      class="form-control"
      :value="displayValue"
      @input="optionSelected"

      :options="activeOptions"

      :trackBy="(hasLabel) ? optionLabel : undefined"
      :label="(hasLabel) ? optionLabel : undefined"

      :multiple="multiselect"

      :placeholder="placeholder"
      :allowEmpty="allowEmpty"
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
      },

      placeholder: {
        type: String,
        default: 'Select option..'
      },
      allowEmpty: {
        type: Boolean,
        default: true
      }

    },
    data () {
      return {
        activeOptions: [],
        displayValue: undefined
      }
    },
    async mounted () {

      // get options
      this.activeOptions = await this.getOptions()

      // if there is no initial value, initialize it
      if (!this.inputValue) {
        this.$nextTick(() => { this.$updateValue(this.getDefaultValue()) })
      }
      else {
        this.displayValue = this.formatValueForDisplay(this.inputValue)
      }

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

  .form-group {

   .form-control {

     // drop down icon container
     & > .multiselect__select {

     }

     // main input container
     & > .multiselect__tags {
       font-size: @font-size!important;
       min-height: initial;

       background-color: @input-bg-color;
       border: @input-border;
       border-radius: @input-border-radius;

       padding: @input-padding;
       padding-right: 40px;

       .multiselect__single, .multiselect__input {
         font-size: 1em;
         background: none;
         background-color: transparent;
         margin: 0; padding: 0;
       }

       .multiselect__input::placeholder,
       .multiselect__input::-webkit-input-placeholder {
         font-size: 1em;
         color: @grey7;
       }


       .multiselect__tag {
         margin-bottom: 0;
         background: @grey2;
         color: @grey9;
         border: @input-border;
         overflow: initial;
         padding: .1em 1.8em .1em .4em;
         border-radius: 2px;
         line-height: initial;

         & > .multiselect__tag-icon {
           border-radius: 0;

           &:hover { background: @grey2; }
           &:after { color: @grey8; }
         }
       }
     }

     // main drop down container
     & > .multiselect__content-wrapper {
       border: @input-focus-border;
       border-top: none;
       .box-shadow(@input-focus-shadow);

       background-color: white;
       border-radius: @input-border-radius;

       .multiselect__option {
         font-size: 1rem;
         line-height: initial;
         padding: @input-padding;
         color: @grey9;
         min-height: initial;

         // hover over option
         &.multiselect__option--highlight {
           background: @grey2;
         }

         // option has been selected
         &.multiselect__option--selected {
           background: fadeout(@c-blue, 85%);

           &:hover {
             background: fadeout(@c-blue, 70%);
           }
         }

         &:after {
           display: none;
         }
       }
     }

     &.multiselect--active {

       & > .multiselect__tags {
         border: @input-focus-border;
         background-color: @input-focus-bg-color;
         .box-shadow(@input-focus-shadow);
       }

     }

     &.multiselect--above {
       & > .multiselect__content-wrapper {
         border: @input-focus-border;
         border-bottom: none;
       }
     }
   }

   &.error > .form-control {
     border: @input-error-border;
     background-color: @input-error-bg-color;
   }
  }

</style>
