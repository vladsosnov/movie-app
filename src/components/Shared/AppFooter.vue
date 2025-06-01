<template>
  <footer class="app-footer">
    <a
      href="https://github.com/vladsosnov"
      class="app-footer__author-link"
      rel="noopener nofollow"
      target="_blank"
    >
      Create by Vlad Sosnov
      <img
        src="@/assets/images/github-logo.svg"
        alt="GitHub Logo"
      >
    </a>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss" scoped>
.app-footer {
  max-width: 80rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.2s ease;

  &__author-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;

    &:hover {
      color: #000;
    }

    img {
      max-width: 1.5rem;
      margin-left: .5rem;
    }
  }
}
</style>