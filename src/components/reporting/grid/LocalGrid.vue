<template>
  <grid
    ref="grid"
    v-bind="[$props, $attrs]"

    :pageNumber="pageNumber"
    :pageSize="pageSize"
    :pageSort="pageSort"

    :canExport="false"

    @sortChanged="changeSort"
    @pageSizeChanged="changePageSize"
    @pageNumberChanged="changePageNumber"
  />
</template>

<script>
  import { get } from 'lodash'
  import Grid from './Grid'
  import GridMixin from '@/mixins/GridMixin'

  export default {
    name: 'local-grid',
    mixins: [GridMixin],
    components: { Grid },
    props: {
      rows: {
        type: Array,
        required: true
      }
    },
    methods: {

      // sort
      changeSort (sortModel) {
        this.pageSort = {
          id: get(sortModel, '[0].colId'),
          sort: get(sortModel, '[0].sort')
        }
      },

      // page size
      changePageSize (pageSize, resetPageNumber = true) {
        this.pageSize = pageSize
        this.$refs.grid.gridOptions.api.paginationSetPageSize(pageSize)

        if (resetPageNumber) {
          this.changePageNumber(0)
        }

        this.$saveGridState()
      },

      // page number
      changePageNumber (pageNumber) {
        this.pageNumber = pageNumber
        this.$refs.grid.gridOptions.api.paginationGoToPage(pageNumber)
        this.$saveGridState()
      }

    }
  }
</script>
