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
    background-color: @nav-bg-color;

    .navigation {
      padding: 0 0 10px;

      .nav-items {
        display: flex;
        flex-direction: column;

        li {
          a {
            padding: 1.6rem 0;
            margin: 0;

            font-size: 1rem;
            text-decoration: none;
            color: fadeout(white, 25%);

            display: flex;
            flex-direction: column;
            align-items: center;

            i {
              font-size: 1.7rem;
              margin-bottom: .8rem;
            }

            &.is-active, &.is-active:hover {
              color: @c-first;
              background-color: darken(@nav-bg-color, 5%);
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
