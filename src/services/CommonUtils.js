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

export default {
  toggleFromArray
}
