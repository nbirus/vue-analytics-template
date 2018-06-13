<template>
  <data-wrapper :apiConfig="activeConfig">
    <template slot-scope="{ _response, _state }">
      <grid
        ref="grid"
        v-bind="[$props, $attrs]"

        :loading="_state.loading"
        :error="_state.error"
        :rows="_response.data"
        :rowTotal="_response.total"

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
  import { cloneDeep } from 'lodash'
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
        return {
          ...cloneDeep(this.apiConfig),
          params: this.activeParams
        }
      },
      activeParams () {
        return {
          ...cloneDeep(this.apiConfig.params),
          include: this.includes,
          from: this.pageNumber * this.pageSize,
          size: this.pageSize,
          sort: this.pageSort.colId,
          order: this.pageSort.sort
        }
      },
      includes () {
        return this.columns.map(column => column.field)
      }
    },
    methods: {

      // sort
      changeSort (model) {
        this.pageSort = model[0] || {}
        this.$saveGridState()
      },

      // page size
      changePageSize (pageSize, resetPageNumber = true) {
        this.pageSize = pageSize

        if (resetPageNumber) {
          this.changePageNumber(0)
        }

        this.$saveGridState()
      },

      // page number
      changePageNumber (pageNumber) {
        this.pageNumber = pageNumber
        this.$saveGridState()
      }

    }
  }
</script>
