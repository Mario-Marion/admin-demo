<template>
  <div class="error">
    <div class="error__title">404</div>
    <div class="error__subtitle">🐱🐱🐱(⓿_⓿)🐱🐱🐱</div>
    <div class="error__description">看来你是迷路了......</div>
    <router-link to="/">
      <button class="error__button error__button--active">
        回到首页
      </button>
    </router-link>
  </div>
</template>


<script setup lang="ts">

</script>

<style lang="less" scoped>
.error {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: "Righteous", cursive;
  color: #363e49;
  z-index: 1;
}

.error__title {
  font-size: 10em;
  font-weight: bold;
  color: #d0d0d0;
  text-shadow: -5px -5px 0 rgba(0, 0, 0, 0.7);
  background-image: linear-gradient(90deg, #d0d0d0 48%, #919191 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.error__subtitle {
  font-size: 2em;
}

.error__description {
  opacity: 0.5;
}

.error__button {
  min-width: 7em;
  margin-top: 3em;
  margin-right: 0.5em;
  padding: 0.5em 2em;
  outline: none;
  border: 2px solid #2f3640;
  background-color: transparent;
  border-radius: 8em;
  color: #576375;
  cursor: pointer;
  transition-duration: 0.2s;
  font-size: 0.75em;
  font-family: "Righteous", cursive;
}

.error__button:hover {
  color: #21252c;
}

.error__button--active {
  background-color: @base_color;
  border: 2px solid @base_color;
  color: white;
}

.error__button--active:hover {
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
  color: white;
}
</style>