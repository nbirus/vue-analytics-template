<template>
  <div class="panel widget" :class="[createWidgetClass(), widgetStateClass]">

    {{title}}
    {{(analytic) ? analytic.toLocaleString() : '...'}}
    <i class="fa" :class="(isLoading || error) ? iconClass : 'fa-' + icon" ></i>

  </div>
</template>

<script>
  import DataMixin from '../../../mixins/DataMixin'

  export default {
    mixins: [DataMixin],
    props: {
      title: {
        type: String,
        required: true
      },
      theme: {
        type: String,
        default: 'info'
      },
      icon: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'large'
      }
    },
    computed: {
      widgetStateClass () {
        return {
          'loading': this.isLoading,
          'error': this.error
        }
      },
      iconClass () {
        return {
          'fa-refresh fa-spin': this.isLoading,
          'fa-exclamation': this.error
        }
      }
    },
    data () {
      return {
        analytic: ''
      }
    },
    mounted () {
      this.buildWidget()
    },
    methods: {

      async buildWidget () {

        try {
          let result = await this.$get(this.apiConfig)
          this.analytic = result.count
          this.loading = false
        }
        catch (error) {
          this.$throwError(error)
        }
      },

      createWidgetClass () {
        return [
          'widget-' + this.size,
          'bg-' + this.theme
        ]
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../styles/component-helper.less';

  .widget {
    width: 100%; height: 100%;
    color: white;

    display: flex;

  }

</style>
