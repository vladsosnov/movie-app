<template>

  <aside class="soon-movie-sidebar">

    <h2 class="soon-movie-sidebar__title"> Soon on the site </h2>

    <div
      v-for="soonMovie in soonMovies"
      :key="soonMovie.id"
      class="soon-movie-sidebar__movies movie"
    >

      <img
        v-if="soonMovie.poster_path !== null"
        :src="soonMovie.image"
        :alt="soonMovie.title"
        class="movie__image"
      />
       {{ soonMovie.title }}
    </div>

  </aside>

</template>

<script>
export default {
  name: 'SoonMovieSidebar',
  props: {
    soonMovies: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.soon-movie-sidebar {
  width: 100%;
  max-width: 260px;

  @media (max-width: 768px) {
    display: none;
  }

  &__title {
    margin-top: 0;
    font-size: 1.4rem;
  }

  &__movies {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    display: flex;

    &:not(:last-child) {
      border-bottom: 2px solid;
    }

    .movie {
      &__image {
        max-width: 80px;
        margin-right: 1rem;
      }
    }
  }
}
</style>

