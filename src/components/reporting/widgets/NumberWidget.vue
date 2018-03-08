<template>
  <div class="panel widget" :class="[createWidgetClass(), widgetStateClass]">

    <div class="widget-icon" :class="'strap-text-' + this.theme">
      <div class="icon-circle">
        <i class="fa" :class="(isLoading || error) ? iconClass : 'fa-' + icon" ></i>
      </div>
    </div>

    <div class="widget-content">
      <h2 class="analytic" :class="'strap-text-' + this.theme">{{(analytic) ? analytic.toLocaleString() : '...'}}</h2>
      <h5 class="title">{{title}}</h5>
    </div>

  </div>
</template>

<script>

  // import dataService from '../../services/DataService'

  export default {

    props: {

      id: {
        type: String,
        required: true
      },

      title: {
        type: String,
        required: true
      },

      endpoint: {
        type: String,
        required: false,
        default: 'info'
      },
      params: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      },

      theme: {
        type: String,
        required: false,
        default: 'info'
      },

      icon: {
        type: String,
        required: true
      },

      bordered: {
        type: String,
        default: false
      },

      size: {
        type: String,
        default: 'lg'
      }

    },

    computed: {
      isLoading () {
        return this.loading || this.minLoading
      },
      widgetStateClass () {
        return {
          'strap-panel-loading': this.isLoading,
          'strap-panel-error': this.error
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
        loading: false,
        minLoading: true,
        error: false,
        analytic: ''
      }
    },
    mounted () {
      this.buildWidget()
      setTimeout(() => { this.minLoading = false }, 1000)
    },
    methods: {
      createWidgetClass () {
        return [
          'widget-' + this.size,
          'bg-' + this.theme,
        ]
      },
      async buildWidget () {

        this.loading = true

        try {
          this.loading = false
          let result = await this.getData()

          this.analytic = result[this.id]
        }
        catch (error) {
          console.log(error)
          this.error = true
        }
      },
      getData () {

        let configData = {
          params: JSON.parse(JSON.stringify(this.params)),
          endpoint: this.endpoint
        }

        // return dataService.get(this.params, this)
      }
    }
  }
</script>

<style lang="less" scoped>

  // @import "../../../static/layouts/theme/assets/css/strap-variables";
  // @import "../../../static/layouts/theme/assets/css/strap-helper";
  @import '../../../styles/component-helper.less';

  .widget {
    width: 100%; height: 100%;

    display: flex;

    .widget-icon {
      height: 100%;

      flex: 0 0 80px;
      transition: all .25s cubic-bezier(0,.34,.42,.99);

      // .center-content;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon-circle {
        width: 60px; height: 60px;
        background-color: fadeout(white, 100%);
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 22pt;
        color: white;
        margin: 0 auto;
      }
    }

    .widget-content {
      height: 100%;
      flex: 0 1 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;

      opacity: 1;
      transition-delay: .2s;
      transition: opacity .2s cubic-bezier(1,.01,1,1);

      .analytic {
        flex: 0 1 auto;
      }

      .title {
        flex: 0 1 auto;

        color: @grey7;
        // .thin;
      }

    }

    &.strap-panel-error {

      & > .widget-icon {
        flex: 0 0 100%;
      }

      & > .widget-content {
        opacity: 0;
      }

    }

    &.strap-panel-loading {

      & > .widget-icon {
        flex: 0 0 100%;

        .icon-circle > i {
          color: @grey6
        }
      }

      & > .widget-content {
        opacity: 0;
        display: none;
      }
    }

  }

</style>
