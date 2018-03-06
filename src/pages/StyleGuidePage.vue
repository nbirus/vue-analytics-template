<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">
        <div class="page-title-container">
          <h2>Style Guide</h2>
        </div>
      </div>


    </div>

    <div class="page-body">

      <div class="panel style-panel">
        <tabs sidebar searchable theme="first">

          <!-- colors -->
          <tab name="Colors">

            <div class="panel-header">
              <h2>Colors</h2>
            </div>

            <div class="panel-body darken">

              <div class="panel-block">
                <h4>Theme Colors</h4>
              </div>

              <div class="panel-block">
                <h4>Special Colors</h4>

              </div>

              <div class="panel-block">
                <h4>All Colors</h4>
              </div>

            </div>
          </tab>

          <!-- panels -->
          <tab name="Panels">

            <div class="panel-header">
              <h2>Panels</h2>
            </div>

            <div class="panel-body darker">
              <div class="panel-block">


                <div class="panel bar-left bar-first panels-panel">
                  Bar Left
                </div>

                <div class="panel bar-top bar-third panels-panel">
                  Bar Top
                </div>

                <div class="panel bar-right panels-panel">
                  Bar Right
                </div>

                <div class="panel bar-bottom panels-panel">
                  Bar Bottom
                </div>

              </div>
            </div>
          </tab>

          <!-- buttons -->
          <tab name="Buttons">
            <div class="panel-header">
              <h2>Colors</h2>
            </div>

            <div class="panel-body">

              <div class="panel-section">
                <h4>Default Buttons</h4>
                <btn v-for="color in colors" :key="'b' + color" :theme="color" style="margin: 10px 10px 0 0">{{color}}</btn>
              </div>

              <div class="panel-block">
                <h4>Icon Buttons</h4>
                <btn
                  style="margin: 10px 10px 0 0"
                  v-for="color in colors"
                  :key="color"
                  :theme="color"
                  icon>
                  <i class="fa fa-magic"></i>
                </btn>
              </div>

              <div class="panel-section">
                <h4>Block Buttons</h4>
                <btn block style="margin: 10px 10px 0 0">Default button block</btn>
              </div>


            </div>
          </tab>

          <!-- tabs -->
          <tab name="Tabs">

          </tab>

          <tab name="Inputs">
            <div class="panel-header">
              <h2>Inputs</h2>
            </div>

            <div class="panel-body darken">

              <div class="panel-block" style="width: 400px;">

                <!-- text input -->
                <text-input class="form-space"
                  :id="'text-input'"
                  :label="'Text Input'"
                  :placeholder="'Default input'"
                  :required="inputsRequired"
                  :error="inputsError"
                  @changed="alert"
                />

                <!-- checkbox input -->
                <checkbox-input class="form-space"
                  :id="'checkbox'"
                  :label="'Checkbox Input'"
                  :inline="true"
                  :optionSource="'test'"
                  :required="inputsRequired"
                  :error="inputsError"
                  @changed="alert"
                />

                <!-- radio input -->
                <radio-input class="form-space"
                  :id="'radio-input'"
                  :label="'radio-input'"
                  :inline="false"
                  :optionSource="'test'"
                  :required="inputsRequired"
                  :error="inputsError"
                  @changed="alert"
                />

                <!-- pill input -->
                <pill-input class="form-space"
                  :id="'pills'"
                  :label="'Pill Input'"
                  :options="[
                    {'label': 'One', 'value': 'one'},
                    {'label': 'Two', 'value': 'Two'},
                    {'label': 'Three', 'value': 'three'}
                  ]"
                  :required="inputsRequired"
                  :error="inputsError"
                  @changed="alert"
                />

                <!-- form list input -->
                <form-list-input class="form-space"
                  :id="'form-input'"
                  :label="'Form List Input'"
                  :form="[
                    {
                      'type': 'text',
                      'id': 'text',
                      'label': 'Text Input',
                      'placeholder': 'Enter some input..',
                      'required': true
                    },
                    {
                      'type': 'checkbox',
                      'id': 'checkbox',
                      'label': 'Checkbox Input',
                      'inline': true,
                      'optionSource': 'test',
                      'required': true
                    }
                  ]"
                  :itemName="'form item'"
                  :required="inputsRequired"
                  :error="inputsError"
                  @changed="alert"
                />

                <!-- date range input -->
                <date-range-input class="form-space"
                  :id="'date-range'"
                  :label="'Date Range Input'"
                  :initialValue="['2018-03-14', '2018-04-12']"
                  :required="inputsRequired"
                  :error="inputsError"
                  @changed="alert"
                />

              </div>

            </div>
          </tab>

          <tab name="Form Generator">
            <div class="panel-header">
              <h2>Form Generator</h2>
            </div>

            <div class="panel-body">

              <div class="panel-section">

                <div class="panel-block">
                  <form-generator
                    :inputs="testForm"
                    :initialValues="initialValues"
                    :breakFormIndex="2"

                    @formChanged="formChanged"
                    @formSubmited="formSubmited"
                  >
                  </form-generator>
                </div>

              </div>
            </div>
          </tab>

          <tab name="Grid">
            <div class="panel-header">
              <h2>Static Data Grid</h2>
            </div>

            <div class="panel-body">

              <grid style="height: 500px"
                id="test-grid"

                :data="data"
                :columns="columns"

                :canSort="false"
                :canResizeColumns="true"
                :canMoveColumns="false"

                :paginate="true"
                :initialPageSize="20"

                :canSearch="true"
                :canToggleColumns="true"

                :canSelect="true"
                :canSelectMultiple="true"

                :showRowDetail="false"

              />


            </div>
          </tab>

          <tab name="Dashboard">
            <div class="panel-header">
              <h2>Dashboard</h2>
            </div>

            <div class="panel-body darken">

              <div class="panel-block">

                <div class="panel" style="width: 400px; height: 300px;">

                  <div class="panel-body">

                  </div>

                  <div class="panel-footer">
                    Trials by Primary Purpose
                  </div>

                </div>

              </div>

            </div>
          </tab>

        </tabs>
      </div>
    </div>

  </div>
</template>

<script>
  import FormGenerator from '../components/generators/FormGenerator'
  import Grid from '../components/reporting/Grid'
  import TestForm from '../../static/data/forms/test-form.json'

  import TestData from '../../static/data/grid-headers/test-data2.json'
  import TestColumns from '../../static/data/grid-headers/test-headers2.json'

  export default {
    name: 'style-guide',
    components: { FormGenerator, Grid },
    data () {
      return {
        colors: [
          'default',
          'first',
          'second',
          'third',
          'fourth',
          'fifth'
        ],

        inputsRequired: false,
        inputsError: '',

        textInput: '',
        testForm: TestForm,
        initialValues: {},

        data: TestData,
        columns: TestColumns
      }
    },
    methods: {
      alert (text) {
        console.log(text)
      },
      formChanged (obj) {},
      formSubmited (obj) {
        // console.log('formSubmited')
        // console.log(obj)
        this.initialValues = JSON.parse(JSON.stringify(obj))
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../styles/component-helper.less';

  .form-space {
    margin-bottom: 20px;
  }

  .style-panel {
    height: 80vh;

    .tabs {
      height: 100%;
    }
  }

  .panels-panel {
    display: inline-block;

    width: auto; height: auto;
    padding: 10px;
    margin: 10px;
  }

</style>
