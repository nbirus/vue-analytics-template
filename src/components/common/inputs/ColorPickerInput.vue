<template>

  <div class="form-group" :class="formGroupClass">

    <!-- label -->
    <label
      class="form-label"
      v-if="label"
      :for="id + '-input'"
    >
      {{label}}
    </label>

    <label class="checkbox"
           v-for="(color, index) in colors"
           :key="index"
           @click="$updateValue(color)">

      <input
        type="radio"
        :name="color"
        :checked="inputValue === color"
      />

      {{color}}

    </label>

    <p class="form-error-text">{{error}}</p>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'
  import ColorService from '@/services/ColorService'

  export default {
    name: 'color-picker-input',
    mixins: [InputMixin],
    data () {
      return {
        colors: ColorService.getColorNames()
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
