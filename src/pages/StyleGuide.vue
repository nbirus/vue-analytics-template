<template>
  <div class="page">

    <div class="page-header">

      <div class="page-header-content">
        <div class="page-title-container">
          <h2>Style Guide</h2>
        </div>
      </div>


    </div>

    <div class="page-body">
      <div class="panel bar-left bar-first btns-panel">
        <div class="panel-body"><h2>Buttons</h2></div>
        <hr />
        <div class="panel-drawer">
          <h4>Default Buttons</h4>
          <btn block>block</btn>
          <btn v-for="color in colors" :key="'b' + color" :theme="color">{{color}}</btn>

          <hr />
          <br />
          <h4>Icon Buttons</h4>
          <btn
            v-for="color in colors"
            :key="color"
            :theme="color"
            icon>
            <i class="fas fa-magic"></i>
          </btn>
        </div>
      </div>

      <div class="panel bar-left bar-second btns-panel">
        <div class="panel-body"><h2>Topbar Nav</h2></div>
        <tabs>
          <tab name="Tab 1" icon="arrow-right">
            <div class="panel-drawer tab-1">
              Tab Number 1
            </div>
          </tab>

          <tab name="Tab 2">
            <div class="panel-drawer tab-2">
              Tab Number 2
            </div>
          </tab>

          <tab name="Tab 3" icon="arrow-left">
            <div class="panel-drawer tab-3">
              Tab Number 2
            </div>
          </tab>
        </tabs>
      </div>

      <div class="panel bar-left bar-inverse btns-panel">

        <div class="panel-body"><h2>Sidebar Nav</h2></div>

        <tabs sidebar :useHash="false" theme="inverse">
          <tab name="Tab 1" icon="book">
            <div class="panel-drawer tab-1">
              Tab Number 1
            </div>
          </tab>

          <tab name="Tab 2" icon="circle">
            <div class="panel-drawer tab-2">
              Tab Number 2
            </div>
          </tab>

          <tab name="Tab 3" icon="ambulance">
            <div class="panel-drawer tab-3">
              Tab Number 2
            </div>
          </tab>
        </tabs>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'style-guide',
    components: {},
    data () {
      return {
        colors: [
          'default',
          'first',
          'second',
          'third',
          'fourth',
          'fifth'
        ]
      }
    },
    methods: {
      alert () {
        console.log('test')
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../styles/component-helper.less';

  .btns-panel {
    height: auto;
    margin-bottom: 25px;
    button {
      margin: 10px 15px 0 0;
    }
  }

  .tab-1, .tab-2, .tab-3  {
    width: 100%; height: 300px;

    background-color: @grey2;
  }

</style>
