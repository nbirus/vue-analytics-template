import DataService from '../services/DataService'

export default {
  props: {
    apiConfig: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      apiLoading: false,
      minLoading: false,
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    isLoading () {
      return this.apiLoading || this.minLoading
    }
  },
  methods: {

    // get data from the api
    $get (config) {
      this.startLoadingTimer() // set to loading state
      return DataService.get(config) // return request
    },

    // log error and set error variables
    $throwError (error) {
      console.log(error)

      this.error = true
      this.loading = false
      this.errorMessage = error
    },

    startLoadingTimer () {
      this.minLoading = true
      this.loading = true
      setTimeout(() => { this.minLoading = false }, 1000)
    }
  }
}
