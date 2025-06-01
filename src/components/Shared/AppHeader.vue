<template>
  <header class="app-header">
    <div class="app-header__container">
      <div class="app-header__links">
        <router-link :to="{ name: 'Main' }">
          <img
            src="@/assets/images/movie-logo.svg"
            alt="Logo"
            class="app-header__logo"
          >
        </router-link>
        <nav class="app-header__nav nav">
          <router-link
            :to="{name: 'SavedMovies'}"
            class="nav__item"
            active-class="nav__item--active"
          >
            Saved movies
          </router-link>
        </nav>
      </div>
      <app-search-input
        :autoCompleteMoviesTitle="autoCompleteMoviesTitle"
        class="app-header__search-box"
        @setSearchQuery="setSearchQuery"
      />
    </div>
  </header>
</template>

<script>
import AppSearchInput from './AppSearchInput'

export default {
  name: 'AppHeader',
  props: {
    autoCompleteMoviesTitle: {
      required: true
    }
  },
  components: {
    AppSearchInput
  },
  methods: {
    setSearchQuery (searchPath) {
      this.$emit('set-search-path', searchPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  margin-bottom: 2rem;
  padding: .5rem 1rem;
  transition: .4s ease;
  background-color: #f2f2f2;
  box-shadow: 0 1px 3px 0 rgba(0,0,0, .1), 0 1px .125rem 0 rgba(0,0,0, .06);
  z-index: 100;

  &__container {
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  &__logo {
    max-width: 4rem;
  }

  &__links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  &__nav {
    .nav {
      &__item {
        text-decoration: none;
        color: #333;
        font-size: 1rem;
        transition: color .2s ease;

        &:hover {
          color: #000;
        }

        &--active {
          font-weight: 600;
        }

        @media (max-width: 600px) {
          display: block;
          margin: 1rem 0;
        }
      }
    }
  }

  &__search-box {
    position: relative;
  }
}
</style>
