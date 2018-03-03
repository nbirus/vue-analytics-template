<template>

  <div class="form-group">

    <!-- ---------------------- selector modal ---------------------- -->
    <modal v-model="formModal"
           :size="'md'"
           :keyboard="false"
           :title="'Add a ' + itemName"
           :footer="false"
           :backdrop="true">



      <div slot="default">

        <form-generator
          ref="form"
          :inputs="form"
          :initialValues="initialFormValues"
          @formReset="cancelModal"
          @formSubmited="value => { (isEditing) ? updateValue(value) : addValue(value) }"
        >
        </form-generator>

      </div>
    </modal>



    <!-- label -->
    <label
      v-if="label"
      :for="id + '-input'"
      :class="{'required': required}"
    >
      {{label}}
    </label>

    <div class="form-control">

      <!-- list of seleted values -->
      <ul class="value-list">
        <li v-for="(value, index) in inputValue" :key="index">


          <div class="value-items">

            <!-- each value as key value pair -->
            <div class="value" v-for="(subvalue, subkey, index) in value" :key="index">
              <span class="subkey">{{subkey}}</span>
              <span class="subvalue">{{subvalue}}</span>
            </div>

          </div>

          <div class="value-seperator"></div>

          <!-- edit or remove value -->
          <div class="value-actions">
            <btn type="button" icon flat small :onClick="() => { editValue(value, index) }"><i class="fa fa-pencil-alt"></i></btn>
            <btn type="button" icon flat small :onClick="() => { removeValue(index) }"><i class="fa fa-times"></i></btn>
          </div>

        </li>
      </ul>

      <!-- add values to the list button -->
      <div class="value-adder">
        <btn type="button" small block :onClick="() => { formModal = true }">
          <i class="fa fa-plus icon-margin"></i>Add a {{itemName}}
        </btn>
      </div>


    </div>

  </div>

</template>

<script>
  import InputMixin from '../../../mixins/InputMixin'
  import { Modal } from 'uiv'
  import { cloneDeep } from 'lodash'

  export default {
    beforeCreate () {
      this.$options.components.FormGenerator = require('../../generators/FormGenerator.vue').default
    },
    mixins: [InputMixin],
    components: { Modal },
    props: {
      form: {
        type: Array,
        required: true
      },
      primaryKey: {
        type: String,
        required: false,
        default: 'Item'
      },
      itemName: {
        type: String,
        required: false,
        deafult: 'item'
      }
    },
    data () {
      return {
        formModal: false,
        initialFormValues: {},
        isEditing: false,
        editingValueIndex: null
      }
    },
    methods: {
      addValue (value) {
        let valueClone = cloneDeep(value)
        let inputValueClone = cloneDeep(this.inputValue)
        inputValueClone.push(valueClone)

        this.$updateValue(inputValueClone)
        this.cancelModal()
      },
      removeValue (index) {
        let inputValue = cloneDeep(this.inputValue)
        inputValue.splice(index, 1) // remove item

        this.$updateValue(inputValue)
      },
      updateValue (value) {
        let valueClone = cloneDeep(value)
        let inputValueClone = cloneDeep(this.inputValue)
        inputValueClone.splice(this.editingValueIndex, 1, valueClone) // replace item

        this.$updateValue(inputValueClone)
        this.cancelModal()
      },

      editValue (item, index) {
        this.initialFormValues = cloneDeep(item)
        this.isEditing = true
        this.editingValueIndex = index

        this.$nextTick(() => {
          this.$refs.form.createInitialInputValues()
        })
        this.formModal = true
      },
      cancelModal () {
        this.isEditing = false
        this.editingValueIndex = null
        this.initialFormValues = {}
        this.formModal = false
        this.$nextTick(() => {
          this.$refs.form.createInitialInputValues()
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../styles/component-helper.less';

  .form-control {
    width: 100%; height: auto;

    line-height: @input-height;
    background-color: @input-bg-color;
    border: @input-border;

    .value-list {
      li {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        overflow: hidden;
        border-bottom: solid thin @grey4;

        &:last-child {
          border-bottom: solid thin @grey6;
        }

        &:nth-child(odd) {
          background-color: @grey2;

          .value-seperator {
            .horizontal-gradient(fadeout(@grey2, 100%), @grey2);
          }
        }

        .value-items {
          flex: 0 1 100%; height: 48px;
          max-width: calc(~'100% - 55px');
          overflow: hidden;

          display: flex;
          flex-wrap: nowrap;

          .value {
            flex: 0 0 auto;
            height: 100%;

            padding: 8px 10px;

            border-right: solid thin @grey3;

            .subkey {
              display: block;
              font-size: 10pt;
              line-height: 10px;
              color: @grey7;

            }

            .subvalue {
              .f-b;
              color: @grey9;
              margin-bottom: -3px;
            }

            &:last-child {
              border-right: none;
            }

          }
        }

        .value-seperator {
          width: 60px; height: 48px;
          position: absolute;
          right: 65px;
          .horizontal-gradient(fadeout(@grey1, 100%), @grey1);
        }

        .value-actions {
          flex: 0 0 60px;

          display: flex;
          flex-wrap: nowrap;
          align-items: center;

          padding-right: 5px;
          .btn {
            font-size: 10pt;
          }
        }
      }
    }

    .value-adder {
      .btn {
        border-top: none;
      }
    }

  }
</style>
