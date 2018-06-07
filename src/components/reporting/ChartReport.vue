<template>

  <fullscreen
    ref="fullscreen"
    :onExpand="expandChart"
    :onCollapse="collapseChart"
  >
    <div class="chart-report-panel" :class="chartStateClass">
      <div class="panel" ref="report">

        <!--header-->
        <div class="panel-header chart-header">

          <div class="chart-title" v-if="hasHeader">
            <h4 :class="textColor">{{activeChartTitle}}</h4>
            <h5 v-if="isChartReady && showTotal">{{totalCount | localeString}} {{countType}}</h5>
          </div>

          <div class="chart-actions" v-if="!hideActions && isChartReady">

            <dropdown menu-right>

              <!--expand-->
              <i v-if="canExpand"
                 v-tooltip.unenterable="expandActive ? 'Close' : 'Expand'"
                 :class="[textColor, (expandActive ? 'fa-compress' : 'fa-expand')]" class="fa"
                 @click="!expandActive ? $refs.fullscreen.expand() : $refs.fullscreen.collapse()"
              >
              </i>

              <!--options-->
              <i v-if="hasOptions"
                 v-tooltip.unenterable="'Options'"
                 :class="textColor" class="icons icon-options-vertical" data-role="trigger">
              </i>

              <!--toggle headers-->
              <i v-if="hasLegend"
                 v-tooltip.unenterable="'Toggle Headers'"
                 :class="textColor" @click="toggleColumnActive = true" class="fa fa-chevron-left">
              </i>

              <!-- drop-down -->
              <template slot="dropdown">

                <!--settings-->
                <li
                  v-if="settings.length"
                  @click="settingsActive = true"
                >
                  <a role="button"><i class="icons icon-settings"></i>Chart Settings</a>
                </li>

                <!--<li><a role="button"><i class="icons icon-share-alt"></i>Export</a></li>-->

                <!--screen shot-->
                <li @click="screenShotActive = true; $refs.fullscreen.expand()">
                  <a role="button"><i class="icons icon-camera"></i>Screen Shot</a>
                </li>

              </template>

            </dropdown>

          </div>

        </div>

        <!--chart-->
        <div class="panel-body chart-body" v-if="isChartReady">
          <div class="panel-block">

            <!--
              Pass along:
              - $props: shared ChartReport props
              - $attrs: props specific to the underlying chart
            -->

            <component
              :is="`${chartType}-chart`"
              v-bind="[$props, $attrs]"

              :theme="activeChartTheme"
              :suppressedHeaders="suppressedHeaders"
              :expanded="expandActive"

              @chartRendered="chartRendered"
              @chartClick="chartClick"
            >
            </component>

          </div>
        </div>

        <!--api states-->
        <div class="panel-body chart-api-states">

          <!-- loading -->
          <transition name="icon-circle" appear>
            <div class="loading" v-if="loading">
              <div class="icon-circle">
                <i class="fa fa-sync-alt fa-spin"></i>
              </div>
            </div>
          </transition>

          <!-- error -->
          <div class="error" v-if="error">
            <div class="icon-circle"><i class="fa fa-exclamation"></i></div>
            <h4 class="error-message">{{error}}</h4>
          </div>

        </div>

        <!--sidebar-->
        <div class="chart-sidebar-mask" ref="sidebar">

          <div class="overlay" v-if="overlayActive"></div>

          <transition name="slide-in-from-right" mode="in-out">
            <div class="sidebar" v-if="sidebarActive">

              <!--toggle headers-->
              <div class="sidebar-item toggle-headers" v-if="toggleColumnActive">

                <div class="sidebar-header">

                  <div class="input-row">
                    <input @click="toggleAllHeaders" class="select-all" type="checkbox" :checked="!suppressedHeaders.length"/>
                    <text-input :inputValue.sync="toggleColumnSearchText" class="filter-input" placeholder="Filter.."></text-input>
                  </div>

                  <btn flat class="close-icon" @click="toggleColumnActive = false">
                    <i class="fa fa-chevron-right"></i>
                  </btn>

                </div>

                <div class="sidebar-body">

                  <ul class="header-list">
                    <li class="list-item"
                        v-for="(header, index) in filteredHeaders"
                        :key="index"
                        v-if="header.id"
                        @click="toggleHeader(header.id)">

                      <input type="checkbox" :checked="!suppressedHeaders.includes(header.id)"/>
                      <div class="label">{{header.name}}</div>
                      <div class="value">{{header.value | localeString}}</div>
                    </li>
                  </ul>
                </div>

              </div>

              <!--settings-->
              <div class="sidebar-item settings" v-if="settingsActive">

                <div class="sidebar-header">

                  <h2>Settings</h2>

                  <btn flat class="close-icon" @click="settingsActive = false">
                    <i class="fa fa-chevron-right"></i>
                  </btn>

                </div>

                <div class="sidebar-body">

                </div>

              </div>

              <!--screen shot chart-->
              <div class="sidebar-item settings" v-if="screenShotActive">

                <div class="sidebar-header">

                  <h2>Screen Shot</h2>

                  <btn flat class="close-icon" @click="screenShotActive = false">
                    <i class="fa fa-times"></i>
                  </btn>

                </div>

                <div class="sidebar-body screen-shot">

                  <form-generator
                    :schema="screenShotForm"
                    :initialValues.sync="initialScreenShotValues"

                    @formSubmit="createScreenShot"
                    @formCancel="screenShotActive = false"
                  ></form-generator>

                </div>

              </div>

            </div>
          </transition>

        </div>

      </div>
    </div>

  </fullscreen>

</template>

<script>
  import Charts from './charts'
  import FormGenerator from '@/components/generators/FormGenerator'
  import Fullscreen from '@/components/utils/Fullscreen'

  import { Dropdown } from 'uiv'
  import domtoimage from 'dom-to-image'

  import ScreenShotForm from '../../../static/data/forms/chart-screenshot-form'

  export default {
    name: 'chart-report',
    components: {
      ...Charts,
      Dropdown,
      FormGenerator,
      Fullscreen
    },
    props: {

      // state
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      },

      // model
      id: {
        type: String,
        required: true
      },
      chartData: {
        required: false
      },
      chartType: {
        type: String,
        required: true
      },

      // data
      chartTitle: {
        type: String,
        default: ''
      },
      countType: {
        type: String,
        default: 'items'
      },
      theme: {
        type: String,
        default: 'inverse'
      },
      settings: {
        type: Array,
        default: () => []
      },
      initialParams: {
        type: Object,
        default () {
          return {}
        }
      },

      // flags
      showTotal: {
        type: Boolean,
        default: true
      },
      hasHeader: {
        type: Boolean,
        default: true
      },
      canExpand: {
        type: Boolean,
        default: true
      },
      hasLegend: {
        type: Boolean,
        default: true
      },
      hasOptions: {
        type: Boolean,
        default: true
      },
      canScreenShot: {
        type: Boolean,
        default: true
      }

    },
    data () {
      return {

        // header data
        toggleColumnSearchText: '',
        chartHeaders: [],
        suppressedHeaders: [],

        // flags
        expandActive: false,
        toggleColumnActive: false,
        settingsActive: false,
        screenShotActive: false,

        // screen shot
        screenShotForm: ScreenShotForm,
        initialScreenShotValues: {
          title: this.chartTitle || 'chart',
          filename: 'filename',
          color: this.theme
        }

      }
    },
    computed: {

      isChartReady () {
        return !this.loading && !this.error && !!this.chartData
      },

      activeChartTitle () {
        return this.screenShotActive
          ? this.initialScreenShotValues.title
          : this.chartTitle
      },

      activeChartTheme () {
        return this.screenShotActive
          ? this.initialScreenShotValues.color
          : this.theme
      },

      totalCount () {
        return this.chartHeaders
          .filter(item => !this.suppressedHeaders.includes(item.id))
          .reduce((total, item) => {
            total += item.value
            return total
          }, 0)
      },

      overlayActive () {
        return (
          this.settingsActive ||
          this.toggleColumnActive
        )
      },

      sidebarActive () {
        return (
          this.settingsActive ||
          this.toggleColumnActive ||
          this.screenShotActive
        )
      },

      hideActions () {
        return this.screenShotActive
      },

      filteredHeaders () {
        return this.chartHeaders.filter(column => {
          return (column.name.toLowerCase().indexOf(this.toggleColumnSearchText.toLowerCase()) > -1)
        })
      },

      chartStateClass () {
        return {
          'loading': this.loading,
          'error': this.error,
          'sidebar': this.sidebarActive,
          'expanded': this.expandActive,
          'screen-shot': this.screenShotActive
        }
      },

      textColor () {
        return [
          (!this.error) ? 'text-' + this.theme : null,
          (this.error) ? 'text-danger' : null
        ]
      }

    },
    methods: {

      // expand / collapse
      expandChart () {
        this.expandActive = true
      },
      collapseChart () {
        this.expandActive = false
        this.screenShotActive = false
      },


      chartRendered (headers, total) {
        this.chartHeaders = headers
        this.chartTotal = total
      },
      chartClick (model) {
        console.log('Chart Click:')
        console.log(model)
      },

      // headers
      toggleHeader (header) {
        let index = this.suppressedHeaders.indexOf(header)

        if (index === -1) {
          this.suppressedHeaders.push(header)
        }
        else {
          this.suppressedHeaders.splice(index, 1)
        }
      },
      toggleAllHeaders () {
        (this.suppressedHeaders.length)
          ? this.suppressedHeaders = []
          : this.suppressedHeaders = this.chartHeaders.map(header => header.name)
      },

      // screen shot
      createScreenShot (options) {

        domtoimage
          .toJpeg(this.$refs.report, {
            quality: 1,
            bgcolor: 'white',
            filter: (node) => node !== this.$refs.sidebar
          })
          .then(dataUrl => {

            let link = document.createElement('a')
            link.download = `${options.filename}.jpeg`
            link.href = dataUrl
            link.click()

            this.$refs.fullscreen.collapse()

          })
          .catch(error => {
            console.log(error)
            this.$refs.fullscreen.collapse()
          })

      }

    }
  }

</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .chart-report-panel {
    width: 100%; height: 100%;
    font-size: 1rem;

    // chart expanded
    &.expanded > .panel {
      transform: scale(1)!important;
      font-size: 1.1em;

      .chart-header {
        text-align: center;
      }
    }

    // sidebar open
    &.sidebar > .panel {
      /*transform: scale(1.03);*/
      @shadow: 0 0 5px rgba(0,0,0,0.06), 0 5px 10px rgba(0,0,0,0.20);
      .box-shadow(@shadow);
    }

    // screen shot open
    &.screen-shot > .panel {
      padding-right: 300px;
    }

    // gradient bg
    &.error, &.loading {
      & > .panel {
        .stripe-gradient(white, 1%);
        background-color: white;
      }
    }

    // main panel
    & > .panel {
      height: 100%;
      overflow: hidden;
      transition: transform .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      font-size: @font-size;

      // features
      .chart-header {
        display: flex;
        justify-content: space-between;

        .chart-title {
          flex: 0 1 100%;

          h4 {
            color: @c-inverse;
            font-size: 1.1em;
          }
          h5 {
            color: @grey6;
            font-weight: @regular;
            font-size: .9em;
          }
        }

        .chart-actions {
          flex: 0 0 auto;

          i {
            font-size: 1em;
            margin-left: .5em;

            cursor: pointer;
            color: @c-inverse;

            &:hover {
              color: black;
            }

            &:first-child {
              margin: 0;
            }
          }
        }
      }

      .chart-body {
        & > .panel-block {
          height: 100%;
          padding: 0 1em 1em;
          overflow: visible;
        }
      }

      .chart-api-states {
        width: 100%; height: 100%;
        pointer-events: none;

        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;

        .error {
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon-circle {
            font-size: 1.2em;

            background-color: transparent;
            border: none;

            color: @c-danger;

            i { font-size: 1.5em; }
          }

          .error-message {
            font-weight: 900;
            color: @c-danger;
            font-size: 1em;
            margin-top: .5em;
          }
        }

        .loading > .icon-circle {
          font-size: 1.5rem;

          background-color: transparent;
          border: none;
          color: fadeout(black, 50%);

          i {
            font-size: 1em;
          }
        }
      }

      .chart-sidebar-mask {
        height: 100%; width: 100%;
        position: absolute;
        overflow: hidden;
        pointer-events: none;

        .overlay {
          top: 0; bottom: 0; right: 0; left: 0;
          position: absolute;
          background-color: fadeout(black, 60%);
        }

        .sidebar {
          width: auto; height: 100%;
          right: 0;
          position: absolute;
          background: @grey1;
          border-left: solid thin @grey3;
          pointer-events: auto;
          z-index: 1;


          // apply to all sidebar containers
          .sidebar-item {
            background-color: white;
            position: absolute;
            top: 0; bottom: 0; right: 0;

            border-left: solid 1px @grey6;

            pointer-events: auto;

            display: flex;
            flex-direction: column;

            overflow: hidden;

            .sidebar-header {
              flex: 0 0 auto;

              display: flex;
              justify-content: space-between;
              align-items: center;

              padding: .7em 1em;
              background: @grey2;
              border-bottom: solid thin @grey4;

              h2 {
                font-size: 1.3rem;
              }

              .close-icon {
                flex: 0 0 auto;
              }
            }

            .sidebar-body {
              flex: 0 1 100%;
              overflow-y: auto;
            }
          }

          // toggle header
          .toggle-headers {
            width: 300px;

            .sidebar-header {
              .input-row {
                flex: 0 1 100%;
                display: flex;
                padding-right: 10px;

                .select-all {
                  flex: 0 0 auto;
                  margin: 10px 15px 0 5px;
                  cursor: pointer;
                }

                .filter-input {
                  flex: 0 1 100%;
                }
              }
            }

            .sidebar-body {
              .header-list {

                .list-item {
                  font-size: 11pt;
                  padding: 5px 10px;
                  cursor: pointer;
                  color: @grey8;

                  display: flex;

                  .checkbox {
                    flex: 0 0 auto;
                  }

                  .label {
                    flex: 0 1 100%;
                    padding-left: 5px;
                    color: @grey9;
                  }

                  .value {
                    flex: 0 0 auto;
                    font-size: 10pt;
                    color: @grey6;
                  }

                  &:nth-child(odd) {
                    background-color: @grey1;
                  }

                  &:hover {
                    background-color: @grey2;
                  }
                }
              }
            }
          }

          // settings
          .settings {
            width: 300px;
            background-color: @grey1;
            border-left: solid 1px @grey4;
          }

          // screen shot
          .screen-shot {
            padding: 1rem;
          }

        }
      }

    }
  }

</style>
