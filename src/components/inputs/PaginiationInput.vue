<template>

  <div class="form-group" :class="[formGroupClass]">

    <div class="pagination">

      <div class="buttons left">
        <btn :disabled="inputValue === 0" @click="$updateValue(0)">First</btn>
        <btn :disabled="inputValue === 0" @click="$updateValue(inputValue - 1)">Previous</btn>
      </div>

      <div class="status">Page {{inputValue + 1}} of {{pageSize + 1}}</div>

      <div class="buttons right">
        <btn :disabled="inputValue === pageSize" @click="$updateValue(inputValue + 1)">Next</btn>
        <btn :disabled="inputValue === pageSize" @click="$updateValue(pageSize)">Last</btn>
      </div>

    </div>

    <form class="go-to" @submit.prevent="goToPage(goTo)">
      <label for="pagination-go-to">Go To </label>
      <text-input
        id="pagination-go-to"
        type="number"
        class="number-input"
        :inputValue.sync="goTo"
      >
      </text-input>
    </form>

  </div>

</template>

<script>
  import InputMixin from '@/mixins/InputMixin'

  export default {
    name: 'pagination-input',
    mixins: [InputMixin],
    props: {
      pageSize: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        goTo: undefined
      }
    },
    methods: {
      goToPage () {

        let pageNum = (parseInt(this.goTo, 10)) - 1

        if (pageNum <= this.pageSize && pageNum >= 0) {
          this.$updateValue(pageNum)
        }

        this.goTo = undefined
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .form-group {
    display: flex;

    .pagination {
      display: flex;
      align-items: center;

      .status {
        flex: 0 0 auto;
        padding: 0 1rem;
      }
    }

    .go-to {
      display: flex;
      align-items: center;

      padding-left: 1rem;

      label {
        padding-right: .5rem;
      }

      .number-input {
        width: 70px;
      }
    }

  }

</style>
