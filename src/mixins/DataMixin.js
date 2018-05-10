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
      state: {
        loading: false,
        error: ''
      }
    }
  },
  methods: {

    // get data from the api
    $get (config) {
      return DataService.get(config) // return request
    },

    // log error and set error variables
    $throwError (error) {
      console.log(error)
      this.state.error = error.toString()
      this.state.loading = false
    }

  }
}
