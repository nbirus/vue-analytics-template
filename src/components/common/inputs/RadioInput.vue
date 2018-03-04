<template>

  <div class="form-group" :class="{'inline': inline}">

    <!-- label -->
    <label
      class="form-label"
      v-if="label"
      :for="id + '-input'"
      :class="{'required': required}"
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
  }

</style>
