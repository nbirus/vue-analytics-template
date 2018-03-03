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

          </tab>

          <!-- tabs -->
          <tab name="Tabs">

          </tab>

          <tab name="Inputs">
            <div class="panel-header">
              <h2>Inputs</h2>
            </div>

            <div class="panel-body darken">

              <div class="panel-block">
                <text-input

                  id="text-input"
                  label="Text Input"

                  :inputValue="textInput"
                  @changed="alert"

                >
                </text-input>

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
                  <form-generator style="width: 400px"
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
              <h2>Grid</h2>
            </div>

            <div class="panel-body">
            </div>
          </tab>

        </tabs>
      </div>



      <!-- <div class="panel bar-left bar-first btns-panel">
        <div class="panel-body"><h2>Buttons</h2></div>
        <hr />
        <div class="panel-drawer">
          <h4>Default Buttons</h4>
          <btn block>block</btn>
          <btn v-for="color in colors" :key="'b' + color" :theme="color">{{color}}</btn>

          <hr />
          <br />
          <h4>Icon Buttons</h4>
          <btn
            v-for="color in colors"
            :key="color"
            :theme="color"
            icon>
            <i class="fa fa-magic"></i>
          </btn>
        </div>
      </div> -->
    </div>

  </div>
</template>

<script>
  import FormGenerator from '../components/generators/FormGenerator'
  import TestForm from '../../static/data/forms/test-form.json'

  export default {
    name: 'style-guide',
    components: { FormGenerator },
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

        textInput: '',
        testForm: TestForm,
        initialValues: {}
      }
    },
    methods: {
      alert (text) {
        console.log(text)
      },
      formChanged (obj) {},
      formSubmited (obj) {
        console.log('formSubmited')
        console.log(obj)
        this.initialValues = JSON.parse(JSON.stringify(obj))
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../styles/component-helper.less';

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
