<template>
  <div class="saved-movies-view">
    <div
      v-if="savedMovies.length > 0"
      class="saved-movies-view__content content"
    >
      <div
        v-for="savedMovie in savedMovies"
        :key="savedMovie.id"
        class="content__card card"
      >
        <router-link class="content__card--link" :to="`/movie/${savedMovie.id}`">
          <img
            :src="savedMovie.poster_path"
            :alt="savedMovie.title"
            class="card__image"
          >
          <div class="card__title title">
            <p class="title__text">
              {{ savedMovie.title }}
            </p>
            <button
              class="title__button"
              @click.stop.prevent="onDeleteMovieClick(savedMovie)"
            >
              Delete
            </button>
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-else
      class="saved-movies-view__empty-state"
    >
      <h2 class="title">
        You haven't saved any movies yet
      </h2>
      <img
        src="@/assets/images/not-found-saved.png"
        alt="Search result"
        class="image"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'SavedMoviesView',
  computed: {
    savedMovies () {
      return [...this.$store.state.savedMovies]
    }
  },
  methods: {
    async onDeleteMovieClick (savedMovie) {
      this.$store.dispatch('pendingDeleteMovie', savedMovie);

      this.$toasted.show(`"${savedMovie.title}" will be removed.`, {
        action: {
          text: 'Undo',
          onClick: (e, toastObject) => {
            this.$store.dispatch('undoDelete');
            toastObject.goAway(0);
          }
        },
        duration: 3000,
        type: 'info',
        position: 'top-right',
        theme: 'outline'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.saved-movies-view {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;

  &__content {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-items: center;
  }

  &__empty-state {
    text-align: center;
    padding: 4rem 2rem;

    .title {
      font-size: 2rem;
      font-weight: 600;
      color: #444;
      margin-bottom: 2rem;

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .image {
      max-width: 400px;
      width: 100%;
      opacity: 0.7;
    }
  }
}

.content__card {
  background: #fff;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
  }

  &--link {
    text-decoration: none;
  }

  .card__image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .card__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    padding: 0.75rem 1rem;
    border-top: 1px solid #eee;
    background-color: #fafafa;

    .title__text {
      font-size: 0.9rem;
      font-weight: 500;
      color: #333;
      margin: 0;
      line-height: 15px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title__button {
      padding: 0.4rem 0.9rem;
      font-size: 0.75rem;
      border-radius: 9999px;
      background: #ef4444;
      color: #fff;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #dc2626;
      }
    }
  }
}
</style>
