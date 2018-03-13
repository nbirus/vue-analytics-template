<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">
        <div class="page-title-container">
          <h2>Create Search</h2>
        </div>

        <div class="page-actions">
          <!-- <btn class="dashboard-settings-btn" large><i class="fa fa-star text-yellow icon-margin"></i>Pinned Searches</btn> -->
          <btn class="dashboard-settings-btn" theme="third" large><i class="fa fa-check icon-margin"></i>Execute Search</btn>

        </div>
      </div>


    </div>

    <div class="page-body">

      <div class="adder">
        <div class="panel input-list">

        </div>
      </div>

      <div class="query-builder-body">
        <div class="query-item panel no-shadow">
          <div class="name">
            Disease
          </div>
        </div>
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

  @import (reference) '../styles/component-helper.less';

  .page-body {
    display: flex;

    .adder {
      flex: 0 0 auto;
      min-width: 300px;

      .input-list {
        height: 40vh;
      }
    }

    .query-builder-body {
      flex: 0 1 100%;
      padding: 0 25px 0;

      .query-item {
        width: 100%;
        min-height: 70px;
      }
    }
  }



</style>
