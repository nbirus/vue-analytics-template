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

    <label class="checkbox"
       v-for="(option, index) in options"
       :key="index"
       @click="optionClicked(option.value)">

      <input type="radio" :name="option.value" :checked="inputValue === option.value" />
      {{option.label}}

    </label>

    <p class="form-error-text">{{error}}</p>

  </div>

</template>

<script>
  import InputMixin from '../../../mixins/InputMixin'
  import OptionsJSON from '../../../../static/data/forms/options.json'

  export default {
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
      optionClicked (value) {
        this.$updateValue(value)
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../../static/styles/component-helper.less';

  .form-group {

    display: flex;
    flex-wrap: wrap;

    .form-label {
      flex: 0 0 100%;
    }

    .checkbox {
      flex: 0 0 100%;
      cursor: pointer;
      .f-r;
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
      color: @input-error-border-color;
    }
  }

</style>
