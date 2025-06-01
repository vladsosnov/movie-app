<template>
  <div class="movie-list">
    <movie-card
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>
</template>

<script>
import MovieCard from './MovieCard'

export default {
  name: 'MovieList',
  props: {
    movies: {
      required: true
    }
  },
  components: {
    MovieCard
  }
}
</script>

<style lang="scss" scoped>
.movie-list {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    margin-right: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
