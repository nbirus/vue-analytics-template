import { findIndex } from 'lodash'

let toggleFromArray = (value, array) => {
  let index = findIndex(array, value)

  if (index === -1) {
    array.push(value)
  }
  else {
    array.splice(value, 1)
  }

  return array
}

// helpers
let isFalsey = (data) => {

  // number/boolean
  if (typeof (data) === 'number' || typeof (data) === 'boolean') {
    return !data
  }

  // undefined
  if (typeof (data) === 'undefined' || data === null) {
    return true
  }

  // array
  if (typeof (data.length) !== 'undefined') {
    return data.length === 0
  }

  // object
  let count = 0
  for (let i in data) {
    if (data.hasOwnProperty(i)) {
      count++
    }
  }

  return count === 0

}

export default {
  toggleFromArray,
  isFalsey
}
