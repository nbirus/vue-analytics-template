const defaultValues = {
  'text-input': '',
  'checkbox-input': [],
  'radio-input': '',
  'pill-input': '',
  'form-list-input': [],
  'datepicker-input': [],
  'select-input': undefined, // depends on props, defined in the component
  'color-input': ''
}

/**
 * @mixin
 */
export default {
  props: {
    
    inputValue: {
      required: false,
      default () {
        // pull default value from list above
        return defaultValues[this.$options.name]
      }
    },

    id: {
      type: String,
      required: false,
      default: 'input'
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },

    // form modifiers
    required: {
      required: false,
      default: false
    },
    error: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    $updateValue (updatedValue) {

      // emit event with new value on change
      this.$emit('changed', updatedValue)

      // if the '.sync' is used on the prop, it will be 2-way bound
      this.$emit('update:inputValue', updatedValue)

    }
  }
}
