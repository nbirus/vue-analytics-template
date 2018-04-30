'use strict'

import { required, maxLength, minLength } from 'vuelidate/lib/validators'

let validators = {
  required () {
    return required
  },
  maxLength,
  minLength
}

let errors = {
  required (params) {
    return 'This field is required'
  },
  minLength (params) {
    return 'This field must have a length of ' + params.min
  },
  maxLength (params) {
    return 'This field must be less than ' + params.max + ' characters'
  }
}

export {
  validators,
  errors
}
