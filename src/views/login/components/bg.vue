<template>
  <div class="star_bg">
    <div class="star star1">⭐</div>
    <div class="star star2">⭐</div>
    <div class="star star3">⭐</div>
    <div class="star star4">⭐</div>
    <div class="star star5">⭐</div>
    <slot></slot>
    <!-- <div class="astronaut" v-resize="{ resize: draw3d }"> -->
    <div class="astronaut">
      <canvas class="illo" ref="cav"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { startDraw, stopAnimation } from './draw3d'
onMounted(() => {
  startDraw()
})
onUnmounted(() => {
  stopAnimation()
});
</script>

<style lang="less" scoped>
.star_bg {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, #2f3640 23%, #181b20 100%);
}

.star {
  color: grey;
  position: absolute;
  width: 10px;
  height: 10px;
  content: "";
  border-radius: 100%;
  transform: rotate(250deg);
  opacity: 0.4;
  animation-name: shimmer;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes shimmer {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7;
  }
}

.star1 {
  top: 40%;
  left: 50%;
  animation-delay: 1s;
}

.star2 {
  top: 60%;
  left: 90%;
  animation-delay: 3s;
}

.star3 {
  top: 10%;
  left: 70%;
  animation-delay: 2s;
}

.star4 {
  top: 90%;
  left: 40%;
}

.star5 {
  top: 20%;
  left: 30%;
  animation-delay: 0.5s;
}

.astronaut {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 0;

  @media (max-width: 900px) {
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>