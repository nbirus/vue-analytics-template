<template>

  <div class="panel widget" :class="[createWidgetClass(), widgetStateClass]">

    <!-- loading -->
    <div class="loading" v-if="loading">
      <div class="icon-circle">
        <i class="fa fa-sync-alt fa-spin"></i>
      </div>
    </div>

    <!-- error -->
    <div class="error" v-if="error">
      <div class="icon-circle">
        <i class="fa fa-exclamation"></i>
      </div>
    </div>

    <!-- body -->
    <transition name="slide-in-from-left">
      <div class="body" v-if="isReady">
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
    </transition>

    <!-- icon -->
    <transition name="slide-in-from-left">
      <div class="icon" v-if="isReady">
        <i class="icons" :class="'icon-' + this.icon"></i>
      </div>
    </transition>

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
          'loading': this.loading,
          'error': this.error
        }
      },
      isReady () {
        return !this.loading && !this.error
      }
    },
    data () {
      return {
        count: 0
      }
    },
    mounted () {
      this.buildWidget()
    },
    methods: {

      async buildWidget () {

        try {
          let result = await this.$get(this.apiConfig)
          this.count = parseInt(result.count, 10)
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

  @import (reference) '../../../styles/app-helper.less';
  @import (reference) '../../../styles/theme-generator.less';

  .widget {
    width: 100%; height: 100%;
    padding: @pad;
    overflow: hidden;

    color: white;

    display: flex;
    flex-wrap: wrap;

    .body {
      flex: 0 0 auto;

      .count {
        font-size: 2.4rem;
        .f-r;
      }

      .title {
        color: fadeout(white, 25%);
        font-weight: 100;
        font-size: 1rem;
      }
    }

    .icon {
      flex: 0 1 100%;
      font-size: 26pt;
      text-align: right;
      color: fadeout(white, 85%);
    }

    .loading, .error {
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

    }

    .error {
      .icon-circle {
        padding: 1.2em 1.8rem;
      }
    }

    &.loading {

    }
  }


  @count-widget-scope: {
    .generateThemeClasses({

      .widget.theme-@{name} {
        .vertical-gradient(darken(@color, 3%), @color);
        border-color: @color-dark!important;

        &.error {
          .stripe-gradient(@color) !important;

          .icon-circle {
            background-color: darken(@color, 4%);
          }
        }
      }

    });
  };
  @count-widget-scope();


</style>
