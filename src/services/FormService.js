import CommonUtils from './CommonUtils'

const inputModel = {
  'text': {
    default: ''
  },
  'checkbox': {
    default: []
  },
  'radio': {
    default: ''
  },
  'pill': {
    default: ''
  },
  'form-list': {
    default: []
  },
  'datepicker': {
    default: []
  },
  'select': {
    default: undefined,
    visual: (result, schema, value) => {
      result[schema.id] = value.map(item => (item.label)).join(', ')
    },
    api: (result, schema, value) => {
      result[schema.id] = (Array.isArray(value))
        ? value.map(item => (item.value))
        : value.value
    }
  },
  'color-picker': {
    default: ''
  }
}

// is input value empty
function isInputEmpty (customIsEmpty, value) {
  return (customIsEmpty)
    ? customIsEmpty(value)
    : CommonUtils.isFalsey(value)
}

// main formatting function
let formFormatter = (formattingType, result, schema, value) => {

  // get input modal and formatting func
  let model = inputModel[schema.type]
  let formattingFunction = model[formattingType]

  // if input's value is not empty
  if (!isInputEmpty(model.isEmpty, value)) {

    // custom formatting if avalible
    if (formattingFunction) {
      formattingFunction(result, schema, value)
    }

    // otherwise default formatting
    else {
      result[schema.id] = value
    }

  }
}


export default {
  inputModel,
  formFormatter
}
