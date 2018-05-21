<template>
  <data-wrapper :apiConfig="activeConfig">
    <template slot-scope="{ _response, _state }">
      <grid
        :loading="_state.loading"
        :error="_state.error"
        :data="_response.data"

        v-bind="[$props, $attrs]"

        @sortChanged="sortChanged"
        @pageNumberChanged="pageNumberChanged"
        @pageSizeChanged="pageSizeChanged"
      />
    </template>
  </data-wrapper>
</template>

<script>
  import { merge } from 'lodash'
  import Grid from './Grid'

  export default {
    name: 'elastic-grid',
    components: { Grid },
    props: {
      apiConfig: {
        type: Object,
        required: true
      }
    },
    computed: {
      activeConfig () {
        return merge(
          this.apiConfig
        )
      }
    },
    data () {
      return {

      }
    },
    methods: {
      sortChanged (model) {
        console.log(model)
      },
      pageSizeChanged (pageSize) {
        console.log(pageSize)
      },
      pageNumberChanged (pageNumber) {
        console.log(pageNumber)
      }
    }
  }
</script>
