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

          :inputValue="displayPageSize"
          @changed="size => gridAction('pageSize', size.value)"
        >
        </select-input>

        <span>of {{gridRows.length | localeString}} entries</span>
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

        <!-- refresh -->
        <btn
          v-if="canRefresh"
          @click="() => {}">
          <i class="fa fa-sync-alt"></i> Refresh
        </btn>

        <!--toggle columns-->
        <btn
          v-if="canToggleColumns"
          @click="toggleColumnsOpen = !toggleColumnsOpen">
          Toggle Columns
        </btn>

        <!--export-->
        <btn
          v-if="canExport"
          @click="exportModal = true">
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
        v-if="gridActive"
        class="grid ag-fresh"
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
        <div class="state-container" v-if="stateOverlayActive">

          <!-- loading -->
          <div class="action loading" v-if="loading">
            <div class="icon-circle">
              <i class="fa fa-sync-alt fa-spin"></i>
            </div>
          </div>

          <!-- error -->
          <div class="action error" v-if="error">
            <div class="icon-circle">
              <i class="fa fa-exclamation"></i>
            </div>
            <div class="message">
              {{error}}
            </div>
          </div>

        </div>

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
              <span v-if="pageSort.id">Sort {{pageSort.id | replaceUnderscores | titleCase }} in {{pageSort.sort}} order</span>
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
        @changed="value => gridAction('pageNumber', value)"
      >
      </paginiation-input>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import { AgGridVue } from 'ag-grid-vue'
  import { Modal } from 'uiv'
  import { remove, some } from 'lodash'

  import PaginiationInput from '@/components/inputs/PaginiationInput'


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

      gridActive () {
        return !this.error && !!this.gridRows.length
      },

      // columns passed to the grid
      filteredGridColumns () {
        return this.gridColumns.filter(column => !this.suppressedColumns.includes(column.field) && column.show)
      },

      // toggle
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
      stateOverlayActive () {
        return this.error || this.loading
      },

      pageTotal () {
        return Math.floor(this.gridRows.length / this.pageSize)
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

        // get passed in columns
        let columns = this.columns

        // add checkbox row if grid selectable
        if (this.canSelect && columns[0].field !== 'checkbox') {
          columns.unshift(checkboxColumn)
        }

        this.gridColumns = columns
      },
      setRows () {
        this.gridRows = this.rows
      },

      // grid actions
      gridAction (action, model) {
        if (this.gridActive) {
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
      gridRows () {
        this.$nextTick(this.resizeIfNotScrollable)
      }
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
      padding: .8rem 0;

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
            .icon-circle {
              font-size: 1.3rem;
              color: white;
              background-color: fadeout(black, 36%);
            }

            &.error {
              display: flex;
              flex-direction: column;
              align-items: center;

              .icon-circle {
                background-color: transparent;
                border: none;
                margin: 0;
                color: @c-danger;
              }

              .message {
                font-size: @font-size-lg;
              }
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
