<template>
  <div class="tabs" :class="generateTabClasses()">

    <!--tab list-->
    <div class="tabs-list" :class="{ 'collapse': !isSidebarOpen }">

      <!-- list actions -->
      <div class="tab-actions" v-if="searchable">

        <!-- search input -->
        <text-input
          :inputValue.sync="searchText"
          class="tab-search"
          placeholder="Filter.."
          v-if="isSidebarOpen" />

        <!-- collapse button -->
        <btn
          flat
          class="tab-collapser"
          theme="first"
          @click="isSidebarOpen = !isSidebarOpen"
        >
          <i class="fa" :class="(isSidebarOpen) ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
        </btn>

      </div>

      <!-- list -->
      <ul role="tablist" v-if="isSidebarOpen">
        <li
          v-for="(tab, i) in filteredTabs"
          :key="i"
          :class="{ 'active': tab.isActive, 'disabled': tab.isDisabled }"
          class="tabs-list-item"
          role="presentation"
          v-show="tab.isVisible"
        >
          <a
            v-html="tab.header"
            :aria-controls="tab.hash"
            :aria-selected="tab.isActive"
            @click="selectTab(tab.hash, $event)"
            :href="(useHash) ? tab.hash : 'javascript:void(0);'"
            class="tabs-list-item-name"
            role="tab"
          ></a>
        </li>
      </ul>

    </div>

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
      searchable: {
        type: Boolean,
        default: false
      },
      collapsible: {
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
      activeTabHash: '',
      searchText: '',
      isSidebarOpen: true
    }),
    computed: {
      filteredTabs () {
        return this.tabs.filter(tab => {
          return (tab.name) &&
                 (tab.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
                 (tab.isActive)
        })
      }
    },
    created () {
      this.tabs = this.$children
    },
    mounted () {

      // register event handler
      if (this.useHash) {
        window.addEventListener('hashchange', () => this.selectTab(window.location.hash))
      }

      // on nav with hash in url
      if (this.useHash && this.findTab(window.location.hash)) {
        this.selectTab(window.location.hash)
        return
      }

      // default
      if (this.filteredTabs.length) {
        this.selectTab(this.filteredTabs[0].hash)
      }

    },
    methods: {
      generateTabClasses () {
        return [
          (this.sidebar) ? 'sidebar' : 'topbar',
          `tabs-${this.theme}`
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

  @import (reference) '../../../styles/app-helper.less';
  @import (reference) '../../../styles/theme-generator.less';

  .tabs {
    display: flex;

    // --- top bar ---
    &.topbar {
      flex-direction: column;

      // list
      & > .tabs-list > ul {
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
      justify-content: stretch;

      // list
      & > .tabs-list {
        flex: 0 0 210px;
        flex-direction: row;

        background-color: fadeout(black, 97%);
        border-right: solid thin fadeout(black, 95%);

        // if collapsed
        &.collapse {
          flex: 0 0 10px;
          transition: all @transition-speed ease-in-out;

          .tab-actions {
            padding: 0 5px;
            & > .tab-collapser {
              padding: 0;
              margin: 0;
            }
          }
        }

        // actions
        .tab-actions {
          height: 60px; width: 100%;

          display: flex;
          align-items: center;

          padding: 0 15px;

          .tab-search {
            flex: 0 1 100%;
          }

          .tab-collapser {
            flex: 0 0 auto;
            margin-left: 10px;
          }
        }

        // list items
        .tabs-list-item {
          width: 100%; height: 40px;
          position: relative;
          transition: border .1s ease-in-out;

          // list name
          .tabs-list-item-name {
            width: 100%; height: 100%;
            display: block;

            padding: 0 15px;

            line-height: 40px;
            vertical-align: middle;

            font-size: 12pt;
            color: fadeout(black, 65%);
            text-decoration: none;
            font-weight: bold;
          }

          // item disabled
          &.disabled {

          }

          &:hover {
            background-color: fadeout(black, 95%);
          }
        }
      }

      // body
      .tabs-panels {
        flex: 1 1 100%;
        overflow: hidden;
      }
    }
  }

  // generate active classes
  @scope-tabs: {
    .generateThemeClasses({

      // tobar
      .topbar.tabs-@{name} > .tabs-list > ul > .tabs-list-item.active {
        border-bottom: solid 2px @color;

        .tabs-list-item-name {
          color: @color;
        }
      }

      // sidebar
      .sidebar.tabs-@{name} > .tabs-list > ul > .tabs-list-item {
        border-color: @color;
      }

      .sidebar.tabs-@{name} > .tabs-list > ul > .tabs-list-item.active {
        border-left: solid 4px @color;
        background-color: fadeout(black, 97%);
        // .horizontal-gradient(fadeout(black, 96%), fadeout(black, 1000%));
        .tabs-list-item-name {
          color: @color;
        }
      }

    });
  };
  @scope-tabs();

</style>
