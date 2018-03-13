import ECharts from 'vue-echarts/components/ECharts'
import chroma from 'chroma-js'
import ColorService from '../services/ColorService'

export default {
  components: { ECharts },
  props: {
    id: {
      type: String,
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
      chartData: [],
      colors: ColorService.colors,
      axisTextColor: '#999999',
      splitLineColor: '#e7e7e7'
    }
  },
  computed: {
    // filter out suppressed headers and null fields
    filteredChartData () {
      return this.chartData.filter(item =>
        item &&
        item.name &&
        !this.suppressedHeaders.includes(item.name))
    }
  },
  methods: {
    $generateColors (steps = 10) {

      let color = chroma(this.colors[this.theme][0])
      let darken = this.colors[this.theme][1]
      let brighten = this.colors[this.theme][2]

      return chroma.scale([color.darken(darken), color, color.brighten(brighten)]).mode('lch').colors(steps)
    },
    $chartRendered () {
      this.loading = false
      this.$emit('chartRendered', this.filteredChartData)
    }
  }
}
