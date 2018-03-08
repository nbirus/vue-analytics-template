import ECharts from 'vue-echarts/components/ECharts'
import chroma from 'chroma-js'

// define color, darken value, brighten
const colorObject = {
  inverse: ['#333c48', 2, 2]
}

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
      colors: []
    }
  },
  methods: {
    $generateColors (steps = 10) {

      let color = chroma(colorObject[this.theme][0])
      let darken = colorObject[this.theme][1]
      let brighten = colorObject[this.theme][2]

      return chroma.scale([color.darken(darken), color, color.brighten(brighten)]).mode('lch').colors(steps)
    },
    $chartRendered () {
      this.loading = false
      this.$emit('chartRendered', this.chartData)
    }
  }
}