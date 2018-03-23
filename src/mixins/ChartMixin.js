import ECharts from 'vue-echarts/components/ECharts'
import ColorService from '../services/ColorService'
import chroma from 'chroma-js'

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

    isExpanded: {
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

      colors: ColorService.colors,
      axisTextColor: '#999999',
      splitLineColor: '#e7e7e7'
    }
  },
  computed: {
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
      let darken = this.colors[this.theme][1]
      let brighten = this.colors[this.theme][2]

      return chroma.scale([color.darken(darken), color, color.brighten(brighten)]).mode('lch').colors(steps)
    }
  }
}
