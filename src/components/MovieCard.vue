<template>
  <router-link :to="`/movie/${movie.id}`">
    <div class="movie-card">
      <img
        v-if="movie.poster_path" 
        :src="fullImagePath"
        :alt="movie.title"
        class="movie-card__poster"
      >
      <div
        v-else
        class="movie-card__un-poster"
      >
        Not Found
      </div>
      <div class="movie-card__detail detail">
        <p class="detail__title">
          {{ movie.title }}
        </p>
        <p class="detail__rating">
          Rating: {{ movie.vote_average }}
        </p>
        <span>
          {{ movie.release_date }}
        </span>
        <span class="detail__overview">
          {{ truncatedOverview(movie.overview) }}
        </span>
        <button
          class="detail__save-button"
          @click.stop.prevent="onAddMovieToSavedClick(movie)"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: {
      required: true
    }
  },
  data () {
    return {
      imagePath: 'https://image.tmdb.org/t/p/w1280',
      buttonText: 'Save movie'
    }
  },
  computed: {
    fullImagePath () {
      return this.imagePath + this.movie.poster_path
    }
  },
  methods: {
    truncatedOverview(overview) {
      const maxLength = 160;

      if (!overview || overview.trim() === '') return 'No overview available';
      if (overview.length <= maxLength) return overview;

      const truncated = overview.substr(0, maxLength);

      return truncated.substr(0, truncated.lastIndexOf(' ')) + '...';
    },
    onAddMovieToSavedClick (movie) {
      const allSavedMovies = [...this.$store.state.savedMovies]
      const newMovieData = {
        id: movie.id,
        title: movie.title,
        poster_path: `${this.imagePath}${movie.poster_path}`,
        overview: movie.overview
      }

      const isAlreadySaved = allSavedMovies.some(item => item.id === movie.id)

      if (!isAlreadySaved) {
        this.$store.dispatch('addMovieToSaved', newMovieData)
        this.$toasted.show(`"${movie.title}" added to saved!`, {
          type: 'success',
          duration: 3000,
          theme: 'outline',
          position: 'top-right'
        })
      } else {
        this.$toasted.show(`"${movie.title}" is already saved.`, {
          type: 'info',
          duration: 3000,
          position: 'top-right'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-card {
  position: relative;
  width: 210px;
  height: 315px;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 10px rgb(0 0 0 / 0.15);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgb(0 0 0 / 0.3);

    &::before,
    .movie-card__detail {
      opacity: 1;
      pointer-events: auto;
    }
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: 0.5rem;
    z-index: 1;
  }

  &__poster {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0.5rem;
  }

  &__un-poster {
    width: 100%;
    height: 100%;
    background-color: #7a7a7a;
    color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.75rem;
    border-radius: 0.5rem;
    user-select: none;
  }

  &__detail {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    opacity: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    z-index: 2;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 3px;
    }

    .detail__title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.3rem;
      text-align: center;
      flex-shrink: 0;
    }

    .detail__rating {
      font-weight: 500;
      margin-bottom: 0.6rem;
      text-align: center;
      color: #f3c623;
      flex-shrink: 0;
    }

    span {
      display: block;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      color: #ccc;
      text-align: center;
      flex-shrink: 0;
    }

    .detail__overview {
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.3;
      color: #ddd;
      margin-bottom: 1rem;
    }

    .detail__save-button {
      background-color: transparent;
      border: 2px solid #007bff;
      color: #fff;
      padding: 0.3rem 1.2rem;
      border-radius: 9999px;
      font-weight: 600;
      align-self: center;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
      flex-shrink: 0;
      line-height: 15px;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
}

</style>
