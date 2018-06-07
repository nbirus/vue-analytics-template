<template>
  <div class="form-summary">

    <div v-if="Object.keys(model).length === 0">
      No Search Critera
    </div>

    <div v-for="(value, key) in model" :key="key">
      Search <b>{{getInputSchema(key).label}}</b> by <b>{{value}}</b>
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

  }

</style>
