<template>

  <div class="search-input">

    <form
      class="input-form-group"
      :class="{'focus-active': focusActive}"
      @submit.prevent="$updateValue($refs.input.value)"
    >

      <div class="icon">
        <i class="icons icon-magnifier"></i>
      </div>

      <div class="input">

        <input
          ref="input"
          id="search-input"
          class="form-control"
          type="text"
          placeholder="Search"
          autocomplete="off"

          :value="inputValue"
          @focus="focusActive = true"
          @blur="focusActive = false"
        />

      </div>

      <div class="submit">
        <btn
          class="button"
          :theme="theme"
          simple
          type="submit"
        >
          Search
        </btn>
      </div>

    </form>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'

  export default {
    name: 'search-input',
    mixins: [InputMixin],
    props: {
      theme: {
        type: String,
        default: 'cyan'
      }
    },
    data () {
      return {
        focusActive: false
      }
    }

  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .search-input {

    .input-form-group {
      font-size: 1.1rem;

      width: 100%;

      padding: .4rem .5rem .4rem 1rem;

      background-color: white;
      border: none;
      border-radius: 2px;

      @shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
      .box-shadow(@shadow);

      display: flex;
      align-items: center;

      .icon {
        flex: 0 0 auto;
        margin-right: .8rem;
      }

      .input {
        flex: 0 1 100%;
        padding-right: .8rem;

        .form-control {
          width: 100%;
          font-size: 1.06em;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .submit {
        .button {
          margin: 0;
        }
      }

      &.focus-active {
        @shadow: 0 3px 4px 0 rgba(0,0,0,0.19), 0 0 1px 1px rgba(0,0,0,0.08);
        .box-shadow(@shadow);

      }

    }

    &.error > .form-control {
      border: @input-error-border;
      background-color: @input-error-bg-color;
    }
  }

</style>
