<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import '@/assets/styles/variables';

body  {
  background: $main-color;
}

#app {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
