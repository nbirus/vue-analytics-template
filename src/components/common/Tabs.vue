<template>


  <div class="tabs" :class="generateTabClasses()">

    <!--tab list-->
    <ul role="tablist" class="tabs-list">
      <li
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ 'active': tab.isActive, 'disabled': tab.isDisabled }"
        class="tabs-list-item"
        role="presentation"
        v-show="tab.isVisible"
      >
        <a v-html="tab.header"
           :aria-controls="tab.hash"
           :aria-selected="tab.isActive"
           @click="selectTab(tab.hash, $event)"
           :href="(useHash) ? tab.hash : 'javascript:void(0);'"
           class="tabs-list-item-name"
           role="tab"
        ></a>
      </li>
    </ul>

    <!--tab panels-->
    <div class="tabs-panels">
      <slot/>
    </div>

  </div>

</template>

<script>

  export default {
    name: 'tabs',
    props: {
      sidebar: {
        type: Boolean,
        default: false
      },
      useHash: {
        type: Boolean,
        default: true
      },
      theme: {
        type: String,
        default: 'inverse'
      }
    },
    data: () => ({
      tabs: [],
      activeTabHash: ''
    }),
    created () {
      this.tabs = this.$children
    },
    mounted () {

      if (this.useHash) {
        window.addEventListener('hashchange', () => this.selectTab(window.location.hash))
      }


      if (this.useHash && this.findTab(window.location.hash)) {
        this.selectTab(window.location.hash)
        return
      }

      if (this.tabs.length) {
        this.selectTab(this.tabs[0].hash)
      }
    },
    methods: {
      generateTabClasses () {
        return [
          (this.sidebar) ? 'sidebar' : 'topbar',
          ('tabs-' + this.theme)
        ]
      },

      findTab (hash) {
        return this.tabs.find(tab => tab.hash === hash)
      },

      selectTab (selectedTabHash, event) {
        const selectedTab = this.findTab(selectedTabHash)

        if (selectedTab && !selectedTab.isDisabled) {
          this.tabs.forEach(tab => {
            tab.isActive = (tab.hash === selectedTab.hash)
          })

          this.$emit('changed', selectedTab)
          this.activeTabHash = selectedTab.hash
        }
      },

      setTabVisible (hash, visible) {
        const tab = this.findTab(hash)

        if (!tab) {
          return
        }

        tab.isVisible = visible

        if (tab.isActive) {

          tab.isActive = visible
          this.tabs.every(tab => {
            if (tab.isVisible) {
              tab.isActive = true

              return false
            }

            return true
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../styles/component-helper.less';

  .tabs {
    display: flex;

    // --- top bar ---
    &.topbar {
      flex-direction: column;

      // list
      & > .tabs-list {
        flex: 0 0 auto;

        display: flex;

        .tabs-list-item {

          margin-left: 20px;
          padding-bottom: 10px;

          .tabs-list-item-name {
            font-size: 13pt;
            color: fadeout(black, 75%);
            text-decoration: none;
            font-weight: bold;
          }

          &.disabled {

          }

        }
      }

      // body
      .tabs-panels {
        flex: 1 0 auto;
      }

    }

    // --- side bar ---
    &.sidebar {
      flex-direction: row;

      // list
      & > .tabs-list {
        flex: 0 0 230px;

        background-color: @grey3;

        .tabs-list-item {
          width: 100%; height: 45px;
          position: relative;

          border-bottom: solid thin @grey4;

          .tabs-list-item-name {
            width: 100%; height: 100%;
            display: block;

            padding: 0 15px;

            line-height: 45px;
            vertical-align: middle;

            font-size: 12pt;
            color: fadeout(black, 75%);
            text-decoration: none;
            font-weight: bold;

          }

          &.disabled {

          }

        }
      }

      // body
      .tabs-panels {
        flex: 1 0 auto;
      }
    }

  }

  // generate active classes
  @scope: {
    .generateThemeClasses({


      .topbar.tabs-@{name} > .tabs-list > .tabs-list-item.active {
        border-bottom: solid 2px @color;

        .tabs-list-item-name {
          color: @color;
        }
      }

      .sidebar.tabs-@{name} > .tabs-list > .tabs-list-item.active {
        border-left: solid 6px @color;
        background-color: fadeout(black, 97%);
        .tabs-list-item-name {
          color: @color;
        }
      }

    });
  };
  @scope();


</style>
