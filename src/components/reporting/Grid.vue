<template>
  <div class="grid-container">



    <div class="grid-action-bar">

      <!--search-->
      <text-input
        style="margin: 15px; width: 400px"
        v-if="canSearch"
        :inputValue.sync="searchText"
        placeholder="Type to filer.."
      ></text-input>

      <!--page size-->
      <select-input
        style="margin: 15px;"
        :inputValue="pageSize"
        :options="[
          {value: 10, label: '10'},
          {value: 20, label: '20'},
          {value: 50, label: '50'},
          {value: 100, label: '100'},
          {value: -1, label: 'All'}
        ]"
        @changed="setPageSize"
      >
      </select-input>

      <!--pagination-->
      <div class="pagination" style="margin: 15px;">
        <btn small :onClick="firstPage">First</btn>
        <btn small :onClick="prevPage">Previous</btn>
        <span>Page {{pageNumber + 1}}</span>
        <btn small :onClick="nextPage">Next</btn>
        <btn small :onClick="lastPage">Last</btn>
      </div>


      <!--toggle columns-->
      <btn style="margin: 15px;"
           v-if="canToggleColumns"
           :onClick="() => { toggleColumnsOpen = true }">Toggle Columns</btn>

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
        :rowSelection="(canSelectMultiple) ? 'multiple' : 'single'"

        :rowModelType="'inMemory'"

        :rowClicked="rowSelected"
      />

      <div class="grid-mask">

        <div class="overlay" v-if="overlayActive"></div>

        <div class="column-toggle-container" v-if="toggleColumnsOpen">

          <div class="header">
            <h2>Toggle Columns</h2>
            <btn :onClick="() => { toggleColumnsOpen = false }">x</btn>
          </div>

          <div class="body">
            <ul>
              <li v-for="(column, index) in gridColumns"
                  :key="index"
                  v-if="column.field !== 'checkbox'"
                  @click="toggleColumn(column)">
                <span><i class="fa" :class="(column.show) ? 'fa-check-square' : 'fa-square'"></i></span>
                <span>{{column.headerName}}</span>
              </li>
            </ul>
          </div>

        </div>

      </div>


    </div>

    <div class="grid-footer">

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { AgGridVue } from 'ag-grid-vue'

  import { remove, some } from 'lodash'

  import '../../../node_modules/ag-grid/dist/styles/ag-grid.css'
  import '../../../node_modules/ag-grid/dist/styles/theme-fresh.css'

  let checkboxColumn = {
    field: 'checkbox',
    headerName: ' ',
    suppressSorting: true,
    unSortIcon: false,
    show: true,
    showRowGroup: true,
    width: 30,
    cellRendererFramework: Vue.extend({
      template: '<i :class="isSelected()"></i>',
      methods: {
        isSelected () {
          return !this.params.node.selected ? 'far fa-square' : 'fa fa-check-square'
        }
      }
    })
  }

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
      },
      canSelect: {
        type: Boolean,
        default: true
      },
      canSelectMultiple: {
        type: Boolean,
        default: false
      },
      showRowDetail: {
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
          suppressPaginationPanel: true,
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
          suppressAnimationFrame: true,
          rowDeselection: true,
          suppressCellSelection: true,
          suppressRowClickSelection: true
        },

        gridData: [],
        gridColumns: [],

        // actions
        pageSize: this.initialPageSize,
        pageNumber: 0,
        searchText: '',
        suppressedColumns: [],
        toggleColumnsOpen: false,

        // row selection
        selectedRows: []

      }
    },
    computed: {
      filteredGridColumns () {
        return this.gridColumns.filter(header => !this.suppressedColumns.includes(header.field) && header.show)
      },
      overlayActive () {
        return this.toggleColumnsOpen
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

        // get passed in columns
        let columns = this.columns

        // add checkbox row if grid selectable
        if (this.canSelect && columns[0].field !== 'checkbox') {
          columns.unshift(checkboxColumn)
        }

        this.gridColumns = columns
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
        this.setPageNumber()
      },
      nextPage () {
        this.gridOptions.api.paginationGoToNextPage()
        this.setPageNumber()
      },
      prevPage () {
        this.gridOptions.api.paginationGoToPreviousPage()
        this.setPageNumber()
      },
      lastPage () {
        this.gridOptions.api.paginationGoToLastPage()
        this.setPageNumber()
      },
      firstPage () {
        this.gridOptions.api.paginationGoToFirstPage()
        this.setPageNumber()
      },
      setPageNumber () {
        this.pageNumber = this.gridOptions.api.paginationGetCurrentPage()
        this.reselectRows()
      },
      toggleColumn (column) {
        column.show = !column.show
      },

      // row selection
      rowSelected (row) {

        if (this.canSelect) {

          // toggle the item from the list
          (!row.node.selected) ? this.selectedRows.push(row.data) : remove(this.selectedRows, row.data)

          // flip the selected
          row.node.setSelected(!row.node.selected)

          // emit the change
          this.$emit('rowSelected', this.selectedRows)
        }

      },
      reselectRows () {
        // loop over rows and compare them with the list of selected rows
        this.gridOptions.api.forEachNode(this.checkSelectedRows)
      },
      checkSelectedRows (node) {
        if (some(this.selectedRows, node.data)) {
          node.setSelected(true)
        }
      }
    }
  }

</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  .grid-container {
    height: 100%;

    display: flex;
    flex-direction: column;

    .grid-action-bar {
      flex: 0 0 auto;

      .pagination {

      }
    }

    .grid-body {
      width: 100%;
      flex: 0 1 100%;
      position: relative;

      .grid-mask {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        pointer-events: none;

        .column-toggle-container {
          width: 33%; height: 100%;
          max-width: 300px;
          min-width: 250px;
          background-color: white;
          position: absolute;
          right: 0;
          border: solid thin @grey6;
          pointer-events: auto;
        }

        .overlay {
          width: 100%; height: 100%;
          position: absolute;
          top: 0; left: 0;
          background-color: fadeout(black, 85%);
        }
      }

      .grid {
        height: 100%;
      }
    }

    .grid-footer {
      flex: 0 0 auto;
    }

  }

</style>
