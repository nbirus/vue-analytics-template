<template>
  <div class="grid-container">

    <!-- ------export modal------ -->
    <modal v-model="exportModal"
           class="grid-export-modal"
           :size="'sm'"
           :keyboard="false"
           :title="'Export Table'"
           :footer="false"
           :backdrop="true">

      <div slot="default">

        <!--file name-->
        <text-input
          label="Name"
          placeholder="Enter a file name"
          :inputValue.sync="exportFileName">
        </text-input>

        <!-- select input -->
        <select-input
          style="margin: 15px 0"
          label="Type"
          :options="exportFileTypes.filter(type => exportTypes.includes(type.value))"
          :inputValue.sync="exportFileType">
        </select-input>

        <div class="export-buttons">
          <btn theme="warning" :onClick="() => { exportModal = false }">Cancel</btn>
          <btn theme="success" :onClick="() => { exportModal = false }">Download</btn>
        </div>

      </div>
    </modal>


    <!-- ------actions bar------ -->
    <div class="grid-action-bar">

      <!--page size-->
      <div class="page-size">
        <span>Show</span>
        <select-input
          class="page-size-input"
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
        <span>of 21,245 entries</span>
      </div>

      <!--search-->
      <div class="search">
        <text-input
          class="search-input"
          v-if="canSearch"
          :inputValue.sync="searchText"
          placeholder="Type to filer.."
        ></text-input>
      </div>

      <!--toggle columns-->
      <div class="action-buttons">

        <!--refresh-->
        <btn
          class="refresh-btn"
          v-if="canToggleColumns"
          :onClick="() => {}">
          <i class="fa fa-sync-alt"></i>
        </btn>

        <!--toggle columns-->
        <btn
           v-if="canToggleColumns"
           :onClick="() => { toggleColumnsOpen = !toggleColumnsOpen }">
           Toggle Columns
       </btn>

        <!--export-->
        <btn
          v-if="canExport"
          :onClick="() => { exportModal = true }">
          Export Table
        </btn>

      </div>

    </div>

    <!-- ------body------ -->
    <div class="grid-body">

      <!--grid-->
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

      <!--overlay-->
      <div class="grid-mask">

        <div class="overlay" v-if="overlayActive"></div>

        <div class="column-toggle-container" v-if="toggleColumnsOpen">

          <div class="header">

            <div class="input-row">
              <input @click="toggleAllColumns" class="select-all" type="checkbox" :checked="allToggleColumnsSelected"/>
              <text-input :inputValue.sync="toggleColumnSearchText" class="filter-input" placeholder="Type to filter.."></text-input>
            </div>

            <btn class="close-icon" icon flat small
              :onClick="() => { toggleColumnsOpen = false }"><i class="fa fa-chevron-right"></i>
            </btn>

          </div>

          <div class="body">
            <ul class="header-list">
              <li class="list-item"
                  v-for="(column, index) in toggleColumns"
                  :key="index"
                  v-if="column.field !== 'checkbox'"
                  @click="toggleColumn(column)">

                <input type="checkbox" :checked="column.show"/>
                <span>{{column.headerName}}</span>

              </li>
            </ul>
          </div>

        </div>

      </div>


    </div>

    <!-- ------footer------ -->
    <div class="grid-footer">
      <div class="pagination" style="margin: 15px;">
        <btn small theme="white" :onClick="firstPage">First</btn>
        <btn small :onClick="prevPage">Previous</btn>
        <span>Page {{pageNumber + 1}}</span>
        <btn small :onClick="nextPage">Next</btn>
        <btn small :onClick="lastPage">Last</btn>
      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { AgGridVue } from 'ag-grid-vue'
  import { Modal } from 'uiv'

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
      template: '<input type="checkbox" :checked="isSelected()" />',
      methods: {
        isSelected () {
          return this.params.node.selected
        }
      }
    })
  }

  export default {
    components: {
      AgGridVue,
      Modal
    },
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
      theme: {
        type: String,
        default: 'inverse'
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
      exportTypes: {
        type: Array,
        default: () => ['csv', 'xlsx']
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
        toggleColumnSearchText: '',
        suppressedColumns: [],
        toggleColumnsOpen: false,

        // row selection
        selectedRows: [],

        exportModal: false,
        exportFileTypes: [
          {'label': 'CSV', 'value': 'csv'},
          {'label': 'Excel', 'value': 'xlsx'},
          {'label': 'PDF', 'value': 'pdf'}
        ],
        exportFileName: 'table',
        exportFileType: 'csv'

      }
    },
    computed: {

      // columns passed to the grid
      filteredGridColumns () {
        return this.gridColumns.filter(column => !this.suppressedColumns.includes(column.field) && column.show)
      },

      // items shown on the toggle panel
      toggleColumns () {
        return this.gridColumns.filter(column => {
          return (column.headerName.toLowerCase().indexOf(this.toggleColumnSearchText.toLowerCase()) > -1)
        })
      },
      allToggleColumnsSelected () {
        return this.filteredGridColumns.length === this.gridColumns.filter(column => !this.suppressedColumns.includes(column.field)).length
      },

      // show overlay
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
      toggleAllColumns () {
        let flag = !this.allToggleColumnsSelected
        this.gridColumns.forEach(column => {
          column.show = flag
        })
      },

      // row selection
      rowSelected (row) {

        if (this.canSelect) {

          // reset selected rows
          if (!this.canSelectMultiple) {
            this.selectedRows = []
          }

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

    .grid-export-modal {
      .export-buttons {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        button {
          margin-left: 10px;
        }
      }
    }

    .grid-action-bar {
      flex: 0 0 auto;
      padding: 10px;

      display: flex;

      .page-size {
        flex: 0 0 auto;

        display: flex;
        align-items: center;

        padding-left: 5px;

        span {
          display: block;
          font-size: 11pt;
          color: @grey8;
        }

        .page-size-input {
          margin: 0 5px;
        }
      }

      .search {
        flex: 0 1 100%;
        padding: 0 10px;

        text-align: right;

        .search-input {
          width: 350px;
          display: inline-block;
        }
      }

      .action-buttons {
        flex: 0 0 auto;

        .refresh-btn {
          padding: 0 11px;
        }
      }

    }

    .grid-body {
      width: 100%;
      flex: 0 1 100%;
      position: relative;
      border-bottom: solid thin @grey3;

      .grid-mask {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        pointer-events: none;

        .column-toggle-container {
          width: 33%; height: 100%;
          max-width: 400px;
          min-width: 250px;
          background-color: white;
          position: absolute;
          right: 0;
          border: solid thin @grey5;
          border-left: solid thin @grey6;
          border-right: none;
          pointer-events: auto;

          display: flex;
          flex-direction: column;

          .header {
            flex: 0 0 auto;

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 15px 10px;
            background: @grey2;
            border-bottom: solid thin @grey4;

            .close-icon {
              flex: 0 0 auto;
            }

            .input-row {
              flex: 0 1 100%;
              display: flex;
              padding-right: 10px;

              .select-all {
                flex: 0 0 auto;
                margin: 10px 15px 0 5px;
                cursor: pointer;
              }

              .filter-input {
                flex: 0 1 100%;
              }
            }
          }

          .body {
            flex: 0 1 100%;

            overflow-y: auto;


            .header-list {

              .list-item {
                font-size: 11pt;
                padding: 5px 10px;
                cursor: pointer;
                color: @grey8;

                &:nth-child(odd) {
                  background-color: @grey1;
                }

                &:hover {
                  background-color: @grey2;
                }
              }
            }
          }
        }

        .overlay {
          width: 100%; height: 100%;
          position: absolute;
          top: 0; left: 0;
          background-color: fadeout(black, 65%);
        }
      }

      .grid {
        height: 100%;
      }
    }

    .grid-footer {
      flex: 0 0 auto;
      display: flex;
      justify-content: flex-end;
    }

  }

</style>
