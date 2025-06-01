<template>
  <section
    v-if="isSectionVisible"
    class="search-result"
  >
    <div
      v-if="isSearchResultVisible"
      class="search-result__content content"
    >
      <h2 class="search-result__title">
        Your search result
      </h2>
      <div class="search-result__wrap">
        <movie-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
    <div
      v-else
      class="search-result__empty-state"
    >
      <h2 class="title">
        There are no results for your query
      </h2>
      <img
        src="@/assets/images/no-results.png"
        alt="No results"
        class="image"
      >
    </div>
    <i
      class="close-icon"
      @click="closeSearchResult"
    >
      x
    </i>
  </section>
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
  name: 'SearchResult',
  props: {
    movies: {
      required: true
    }
  },
  components: {
    MovieCard
  },
  computed: {
    isSectionVisible () {
      return this.$store.state.isSearchResultVisible
    },
    isSearchResultVisible () {
      return JSON.stringify({ ...this.$store.state.searchMovies }) !== '{}'
    }
  },
  methods: {
    closeSearchResult () {
      this.$emit('close-results')
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  position: relative;
  max-width: 80rem;
  margin: 0 auto 2rem auto;
  padding: 0 1rem;

  &__content {
    border-bottom: 1px solid #ccc;
  }

  &__title {
    margin-top: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
  }

  &__wrap {
    margin-bottom: 2rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(5, 1fr);

    @media (max-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
      margin-right: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  &__empty-state {
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .title {
      text-align: center;
      font-size: 2rem;
    }

    .image {
      max-width: 100%;
    }
  }

  .close-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.8rem;
    color: #666;
    cursor: pointer;
    background-color: #f2f2f2;
    border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }
}
</style>
