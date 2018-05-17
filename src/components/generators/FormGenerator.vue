<template>
  <form
    autocomplete="off"
    class="form"
    @submit.prevent="submitForm"
    @reset.prevent="resetForm"
  >

    <div class="form-input-row"
      v-for="input in inputs"
      :key="input.id"
    >

      <!-- text input -->
      <text-input
        v-if="input.type === 'text'"
        :id="input.id"
        :label="input.label"
        :placeholder="input.placeholder"

        :required="isRequired(input)"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      ></text-input>

      <!-- select input -->
      <select-input
        v-if="input.type === 'select'"
        :id="input.id"
        :label="input.label"
        :placeholder="input.placeholder"
        :optionSource="input.optionSource"
        :options="input.options"
        :optionPath="input.optionPath"
        :optionAPIConfig="input.optionAPIConfig"
        :multiselect="input.multiselect"
        :hasLabel="input.hasLabel"

        :required="isRequired(input)"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      ></select-input>

      <!-- checkbox input -->
      <checkbox-input
        v-if="input.type === 'checkbox'"
        :id="input.id"
        :label="input.label"
        :inline="input.inline"
        :optionSource="input.optionSource"

        :required="isRequired(input)"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      ></checkbox-input>

      <!-- radio input -->
      <radio-input
        v-if="input.type === 'radio'"
        :id="input.id"
        :label="input.label"
        :inline="input.inline"
        :optionSource="input.optionSource"

        :required="isRequired(input)"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      ></radio-input>

      <!-- pill input -->
      <pill-input
        v-if="input.type === 'pill'"
        :id="input.id"
        :label="input.label"
        :options="input.options"

        :required="input.required"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      ></pill-input>

      <!-- date range input -->
      <date-range-input
        v-if="input.type === 'date-range'"
        :id="input.id"
        :label="input.label"

        :required="input.required"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      ></date-range-input>

    </div>

    <div class="form-actions-row">
      <btn type="reset">Cancel</btn>
      <btn type="submit" theme="success">Ok</btn>
    </div>

  </form>
</template>

<script>
  import { isNil, isArray, isObject, has } from 'lodash'
  import { validationMixin } from 'vuelidate'
  import { validators, errors } from '@/services/ValidationService'

  export default {
    name: 'form-generator',
    mixins: [validationMixin],
    props: {
      inputs: {
        type: Array,
        required: true
      },
      initialValues: {
        type: Object,
        required: false,
        default () { return {} }
      }
    },
    data () {
      return {
        inputValues: {}
      }
    },
    mounted () {
      this.createInitialInputValues()
    },
    validations () {
      return this.createValidations()
    },
    methods: {

      // for each input, create a key value pair with it's initial value if it exists
      createInitialInputValues () {
        this.inputs.forEach(input => {
          this.updateValue(input.id, this.getInitialValue(input), false)
        })
      },
      getInitialValue (input) {

        // default to undefined
        let initialValue

        // initial value from JSON
        if (input.initialValue) {
          initialValue = input.initialValue
        }

        // initial value from props
        if (!isNil(this.initialValues[input.id])) {
          initialValue = this.initialValues[input.id]
        }

        return initialValue
      },

      // validations
      createValidations () {
        return {
          inputValues: {
            ...this.inputs

              // remove elements without validation rules
              .filter(input => this.hasValidation(input.id))

              // build validation object
              .reduce((inputValidations, input) => {

                inputValidations[input.id] = {

                  // loop over keys and build object of validation functions
                  ...Object
                    .keys(input.validations)
                    .reduce((result, rule) => {
                      result[rule] = validators[rule](input.validations[rule])
                      return result
                  }, {})
                }

                return inputValidations

              }, {})
          }
        }
      },
      hasValidation (id) {
        return has(this.inputs.find(input => input.id === id), 'validations')
      },
      isRequired (input) {
        return (input.validations) ? input.validations.hasOwnProperty('required') : false
      },
      inputError (id) {
        return this.hasValidation(id) && this.$v.inputValues[id].$error
          ? this.getErrorMessage(id)
          : undefined
      },
      getErrorMessage (id) {
        let error = 'Invalid input'

        this.$v.inputValues[id].$flattenParams()
          .forEach(rule => {
            if (!this.$v.inputValues[id][rule.name]) {
              error = errors[rule.name](rule.params)
            }
          })

        return error
      },
      isFormValid () {
        this.$v.inputValues.$touch()
        return !this.$v.$error
      },

      // formatting
      getFormattedInputValues () {

        return Object
          .keys(this.inputValues)
          .reduce((result, key) => {

            // remap return object to format value if needed
            result[key] = this.formatField(
              this.inputs.find(input => input.id === key), // find associated input
              this.inputValues[key] // pass value
            )

            return result
          }, {})

      },
      formatField (input, value) {

        let labelValueTypes = ['select', 'checkbox', 'radio']

        // check the type to see if it needs formatting
        if (labelValueTypes.includes(input.type)) {

          // if an array of objects, loop over each one
          if (isArray(value)) value = value.map(item => item.value)

          // if a single object, extract value field
          else if (isObject(value)) value = value.value
        }

        return value
      },

      // form actions
      updateValue (id, value, touchInput = true) {

        // touch input if it has validation
        if (this.hasValidation(id) && touchInput) {
          this.$v.inputValues[id].$touch()
        }

        this.$set(this.inputValues, id, value)
        this.$emit('formChanged', this.inputValues)
        this.$emit('update:initialValues', this.inputValues)
      },
      submitForm () {

        if (this.isFormValid()) {
          this.$emit('formSubmitted', this.inputValues)
        }

      },
      resetForm () {
        this.inputValues = {}
        this.createInitialInputValues()
        this.$emit('formReset')
      }
    }
  }
</script>

<style lang="less" scoped>

  .form {

    .form-input-row {
      margin-bottom: 15px;
    }

    .form-actions-row {
      display: flex;
      justify-content: flex-end;

      .btn:last-child {
        margin-left: 10px;
      }
    }
  }


</style>
