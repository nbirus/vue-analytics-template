<template>
  <data-wrapper :apiConfig="activeConfig">
    <template slot-scope="{ _response, _state }">
      <grid
        :loading="_state.loading"
        :error="_state.error"

        :data="_response.data"

        v-bind=[$props, $attrs]

        @sortChanged="sortChanged"
        @pageNumberChanged="pageNumberChanged"
        @pageSizeChanged="pageSizeChanged"
      />
    </template>
  </data-wrapper>
</template>

<script>
  import Grid from './Grid'

  export default {
    name: 'elastic-grid',
    components: { Grid },
    props: {

    },
    computed: {
      activeConfig () {
        return {}
      }
    },
    data () {
      return {

      }
    },
    methods: {
      sortChanged (model) {
        console.log(model)
      },
      pageSizeChanged (pageSize) {
        console.log(pageSize)
      },
      pageNumberChanged (pageNumber) {
        console.log(pageNumber)
      }
    }
  }
</script>
