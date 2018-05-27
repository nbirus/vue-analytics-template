export default {
  props: {
    id: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    persist: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      pageNumber: 0,
      pageSize: 20,
      pageSort: {}
    }
  },
  mounted () {

    if (this.persist) {
      this.$store.dispatch('grid/initializeGridState', this.id)
      this.$nextTick(this.$setGridState)
    }

  },
  methods: {

    //  initial setting of grid state
    $setGridState () {
      const gridState = this.$store.getters['grid/getGridState'](this.id)
      if (gridState) {
        this.changePageSize(gridState.pageSize, false)
        this.changePageNumber(gridState.pageNumber)
      }
    },

    // persist grid state
    $saveGridState () {
      if (this.persist) {
        this.$store.dispatch('grid/saveGridState', {
        id: this.id,
        state: {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize
        }
      })
      }
    }

  }
}
