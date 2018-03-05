<template>
  <div class="grid-container">



    <div class="grid-action-bar">
      <text-input
        style="margin: 15px; width: 200px"
        v-if="canSearch"
        :inputValue.sync="searchText"
        placeholder="Type to filer.."
      ></text-input>
    </div>

    <div class="grid-body">
      <ag-grid-vue
        class="grid ag-fresh"
        :gridOptions="gridOptions"

        :rowData="gridData"
        :columnDefs="filteredGridColumns"

        :enableSorting="canSort"
        :enableColResize="canResizeColumns"
        :suppressMovableColumns="!canMoveColumns"

        :pagination="paginate"
        :paginationPageSize="pageSize"

        :quickFilterText="searchText"

        :rowModelType="'inMemory'"
      />
    </div>

    <div class="grid-footer">

    </div>



  </div>
</template>

<script>

  import { AgGridVue } from 'ag-grid-vue'
  import '../../../node_modules/ag-grid/dist/styles/ag-grid.css'
  import '../../../node_modules/ag-grid/dist/styles/theme-fresh.css'

  export default {
    components: { AgGridVue },
    props: {

      // data
      id: {
        type: String,
        required: true,
        default: ''
      },

      // async
      apiConfig: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      },

      // local
      data: {
        required: false,
        default: false
      },
      columns: {
        type: Array,
        required: false,
        default: () => []
      },

      // grid actions
      canSort: {
        type: Boolean,
        default: true
      },
      canResizeColumns: {
        type: Boolean,
        default: true
      },
      canMoveColumns: {
        type: Boolean,
        default: true
      },

      paginate: {
        type: Boolean,
        default: true
      },
      initialPageSize: {
        type: Number,
        default: 20
      },

      canSearch: {
        type: Boolean,
        default: true
      },

      canToggleColumns: {
        type: Boolean,
        default: true
      },
      showRowSummary: {
        type: Boolean,
        default: true
      },
      canExport: {
        type: Boolean,
        default: true
      }

    },
    data () {
      return {

        gridOptions: {
          rowHeight: 35,
          headerHeight: 50,
          rowClass: 'grid-row',
          gridLoadingTemplate: '<i class="fa fa-sync-alt fa-spin"></i>',
          gridNoRowsTemplate: '<i class="fa fa-danger"></i>',
          icons: {
            sortAscending: '<i class="fa fa-arrow-up"></i>',
            sortDescending: '<i class="fa fa-arrow-down"></i>'
          },
          defaultColumn: {
            width: 200,
            suppressSorting: false
          },
          unSortIcon: true,
          suppressAnimationFrame: true
        },

        gridData: [],
        gridColumns: [],

        // actions
        pageSize: this.initialPageSize,
        searchText: '',
        suppressedColumns: []



      }
    },
    computed: {
      filteredGridColumns () {
        return this.gridColumns.filter(header => !this.suppressedColumns.includes(header.field))
      }
    },
    mounted () {

      // set header definitions
      this.setHeader()

      // set row data
      this.setRowData()
    },
    methods: {

      // data
      setHeader () {
        this.gridColumns = this.columns
      },

      setRowData () {
        this.gridData = this.data
      },

      // grid actions
      setPageSize (pageSize) {
        this.gridOptions.api.paginationSetPageSize(pageSize)
      },
      goToPage (pageNumber) {
        this.gridOptions.api.paginationGoToPage(pageNumber)
      }
    }
  }

</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  .grid-container {
    width: 100%; height: 100%;

    display: flex;
    flex-direction: column;

    .grid-action-bar {
      flex: 0 0 auto;
    }

    .grid-body {
      flex: 1 1 100%;

      .grid {
        width: 100%; height: 100%;
      }
    }

    .grid-footer {
      flex: 0 0 auto;
    }

  }

</style>
