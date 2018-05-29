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
    labelFilters: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => []
    },
    customModifiers: {
      type: Object,
      default () { return {} }
    }

  },
  data () {
    return {

      // chart options
      formattedChartData: [],
      activeColors: [],

      // default styling
      axisTextColor: '#999999',
      splitLineColor: '#e7e7e7'

    }
  },
  computed: {

    // visible chart object
    $activeOptions () {
      return merge({},
        this.defaultChartOptions,
        this.dataModifiers, // insert data
        this.customModifiers, // from props
        this.expanded ? this.expandedChartOptions : {} // if expanded
      )
    }

  },
  mounted () {
    this.$buildChart()
  },
  methods: {

    $buildChart () {

      // get colors
      this.activeColors = this.colors.length ? this.colors : this.$generateColors()

      // get data
      this.formattedChartData = this.handleDataReturn(this.chartData)

      // emit the render
      this.$emit('chartRendered', this.filteredChartData)

    },

    $generateColors () {

      let color = ColorService.getColors()[this.theme]

      return chroma
        .scale([color[1], color[0], color[2]])
        .mode('lch')
        .colors(this.getDataLength())

    },

    $filterLabel (label, filters = this.labelFilters) {

      // loop over each filter and manipulate passed in string
      filters.forEach(filter => {
        label = this.$options.filters[filter](label)
      })

      return label
    },

    $emitClick (model) {
      this.$emit('c', model)
    }

  },
  watch: {
    theme () {
      this.$buildChart()
    }
  }
}
