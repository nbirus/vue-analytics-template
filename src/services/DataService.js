'use strict'

import axios from 'axios'

let querystring = require('querystring')

const defaultConfig = {
  baseURL: '',
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
    cancelToken: source.token
  }

  // make request
  return new Promise((resolve, reject) => {
    axios.get(configData.endpoint, configData)

      .then(response => {
        resolve(response.data)
      })

      .catch(error => {
        if (!axios.isCancel(error)) {
          reject(error)
        }
      })

  })
}


let cancelPendingAPIRequests = () => {
  for (let i = pendingAPIRequests.length - 1; i >= 0; i--) {
    pendingAPIRequests.splice(i, 1)[0].cancel('canceled')
  }
}


// ---------- helper functions ----------

// if no header is passed in, replace it with the authorization header from localStorage
function setDefaultHeader () {
  return {
    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5hdGhhbi5iaXJ1c0BuaWguZ292IiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyLzk0Nzg2MTA0NDMxZWY3ODUzZjIzZTBiYTVhZmYwMDcyP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbmEucG5nIiwibmlja25hbWUiOiJuYXRoYW4uYmlydXMiLCJuYW1lIjoibmF0aGFuLmJpcnVzQG5paC5nb3YiLCJ1c2VyX21ldGFkYXRhIjp7fSwiYXBwX21ldGFkYXRhIjp7ImF1dGhvcml6YXRpb24iOnsicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkRldmVsb3BlciJdfSwibm90aWZpZWRfb2ZfcGFzc3dvcmRfZXhwaXJhdGlvbiI6dHJ1ZSwic2t1bmt3b3JrcyI6dHJ1ZX0sImF1dGhvcml6YXRpb24iOnsicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkRldmVsb3BlciJdfSwibm90aWZpZWRfb2ZfcGFzc3dvcmRfZXhwaXJhdGlvbiI6dHJ1ZSwic2t1bmt3b3JrcyI6dHJ1ZSwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciIsIkRldmVsb3BlciJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwidXNlcl9pZCI6ImF1dGgwfDU5OWRmYzU5NmJlNWIwNWYwNTBhOTFmMyIsImNsaWVudElEIjoiTDFfVzZra2pOVzdHOHZCLUZieWVNazZwQ2J6YjNQR3EiLCJpZGVudGl0aWVzIjpbeyJ1c2VyX2lkIjoiNTk5ZGZjNTk2YmU1YjA1ZjA1MGE5MWYzIiwicHJvdmlkZXIiOiJhdXRoMCIsImNvbm5lY3Rpb24iOiJTVFJBUC1JbnRlZ3JhdGlvbiIsImlzU29jaWFsIjpmYWxzZX1dLCJ1cGRhdGVkX2F0IjoiMjAxOC0wNi0xM1QxNDozMToyNy40NTdaIiwiY3JlYXRlZF9hdCI6IjIwMTctMDgtMjNUMjI6MDY6MTcuODI4WiIsIm11bHRpZmFjdG9yIjpbImdvb2dsZS1hdXRoZW50aWNhdG9yIiwiZHVvIl0sImlzcyI6Imh0dHBzOi8vbmNpc3RyYXAuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDU5OWRmYzU5NmJlNWIwNWYwNTBhOTFmMyIsImF1ZCI6IkwxX1c2a2tqTlc3Rzh2Qi1GYnllTWs2cENiemIzUEdxIiwiaWF0IjoxNTI4OTAwMjk3LCJleHAiOjE1Mjk1MDUwOTcsImFjciI6Imh0dHA6Ly9zY2hlbWFzLm9wZW5pZC5uZXQvcGFwZS9wb2xpY2llcy8yMDA3LzA2L211bHRpLWZhY3RvciIsImFtciI6WyJtZmEiXSwiYXRfaGFzaCI6InNyeTR2aVZ0TVloc2hKcTBNUHV3UHciLCJub25jZSI6InBoallsS1FUNkRFT3Fka0tEZnl2aTJORTdvalliWG5lIn0.drBWxatVmJd0kX_8zBmmu6ZPqEOR3PkQJK2_huHjj3k'
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


export default {
  get,
  cancelPendingAPIRequests
}
