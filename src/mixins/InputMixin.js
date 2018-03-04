export default {
  props: {

    // identification
    id: {
      type: String,
      required: false,
      default: 'input'
    },
    label: {
      type: String,
      required: false
    },

    // value
    inputValue: {
      required: true
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
      required: false,
      default: false
    },
    errorText: {
      type: String,
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
