import Vue from 'vue'


let getCheckboxColumn = () => {
  return {
    field: 'checkbox',
    headerName: ' ',
    suppressSorting: true,
    unSortIcon: false,
    show: true,
    showRowGroup: true,
    width: 27,
    cellRendererFramework: getCellRenderer('checkbox')
  }
}


// ---- helpers ----
const cellRendererMap = {
  checkbox: {
    template: '<input type="checkbox" :checked="isSelected()" />',
    methods: {
      isSelected () {
        return this.params.node.selected
      }
    }
  }
}

function getCellRenderer (cellRenderer) {
  return Vue.extend(cellRendererMap[cellRenderer])
}

export default {
  getCheckboxColumn
}
