<template>
  <div>
    <tabs sidebar simpleSidebar>
      <tab
        v-for="schema in schemaGroups" :key="schema.name"
        :name="schema.name"
      >
        <div class="form-tab">
          <h2>{{schema.name}}</h2>

          <form-generator
            ref="advancedForm"
            :schema="schema.schema"
            :initialValues="formObject"
            :hasButtons="false"

            @formSubmit="advancedSubmit"
            @formChanged="advancedChanged"
            @formCancel="advancedActive = false"
          >
          </form-generator>
        </div>

      </tab>
    </tabs>
  </div>
</template>

<script>
  import FormGenerator from '@/components/generators/FormGenerator'

  export default {
    name: 'chart-builder',
    components: {
      FormGenerator
    },
    props: {
      schemaGroups: {
        type: Array,
        required: true
      }
    }
  }
</script>


<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .form-tab {
    padding: 0 2em;

    h2 {
      margin-bottom: 1rem;
    }

  }

</style>
