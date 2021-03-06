<template>
  <div class="grid-container" ref="gridContainer">

    <!-- ------ export modal ------ -->
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

          :inputValue.sync="exportFileType"
          :options="exportFileTypes.filter(type => exportTypes.includes(type.value))"

          label="Type"
          :hasLabel="true"
          :allowEmpty="false"
        >
        </select-input>

        <!--export buttons-->
        <div class="export-buttons">
          <btn theme="warning" @click="exportModal = false">Cancel</btn>
          <btn theme="success" @click="exportModal = false">Download</btn>
        </div>

      </div>

    </modal>

    <!-- ------ actions bar ------ -->
    <div class="grid-action-bar">

      <!--page size-->
      <div class="page-size">
        <span>Show</span>

        <select-input
          class="page-size-input"
          id="grid-page-size-select"

          placeholder="Select Page Size"
          optionSource="props"
          :options="pageSizeOptions"
          :allowEmpty="false"

          :disabled="stateActive"
          :inputValue="displayPageSize"
          @changed="size => gridAction('pageSize', size.value)"
        >
        </select-input>

        <span>of {{rowTotal | localeString}} entries</span>
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
      <div class="action-buttons links">

        <!--toggle columns-->
        <btn
          v-if="canToggleColumns"
          @click="toggleColumnsOpen = !toggleColumnsOpen"
          :disabled="stateActive"
        >
          Toggle Columns
        </btn>

        <!--export-->
        <btn
          v-if="canExport"
          @click="exportModal = true"
          :disabled="stateActive"
        >
          Export Table
        </btn>

        <!-- extra buttons -->
        <slot name="extra-action"></slot>

      </div>

    </div>

    <!-- ------ body ------ -->
    <div class="grid-body">

      <!--grid-->
      <ag-grid-vue
        ref="grid"
        class="grid ag-fresh" :class="{'disabled': stateActive}"
        :gridOptions="gridOptions"

        :rowData="gridRows"
        :columnDefs="filteredGridColumns"

        :enableServerSideSorting="true"
        :enableSorting="canSort"
        :enableColResize="canResizeColumns"
        :suppressMovableColumns="!canMoveColumns"

        :pagination="paginate"
        :paginationPageSize="pageSize"

        :quickFilterText="searchText"
        :rowSelection="(canSelectMultiple) ? 'multiple' : 'single'"

        :sortChanged="model => gridAction('sort', model.api.getSortModel())"
        :filterChanged="() => {}"

        :rowModelType="'inMemory'"
        :rowClicked="rowSelected"
      />

      <!--overlay-->
      <div class="grid-mask">

        <transition name="fade">
          <div class="overlay" v-if="overlayActive"></div>
        </transition>

        <!-- toggle headers -->
        <transition name="slide-in-from-right">
          <div class="column-toggle-container" v-if="toggleColumnsOpen">

            <div class="header">

              <div class="input-row">
                <input @click="toggleAllColumns" class="select-all" type="checkbox" :checked="allToggleColumnsSelected"/>
                <text-input :inputValue.sync="toggleColumnSearchText" class="filter-input" placeholder="Type to filter.."></text-input>
              </div>

              <btn class="close-icon" flat theme="first"
                   @click="toggleColumnsOpen = false"><i class="fa fa-chevron-right"></i>
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
        </transition>

        <!-- state -->
        <transition name="fade">
          <div class="state-container" v-if="stateActive">

            <div class="action loading" v-if="loading">
              <i class="fa fa-sync-alt fa-spin"></i> Loading
            </div>

            <div class="action error" v-else-if="error">
              <i class="fa fa-exclamation"></i> {{error}}
            </div>

            <div class="action error" v-else-if="empty">
              No Results
            </div>

          </div>
        </transition>

        <!-- active actions -->
        <transition name="slide-down">
          <div class="action-container" v-if="actionActive">

            <!-- page size change -->
            <div class="action page-number" v-if="actionType === 'pageNumber'">
              Page {{pageNumber + 1}}
            </div>

            <!-- page number change -->
            <div class="action page-size" v-if="actionType === 'pageSize'">
              Page size of {{displayPageSize.label}}
            </div>

            <!-- sort change -->
            <div class="action sort" v-if="actionType === 'sort'">
              <span v-if="pageSort.colId">Sort {{pageSort.colId | replaceUnderscores }} in {{pageSort.sort}} order</span>
              <span v-else>Clear Sort</span>
            </div>

          </div>
        </transition>

      </div>

    </div>

    <!-- ------ footer ------ -->
    <div class="grid-footer">

      <paginiation-input
        :inputValue="pageNumber"
        :pageSize="pageTotal"
        :disabled="stateActive"
        @changed="value => gridAction('pageNumber', value)"
      >
      </paginiation-input>

    </div>

  </div>
</template>

<script>
  import { AgGridVue } from 'ag-grid-vue'
  import { Modal } from 'uiv'
  import { remove, some, cloneDeep } from 'lodash'

  import PaginiationInput from '@/components/inputs/PaginiationInput'
  import GridService from '@/services/GridService'

  export default {
    name: 'grid',
    components: { AgGridVue, Modal, PaginiationInput },
    props: {

      // data
      id: {
        type: String,
        required: true,
        default: ''
      },

      // async
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      },

      // local
      rows: {
        type: Array,
        required: false,
        default: () => []
      },
      columns: {
        type: Array,
        required: false,
        default: () => []
      },
      rowTotal: {
        type: Number,
        default: 0
      },

      pageNumber: {
        type: Number,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 20
      },
      pageSort: {
        type: Object,
        default: () => ({})
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
      canRefresh: {
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
          suppressNoRowsOverlay: true,
          suppressRowClickSelection: true
        },
        gridRows: [],
        gridColumns: [],
        pageSizeOptions: [
          {value: 10, label: '10'},
          {value: 20, label: '20'},
          {value: 50, label: '50'},
          {value: 100, label: '100'},
          {value: 500, label: '500'}
        ],

        searchText: '',
        toggleColumnSearchText: '',
        suppressedColumns: [],
        toggleColumnsOpen: false,

        // actions
        actionMap: {
          'pageNumber': this.setPageNumber,
          'pageSize': this.setPageSize,
          'sort': this.setSort
        },
        actionType: '',
        actionActive: false,
        actionTimeout: undefined,

        // row selection
        selectedRows: [],

        // exporting
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

      // if grid state action is taking place
      stateActive () {
        return !!this.error || this.loading || this.empty
      },

      // columns passed to the grid
      filteredGridColumns () {
        return this.gridColumns.filter(column => !this.suppressedColumns.includes(column.field) && column.show)
      },

      // toggle columns
      toggleColumns () {
        return this.gridColumns.filter(column => {
          return (column.headerName.toLowerCase().indexOf(this.toggleColumnSearchText.toLowerCase()) > -1)
        })
      },
      allToggleColumnsSelected () {
        return this.filteredGridColumns.length === this.gridColumns.filter(column => !this.suppressedColumns.includes(column.field)).length
      },

      // actions
      overlayActive () {
        return this.toggleColumnsOpen
      },

      empty () {
        return this.rowTotal === 0
      },
      pageTotal () {
        return Math.floor(this.rowTotal / this.pageSize)
      },
      displayPageSize () {
        return this.pageSizeOptions.find(option => option.value === this.pageSize)
      }
    },
    mounted () {

      // set header definitions
      this.setHeader()

      // set rows
      this.setRows()

      // resize event
      window.addEventListener('resize', this.resizeIfNotScrollable)

    },
    methods: {

      // data
      setHeader () {

        let columns = cloneDeep(this.columns)

        // add checkbox row
        if (this.canSelect && columns[0].field !== 'checkbox') {
          columns.unshift(GridService.getCheckboxColumn())
        }

        // modify and attach other functions
        columns.map(column => {

          // add filters
          if (column.hasOwnProperty('filters')) {
            column.valueFormatter = (row) => this.$options.filters.filterLoop(row.value, column.filters)
          }

        })


        this.gridColumns = columns
      },
      setRows () {
        this.gridRows = this.rows
      },

      // grid actions
      gridAction (action, model) {
        if (!this.stateActive) {
          this.$emit(`${action}Changed`, model)
          this.showAction(action)
        }
      },

      // toggle coloumns
      toggleColumn (column) {
        column.show = !column.show
        this.resizeIfNotScrollable()
      },
      toggleAllColumns () {
        let flag = !this.allToggleColumnsSelected
        this.gridColumns.forEach(column => { column.show = flag })
        this.resizeIfNotScrollable()
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
      },

      // other
      resizeIfNotScrollable () {

        // make sure columns are defined
        if (!!this.$refs.gridContainer && this.gridOptions.columnApi) {
          let gridWidth = this.$refs.gridContainer.clientWidth
          let totalColsWidth = this.gridOptions.columnApi.getAllColumns()
            .reduce((total, column) => {
              total += (column.visible) ? column.actualWidth : 0
              return total
            }, 0)

          if (totalColsWidth < gridWidth) {
            this.$nextTick(() => { this.gridOptions.api.sizeColumnsToFit() })
          }
        }

      },
      showAction (action) {
        this.actionType = action

        if (this.actionTimeout) {
          clearTimeout(this.actionTimeout)
        }

        this.actionActive = true
        this.actionTimeout = setTimeout(() => { this.actionActive = false }, 1500)
      }

    },
    watch: {
      rows: {
        handler () {
          this.$nextTick(this.setRows)
        },
        deep: true
      },
      gridRows () {
        this.$nextTick(this.resizeIfNotScrollable)
      }
    },
    beforeDestroy () {
      document.removeEventListener('resize', this.resizeIfNotScrollable, false)
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/app-helper.less';

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
      padding: 0 0 .8rem 0;

      display: flex;
      align-items: center;

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
          width: auto;
        }
      }

      .search {
        flex: 0 1 100%;
        // padding: 0 10px;

        text-align: right;

        .search-input {
          width: 350px;
          display: inline-block;
        }
      }

      .action-buttons {
        flex: 0 0 auto;

        display: flex;
        align-items: center;

        button {
          display: inline-block;
          margin: 0 0 0 10px;
        }
      }

    }

    .grid-body {
      width: 100%;
      flex: 0 1 100%;
      position: relative;
      border: solid thin @grey4;

      .grid.disabled {
        pointer-events: none;
      }

      .grid-mask {
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        pointer-events: none;
        overflow: hidden;

        .overlay {
          width: 100%; height: 100%;
          position: absolute;
          top: 0; left: 0;
          background-color: fadeout(black, 90%);
          pointer-events: none;
        }

        .column-toggle-container {
          width: 25%; height: 100%;
          max-width: 400px;
          min-width: 250px;
          background-color: white;
          position: absolute;
          right: 0;
          border-left: solid thin @grey5;
          pointer-events: auto;

          display: flex;
          flex-direction: column;

          .header {
            flex: 0 0 auto;

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: .5em;
            background: @grey2;
            border-bottom: solid thin @grey4;

            .close-icon {
              flex: 0 0 auto;
            }

            .input-row {
              flex: 0 1 100%;
              display: flex;
              padding-right: .5em;

              .select-all {
                flex: 0 0 auto;
                margin: .9em .9em 0 .5em;
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

        .state-container {
          width: 100%; height: 100%;

          display: flex;
          justify-content: center;
          align-items: center;

          .stripe-gradient-transparent(black, 99%);

          .action {
            padding: .5rem 1rem;
            border-radius: 2px;

            width: auto;

            font-size: 1rem;
            color: white;
            background-color: fadeout(black, 36%);

            i {
              margin-right: .3rem;
            }

          }

        }

        .action-container {
          width: 100%; height: 100%;

          .action {
            position: absolute;
            top: 2rem; right: 3rem;
            padding: .5rem 1rem;
            border-radius: 2px;

            width: auto;

            font-size: 1rem;
            color: white;
            background-color: fadeout(black, 36%);

          }

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
      padding-top: 1rem;

      .pagination {
        margin: 15px;

        span {
          margin: 0 10px;
        }
      }
    }

  }

</style>
