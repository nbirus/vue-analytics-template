<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">
        <div class="page-title-container">
          <h2>Search</h2>
        </div>

        <div class="page-actions">
          <btn class="dashboard-settings-btn" large><i class="fa fa-cog icon-margin"></i>Edit this Search</btn>
        </div>
      </div>


    </div>

    <div class="page-body">

      <div class="panel">
        <grid style="height: 750px; padding-bottom: 10px;"
          id="test-grid"

          :data="data"
          :columns="columns"

          :canSort="true"
          :canResizeColumns="true"
          :canMoveColumns="false"
          :paginate="true"
          :initialPageSize="20"
          :canSearch="false"
          :canToggleColumns="true"
          :canSelect="false"
          :canSelectMultiple="false"

          :showRowDetail="false"

        />
      </div>

    </div>

  </div>
</template>

<script>

  import TestData from '../../static/data/grid-headers/test-data2.json'
  import TestColumns from '../../static/data/grid-headers/test-headers2.json'
  import Grid from '../components/reporting/Grid'

  export default {
    name: 'search',
    components: { Grid },
    data () {
      return {
        data: TestData,
        columns: TestColumns
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../styles/component-helper.less';


</style>
