'use strict'

import axios from 'axios'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions'

let querystring = require('querystring')

let defaultConfig = {
  baseURL: 'https://trials-int.nci.nih.gov/strap/mock/ui_mock/',
  params: {},
  endpoint: '/'
}

let pendingAPIRequests = []

// ---------- axios defaults ----------

// change serializer default to handle arrays
axios.defaults.paramsSerializer = function (params) {
  return querystring.stringify(filterParams(params))
}

// ---------- exposed functions ----------

let get = (config) => {

  // create token source for cancellation and add it to the stack
  let source = axios.CancelToken.source()
  pendingAPIRequests.push(source)

  // build query object, set defaults for values not provided
  let configData = {
    baseURL: config.baseURL || defaultConfig.baseURL,
    params: config.params || defaultConfig.params,
    endpoint: config.endpoint || defaultConfig.endpoint,
    headers: config.headers || setDefaultHeader(),
    responseType: config.responseType || '',
    cancelToken: source.token,
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, true))
  }

  // make request
  return new Promise((resolve, reject) => {
    axios.get(configData.endpoint, configData)

      .then(response => {
        resolve(response.data)
      })

      .catch(error => {

        // format error message, log it, then return appropriate error message to the component if call wasn't canceled
        if (!axios.isCancel(error)) {
          reject(error)
        }
      })

  })
}


let cancelPendingAPIRequests = () => {
  for (let i = pendingAPIRequests.length - 1; i >= 0; i--) {
    pendingAPIRequests.splice(i, 1)[0].cancel('UI Canceling API request')
  }
}


// ---------- helper functions ----------

// if no header is passed in, replace it with the authorization header from localStorage
function setDefaultHeader () {
  return {
    'Cache-Control': 'no-cache',
    'Authorization': 'Bearer ' + localStorage.getItem('id_token')
  }
}

// this function filters out params that are set to 'all'
function filterParams (paramObj) {

  for (let key in paramObj) {
    if (paramObj.hasOwnProperty(key)) {

      // if the value is null
      // if the value is set to 'all'
      // if the value is an array and the array is empty
      let value = paramObj[key]
      let emptyParam = !value || value === 'all' || (Array.isArray(value) && value.length === 0)

      if (emptyParam) {
        delete paramObj[key] // remove the entry
      }
    }
  }

  return paramObj
}

// get a local file and return it's contents
let getLocalFile = (path) => {
  return new Promise((resolve, reject) => {
    axios.get(path)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      console.log(error)
      reject(new Error('Error getting file'))
    })
  })
}


export default {
  get,
  cancelPendingAPIRequests,
  getLocalFile
}
