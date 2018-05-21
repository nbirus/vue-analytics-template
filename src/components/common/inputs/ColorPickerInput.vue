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

    <dropdown>

      <button class="color-selector" data-role="trigger" v-ripple type="button">
        <div class="color-circle" :class="`bg-${inputValue}`"></div>
        <i class="fa fa-chevron-down"></i>
      </button>

      <template slot="dropdown">
        <ul class="color-list">
          <li
            v-for="(color, index) in colors"
            :key="index"
            class="color"
            :class="{'active': color === inputValue}"
          >
            <a class="color-btn"
               :class="`bg-${color}`"
               role="button"
               @click="$updateValue(color)"
            >
            </a>
          </li>
        </ul>
      </template>

    </dropdown>

    <p class="form-error-text">{{error}}</p>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'
  import ColorService from '@/services/ColorService'
  import { Dropdown } from 'uiv'

  export default {
    name: 'color-picker-input',
    mixins: [InputMixin],
    components: { Dropdown },
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

    .color-selector {

      background-color: transparent;
      border: @input-border;
      padding: .7em .9em;
      cursor: default;

      display: flex;
      align-items: center;

      .color-circle {
        width: 1rem; height: 1rem;
        border-radius: 50%;
        margin-right: .4rem;
      }

      .color-name {
        margin-right: .3rem;
      }

      i {
        margin-top: 2px;
        font-size: .7rem;
      }

      &:focus {
        outline: @input-focus-border;
      }
    }

    .color-list {
      display: flex;
      flex-wrap: wrap;

      .color {
        width: 2rem; height: 2rem;
        border: solid thin fadeout(black, 90%);
        padding: .15rem;
        margin: 0 .4rem .3rem;
        border-radius: 2px;

        .color-btn {
          display: block;
          width: 100%; height: 100%;
          border-radius: 1px;
        }

        &.active {
          display: none;
        }
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
