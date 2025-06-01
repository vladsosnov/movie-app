<template>
  <section class="app-loader">
    <div class="loader-content">
      <div class="pulse-dot"></div>
      <p class="loading-text">Loading...</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style lang="scss" scoped>
.app-loader {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0f0f0f;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: #00f2ff;
  border-radius: 50%;
  animation: pulse 1s infinite ease-in-out;
  box-shadow: 0 0 6px #00f2ff88;
}

.loading-text {
  font-size: 0.9rem;
  color: #0f0f0f;
  font-weight: 400;
  letter-spacing: 0.05em;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
}
</style>
