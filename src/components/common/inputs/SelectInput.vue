<template>

  <div class="form-group" :class="[formGroupClass, optionsClass]">

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
      :value="inputValue"
      @input="$updateValue"

      :options="activeOptions"

      :trackBy="optionValueAccessor"
      :label="optionLabelAccessor"

      :multiple="multiselect"
      :searchable="searchable"
      :optionsLimit="optionsLimit"
      :internalSearch="internalSearch"
      :maxHeight="maxHeight"
      :showNoResults="showNoResults"

      :placeholder="placeholder"
      :allowEmpty="allowEmpty"

      :loading="state.loading"
    >
    </multiselect>

    <p class="form-error-text">{{error || state.error}}</p>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'
  import OptionsMixin from '@/mixins/OptionsMixin'
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'select-input',
    mixins: [InputMixin, OptionsMixin],
    components: { Multiselect },
    props: {

      // multiselect props
      multiselect: {
        type: Boolean,
        default: false
      },
      searchable: {
        type: Boolean,
        default: false
      },
      internalSearch: {
        type: Boolean,
        default: true
      },
      showNoResults: {
        type: Boolean,
        default: true
      },
      optionsLimit: {
        type: Number,
        default: 1000
      },
      maxHeight: {
        type: Number,
        default: 350
      },

      placeholder: {
        type: String,
        default: 'Select option..'
      },
      allowEmpty: {
        type: Boolean,
        default: true
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
       cursor: default;

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
     cursor: default;

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
      & > .multiselect__tags {
        border: @input-error-border;
        background-color: @input-error-bg-color;
      }
    }
  }

</style>
