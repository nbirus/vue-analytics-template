<template>
  <div>
    <slot :_response="response" :_state="state"/>
  </div>
</template>

<script>
  import DataMixin from '@/mixins/DataMixin'
  import TestData from '../../../../static/data/grid-headers/test-data2.json'

  export default {
    name: 'data-wrapper',
    mixins: [DataMixin],
    props: {
      apiConfig: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        response: {},
        TestData: TestData
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        try {
          this.state.loading = true
          // this.response = await this.$get(this.apiConfig)
          this.response = this.TestData

          this.state.loading = false
        }
        catch (error) {
          this.$throwError(error)
        }
      }
    }
  }
</script>
