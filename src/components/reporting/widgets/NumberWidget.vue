<template>
  <!-- rename to count -->
  <div class="panel widget" :class="[createWidgetClass(), widgetStateClass]">

    <div class="body">
      <div class="count">
        <!-- {{count ? count.toLocaleString() : ''}} -->
        <ICountUp
          :startVal="0"
          :endVal="count"
          :duration=".7"
        />
      </div>

      <label class="title">{{title}}</label>
    </div>

    <div class="icon">
      <i class="icons" :class="'icon-' + this.icon"></i>
    </div>

  </div>
</template>

<script>
  import DataMixin from '../../../mixins/DataMixin'
  import ICountUp from 'vue-countup-v2'

  export default {
    mixins: [DataMixin],
    components: { ICountUp },
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
        count: ''
      }
    },
    mounted () {
      this.buildWidget()
    },
    methods: {

      async buildWidget () {

        try {
          let result = await this.$get(this.apiConfig)
          this.count = result.count
          this.loading = false
        }
        catch (error) {
          this.$throwError(error)
        }
      },

      createWidgetClass () {
        return [
          'widget-' + this.size,
          'theme-' + this.theme
        ]
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/component-helper.less';

  .widget {
    width: 100%; height: 100%;
    color: white;

    display: flex;
    flex-wrap: wrap;
    padding: 15px;

    .body {
      flex: 0 0 auto;

      .count {
        font-size: 26pt;
        .f-r;
      }

      .title {
        color: fadeout(white, 25%);
        font-weight: 100;
      }
    }

    .icon {
      flex: 0 1 100%;
      font-size: 26pt;
      text-align: right;
      color: fadeout(white, 85%);
    }
  }

  @scope: {
    .generateThemeClasses({
      // has access to @name, @color, @color-dark, and @color-light
      .widget.theme-@{name} {
        .vertical-gradient(@color, darken(@color-dark, 2%));
      }

    });
  }
  @scope();



</style>
