<template>
  <div class="panel progress-widget">

    <div class="count">
      <div class="num">{{count}}</div>
      <div class="title">count</div>
    </div>

    <div class="to">to</div>

    <div class="target">
      <div class="num">{{target}}</div>
      <div class="title">target</div>
    </div>

    <div class="bar">

      <div class="track">
        <div
          class="area"
          :style="`width: ${percentage}%`"
          :class="`bg-${theme}`"
        ></div>
      </div>

      <div class="percentage">{{percentage}}%</div>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'progress-widget',
    props: {
      count: {
        type: Number,
        default: 0
      },
      target: {
        type: Number,
        default: 0
      },
      theme: {
        type: String,
        default: 'default'
      }
    },
    computed: {
      percentage () {
        return ((this.count / this.target) * 100).toFixed(0)
      }
    }
  }
</script>

<style lang="less" scoped>

  @import (reference) '../../../styles/app-helper.less';

  .progress-widget {
    font-size: 1rem;
    height: 100%;

    display: grid;
    grid-template-rows: 3fr 1fr;
    grid-template-columns: 3fr 1fr 3fr;

    .count, .target {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .num {
        font-size: 2.5em;
        line-height: 1em;
        text-align: center;
      }

      .title {
        text-align: center;
        color: fadeout(black, 40%);
      }
    }

    .count {
      grid-row: 1;
    }

    .to {
      grid-row: 1;

      text-align: center;
      margin: auto 0;
      color: fadeout(black, 75%);
    }

    .target {
      grid-row: 1;
    }

    .bar {
      grid-row: 2;
      grid-column: span 3;
      padding: .5em;

      display: flex;

      background-color: fadeout(black, 98%);
      border-top: solid thin fadeout(black, 95%);

      .track {
        flex: auto;
        width: 100%; height: 5px;
        background-color: fadeout(black, 95%);
        margin: auto 0;
        border-radius: 25px;
        overflow: hidden;

        .area {
          height: 100%;
          border-radius: 25px;

          &.bg-default {
            background-color: black;
          }
        }
      }

      .percentage {
        padding-left: 10px;
        color: fadeout(black, 30%);
      }
    }
  }

</style>
