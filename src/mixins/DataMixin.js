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
      loading: false,
      error: false,
      errorMessage: ''
    }
  },
  methods: {

    // get data from the api
    $get (config) {
      this.loading = true // set to loading state
      return DataService.get(config) // return request
    },

    // log error and set error variables
    $throwError (error) {
      console.log(error)

      this.error = true
      this.loading = false
      this.errorMessage = error.toString()
    }
  }
}
