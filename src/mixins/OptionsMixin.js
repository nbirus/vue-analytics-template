import OptionsJSON from '../../static/data/forms/options.json'
import DataMixin from './DataMixin'
import { isEmpty } from 'lodash'

export default {
  mixins: [DataMixin],
  props: {
    optionSource: {
      type: String,
      default: 'props',
      validator (value) {
        return ['props', 'file', 'api'].includes(value)
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    optionPath: {
      type: String,
      default: ''
    },
    optionAPIConfig: {
      type: Object,
      default () { return {} }
    },
    optionLabelAccessor: {
      type: String,
      default: 'label'
    },
    optionValueAccessor: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {
      activeOptions: [],
      optionsMap: {
        props: this.getOptionsFromProps,
        file: this.getOptionsFromFile,
        api: this.getOptionsFromAPI
      }
    }
  },
  computed: {
    optionsClass () {
      return {
        error: this.error || this.state.error,
        loading: this.state.loading
      }
    }
  },
  mounted () {
    this.setOptions()
  },
  methods: {

    // initialize options
    async setOptions () {

      try {
        this.activeOptions = await this.optionsMap[this.optionSource]()
      }
      catch (error) {
        this.activeOptions = []
        this.$throwError(error)
      }

    },

    // props
    getOptionsFromProps () {
      return this.options
    },

    // file
    getOptionsFromFile () {
      return OptionsJSON[this.optionPath]
    },

    // api
    async getOptionsFromAPI () {

      let options = []

      if (!isEmpty(this.optionAPIConfig)) {
        let response = await this.$get(this.optionAPIConfig)
        options = response.data
      }

      return options

    }

  },
  watch: {
    optionAPIConfig: {
      handler () { this.setOptions() },
      deep: true
    }
  }
}
