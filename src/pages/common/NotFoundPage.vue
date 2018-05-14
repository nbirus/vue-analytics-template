<template>
  <div class="page">
    <div class="page-body">
      <btn @click="$router.push({ name: 'home' })">Go Home</btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'not-found'
  }
</script>

<style lang="less" scoped></style>
