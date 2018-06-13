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
      result[schema.id] = value.map(item => (getLabel(schema, item))).join(', ')
    },
    api: (result, schema, value) => {
      result[schema.id] = (Array.isArray(value))
        ? value.map(item => (getValue(schema, item)))
        : getValue(schema, value)
    }
  },
  'color-picker': {
    default: ''
  }
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

// helpers
function isInputEmpty (customIsEmpty, value) {
  return (customIsEmpty)
    ? customIsEmpty(value)
    : CommonUtils.isFalsey(value)
}

function getLabel (schema, value) {
  return schema.optionLabel ? value[schema.optionLabel] : value.label
}

function getValue (schema, value) {
  return schema.optionValue ? value[schema.optionValue] : value.value
}


export default {
  inputModel,
  formFormatter
}
