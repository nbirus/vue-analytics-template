import Vue from 'vue'
import router from '../router/index'

// ---------------- get columns ----------------
// {
//   action: 'cols'
// }
let createHeadersQueryParams = () => {
  return {
    action: 'cols'
  }
}

// ---------------- get rows ----------------
// {
//   items_per_page: 20,
//   page: 1,
//   sort: ''
// }
let createRowsQueryParams = (params, pageSize, pageNumber, sortString) => {

  return Object.assign({}, params,
    {
      items_per_page: (pageSize === 'All') ? -1 : pageSize, // if the page size is set to all, pass -1
      page: pageNumber,
      sort: sortString
    }
  )
}

// ---------------- export ----------------
// {
//   items_per_page: -1,
//   format: 'csv'
// }
let createExportQueryParams = (params, format) => {
  return Object.assign({}, params,
    {
      items_per_page: -1, // always return all rows when exporting
      format: format
    }
  )
}

let serveDownloadedFile = (file, fileName, fileType) => {

  let actualFileType = (fileType === 'xlsx') ? 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' : fileType
  let mimeType = ((actualFileType === 'pdf') ? 'text/' : 'application/') + actualFileType

  let blob = null

  if (actualFileType === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    blob = new Blob([file], {
      type: mimeType
    })
  } else {
    blob = new Blob(['\ufeff', (actualFileType === 'json') ? JSON.stringify(file) : file], { type: mimeType })
  }

  // let blob = new Blob(['\ufeff', (actualFileType === 'json') ? JSON.stringify(file) : file], { type: mimeType })

  // create dynamic element for download
  let link = document.createElement('a')
  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', fileName + '.' + fileType)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}


let linkRenderer = () => {
  return Vue.extend({
    template: '<a v-if="isLink()" @click="linkTo">{{params.value}}</a><span v-else>{{params.value}}</span>',
    methods: {
      isLink () {
        return this.params.colDef.hasOwnProperty('link')
      },
      linkTo () {
        router.push({ name: this.params.colDef.link, params: { id: this.params.value } })
      }
    }
  })
}

let checkboxRenderer = () => {
  return Vue.extend({
    template: '<i :class="isSelected()"></i>',
    methods: {
      isSelected () {
        return !this.params.node.selected ? 'fa fa-square-o' : 'fa fa-check-square-o'
      }
    }
  })
}


export default {
  createHeadersQueryParams,
  createRowsQueryParams,
  createExportQueryParams,
  serveDownloadedFile,
  linkRenderer,
  checkboxRenderer
}
