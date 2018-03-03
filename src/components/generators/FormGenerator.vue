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
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      >
      </text-input>

      <!-- checkbox input -->
      <checkbox-input
        v-if="input.type === 'checkbox'"
        :id="input.id"
        :label="input.label"
        :inline="input.inline"
        :optionSource="input.optionSource"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      >
      </checkbox-input>

      <form-list-input
        v-if="input.type === 'form-list'"
        :id="input.id"
        :label="input.label"
        :form="input.form"
        :itemName="input.itemName"
        :primaryKey="input.primaryKey"
        :inputValue="inputValues[input.id]"
        @changed="value => updateValue(input.id, value)"
      >
      </form-list-input>

    </div>

    <div class="form-actions-row">
      <btn type="reset">Cancel</btn>
      <btn type="submit" theme="success">Ok</btn>
    </div>
  </form>

</template>

<script>
  import { isNil } from 'lodash'

  export default {
    props: {
      inputs: {
        type: Array,
        required: true
      },
      initialValues: {
        type: Object,
        required: false,
        default () { return {} }
      },
      breakFormIndex: {
        type: Number,
        required: false,
        default: 0
      }
    },
    data () {
      return {
        inputValues: {},
        defaultValues: {
          'text': '',
          'checkbox': [],
          'form-list': []
        }
      }
    },
    mounted () {
      // on mount create inputValues
      this.createInitialInputValues()
    },
    methods: {

      // for each input, create a key value pair with it's initial value if it exists
      createInitialInputValues () {
        this.inputs.forEach((input, index) => {
          this.updateValue(input.id, this.getInitialValue(input))
        })
      },

      updateValue (id, value) {
        this.$set(this.inputValues, id, value)
        this.$emit('formChanged', this.inputValues)
      },

      getInitialValue (input) {

        // input specific initial value
        let initialValue = this.defaultValues[input.type]

        // initial value from JSON
        if (input.initialValue) {
          initialValue = input.initialValue
        }

        // initial value from parent
        if (!isNil(this.initialValues[input.id])) {
          initialValue = this.initialValues[input.id]
        }

        return initialValue
      },
      submitForm () {
        this.$emit('formSubmited', this.inputValues)
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
      margin-bottom: 25px;
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
