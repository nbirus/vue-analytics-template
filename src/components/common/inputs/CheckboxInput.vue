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

      <input type="checkbox" :name="option.value" :checked="inputValue.includes(option.value)">
      {{option.label}}

    </label>

    <p class="form-error-text">{{errorText}}</p>

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

        let activeList = JSON.parse(JSON.stringify(this.inputValue))

        if (activeList) {
          if (activeList.includes(value)) { activeList.splice(activeList.indexOf(value), 1) }
          else { activeList.push(value) }

          this.$updateValue(activeList)
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../styles/component-helper.less';

  .form-group {

    .checkbox {
      cursor: pointer;
      .f-r;
    }

    &.inline {
      display: flex;
      flex-wrap: wrap;

      .form-label {
        flex: 0 0 100%;
      }

      .checkbox {
        margin-right: 15px;
        margin-bottom: 0;

        &:last-child {
          margin-right: 0;
        }
      }

    }

    &.error > .checkbox {
      color: @input-error-border-color;
    }
  }

</style>