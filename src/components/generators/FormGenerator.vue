<template>
  <form
    autocomplete="off"
    class="form"
    @submit.prevent="submitForm"
    @reset.prevent="resetForm"
  >

    <div class="form-input-row"
      v-for="input in schema"
      :key="input.id"
    >

      <component
        :is="`${input.type}-input`"
        v-bind="input"

        :required="isRequired(input)"
        :error="inputError(input.id)"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      >
      </component>

    </div>

    <div class="form-actions-row" v-if="hasButtons">
      <btn type="reset">Cancel</btn>
      <btn type="submit" theme="success">Ok</btn>
    </div>

  </form>
</template>

<script>
  import { isNil, has } from 'lodash'
  import { validationMixin } from 'vuelidate'
  import { validators, errors } from '@/services/ValidationService'
  import FormService from '@/services/FormService'

  export default {
    name: 'form-generator',
    mixins: [validationMixin],
    props: {
      schema: {
        type: Array,
        required: true
      },
      initialValues: {
        type: Object,
        required: false,
        default () { return {} }
      },
      hasButtons: {
        type: Boolean,
        default: true
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
        this.schema.forEach(input => {
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
            ...this.schema

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
        return has(this.schema.find(input => input.id === id), 'validations')
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
      getFormattedInputValues (type) {

        return Object
          .keys(this.inputValues)
          .reduce((result, key) => {

            FormService.formFormatter(
              type,
              result,
              this.schema.find(input => input.id === key), // find associated input
              this.inputValues[key] // pass value
            )

            return result
          }, {})

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
          this.$emit('formSubmit', this.inputValues)
        }
      },
      resetForm () {
        this.inputValues = {}
        this.createInitialInputValues()
        this.$emit('formCancel')
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
