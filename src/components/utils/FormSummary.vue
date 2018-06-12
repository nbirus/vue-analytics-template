<template>
  <div class="form-summary">

    <h3>Search by..</h3>

    <div v-if="Object.keys(model).length === 0" class="empty">
      No Search Critera
    </div>

    <div
      v-for="(value, key) in model" :key="key"
      class="summary-line"
    >

      <div class="bullet-point"></div>

      <!--keyword-->
      <div v-if="key === 'keyword'" class="text">
        Everything by&nbsp;<b>{{value}}</b>
      </div>

      <!--default-->
      <div v-else class="text">
        {{getInputSchema(key).label}} by&nbsp;<b>{{value}}</b>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'search-summary',
    props: {
      schema: {
        type: Array,
        required: true
      },
      model: {
        type: Object,
        required: true
      }
    },
    methods: {
      getInputSchema (key) {
        return this.schema.find(input => input.id === key)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import (reference) '../../styles/app-helper.less';

  .form-summary {
    width: auto; height: auto;
    // background-color: @grey1;
    // border: solid thin @grey2;
    // border-radius: 2px;
    transition: all .5s;
    // padding: 1rem;
    font-size: 1rem;

    .empty {
      color: @grey6;
    }

    h3 {
      margin-bottom: 1em;
    }

    .summary-line {
      padding-bottom: .7em;
      margin-bottom: .7em;

      display: flex;

      .bullet-point {
        margin-top: .5rem;
        border-radius: 50%;
        height: 0.3rem;
        width: 0.3rem;
        margin-right: 0.5rem;
        background-color: black;
      }

      .text {
        display: inline-block;
      }



      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
      }
    }
  }
</style>
