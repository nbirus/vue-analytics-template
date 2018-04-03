import ECharts from 'vue-echarts/components/ECharts'
import ColorService from '../services/ColorService'
import chroma from 'chroma-js'
import { merge } from 'lodash'

export default {
  components: { ECharts },
  props: {

    id: {
      type: String,
      required: true
    },

    chartData: {
      type: Array,
      required: true
    },

    expanded: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'inverse'
    },
    suppressedHeaders: {
      type: Array,
      default: () => []
    },

    // echart options object
    customModifiers: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      formattedChartData: [],

      colors: ColorService.getColors(),
      axisTextColor: '#999999',
      splitLineColor: '#e7e7e7'
    }
  },
  computed: {

    // visible chart object
    activeOptions () {
      return merge({},
        this.defaultChartOptions,
        this.dataModifiers, // insert data
        this.customModifiers, // insert custom properties
        this.isExpanded ? this.expandedChartOptions : {} // if expanded
      )
    },

    // filter out suppressed headers and null fields
    filteredChartData () {
      return this.formattedChartData.filter(item =>
        item &&
        item.name &&
        !this.suppressedHeaders.includes(item.name))
    }
  },
  mounted () {
    this.$buildChart()
  },
  methods: {

    $buildChart () {
      this.colors = this.$generateColors(this.chartData.length)
      this.formattedChartData = this.handleDataReturn(this.chartData)
      this.$emit('chartRendered', this.filteredChartData)
    },

    // helper functions
    $generateColors (steps = 10) {

      let color = chroma(this.colors[this.theme][0])
      let colorDark = this.colors[this.theme][1]
      let colorLight = this.colors[this.theme][2]

      return chroma.scale([colorLight, color, colorDark]).mode('lch').colors(steps)
    }
  }
}
