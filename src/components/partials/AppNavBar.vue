<template>
  <div class="nav-bar">
    <div class="navigation">

      <ul class="nav-items">

          <li
            v-for="route in $router.options.routes" :key="route.name"
            v-if="route.meta.navBarLink"
          >

            <router-link
              class="nav-item"
              :id="`${route.name}-navbar`"
              :to="`/${route.name}`"
              tag="a"
            >
              <i class="icons" :class="`icon-${route.meta.icon}`"></i>
              <span>{{route.meta.navBarTitle}}</span>
            </router-link>

          </li>

      </ul>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-navbar'
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../styles/app-helper.less';

  .nav-bar {
    .horizontal-gradient(@nav-bg-color, darken(@nav-bg-color, 3%));

    .navigation {

      .nav-items {
        display: flex;
        flex-direction: column;

        li {
          a {
            padding: 1.2rem 0 1rem;
            margin: 0;

            font-size: 1rem;
            font-weight: 500;
            text-decoration: none;
            color: fadeout(white, 25%);
            transition: all .2s ease;


            display: flex;
            flex-direction: column;
            align-items: center;

            i {
              font-size: 1.6rem;
              margin-bottom: .8rem;
            }

            &.is-active, &.is-active:hover {
              color: white;
              background-color: darken(@nav-bg-color, 5%);
              border-left: solid 4px @c-first;
            }

            &:hover {
              color: white;
              background-color: darken(@nav-bg-color, 3%);
            }

            &:focus {
              .default-focus;
            }
          }

          &:first-child {
            padding-left: 0;
            margin-left: 0;
          }
        }

      }
    }

  }

</style>
