<template>
  <div>
    <slot :_response="response" :_state="state"/>
  </div>
</template>

<script>
  import DataMixin from '@/mixins/DataMixin'

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
        response: {}
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      async getData () {
        console.log(this.apiConfig)
        try {
          this.state.loading = true
          this.response = await this.$get(this.apiConfig)
          this.state.loading = false
        }
        catch (error) {
          this.$throwError(error)
        }
      }
    },
    watch: {
      apiConfig: {
        handler () {
          this.getData()
        },
        deep: true
      }
    }
  }
</script>
