<template>
  <data-wrapper :apiConfig="activeConfig">
    <template slot-scope="{ _response, _state }">
      <grid
        ref="grid"
        v-bind="[$props, $attrs]"

        :loading="_state.loading"
        :error="_state.error"
        :rows="_response"

        :pageNumber="pageNumber"
        :pageSize="pageSize"
        :pageSort="pageSort"

        @sortChanged="changeSort"
        @pageSizeChanged="changePageSize"
        @pageNumberChanged="changePageNumber"
      />
    </template>
  </data-wrapper>
</template>

<script>
  import { merge } from 'lodash'
  import Grid from './Grid'
  import GridMixin from '@/mixins/GridMixin'

  export default {
    name: 'elastic-grid',
    mixins: [GridMixin],
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
    methods: {

      // sort
      changeSort (model) {
        console.log(model)
        this.$saveGridState()
      },

      // page size
      changePageSize (pageSize) {
        console.log(pageSize)
        this.$saveGridState()
      },

      // page number
      changePageNumber (pageNumber) {
        console.log(pageNumber)
        this.$saveGridState()
      }

    }
  }
</script>
