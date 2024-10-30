<template>
  <router-view></router-view>
</template>

<style lang="scss">
@use '@/assets/styles/variables' as variables;

body  {
  background: variables.$main-color;
}

#app {
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
