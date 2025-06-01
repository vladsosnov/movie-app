<template>
  <carousel
    class="app-carousel"
    :autoplay="true"
    :autoplayTimeout="5000"
    :loop="true"
  >
    <slide
      v-for="newMovie in newMovies"
      :key="newMovie.id"
      class="app-carousel__slide slide"
    >
      <img
        :src="newMovie.image"
        :alt="newMovie.title"
        class="slide__image"
      >
      <div class="slide__detail detail">
        <p>
          <span class="detail__title">
            {{ newMovie.title }}
          </span>
          <span class="detail__vote">
            {{ newMovie.vote }}
          </span>
        </p>
        <p class="detail__overview">
          {{ newMovie.overview }}
        </p>
        <p class="detail__release">
          Release: {{ newMovie.release }}
        </p>
        <button
          class="detail__save-btn"
          @click.stop.prevent="onAddMovieToSavedClick(newMovie)"
        >
          Save movie
        </button>
      </div>
    </slide>
  </carousel>
</template>

<script>
export default {
  name: 'AppCarousel',
  props: {
    newMovies: {
      required: true
    }
  },
  methods: {
    onAddMovieToSavedClick (movie) {
      const allSavedMovies = [...this.$store.state.savedMovies]
      const newMovieData = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.image,
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
.app-carousel {
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

  &__slide {
    display: flex;
    align-items: flex-start;
    background: #fff;
    border-radius: 0.75rem;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    padding: 1rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.01);
    }

    &:not(:last-child) {
      margin-right: 1rem;
    }

    .slide__image {
      width: 140px;
      height: 210px;
      object-fit: cover;
      border-radius: 0.5rem;
      margin-right: 1rem;
      flex-shrink: 0;
    }

    .slide__detail {
      flex: 1;
      display: flex;
      flex-direction: column;
      color: #333;

      .detail__title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 0.2rem;
      }

      .detail__vote {
        font-size: 0.9rem;
        font-weight: bold;
        margin-left: 0.4rem;
      }

      .detail__overview {
        font-size: 0.95rem;
        color: #666;
        line-height: 1.4;
        margin: 0.5rem 0;
        max-height: 4.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .detail__release {
        font-size: 0.85rem;
        color: #999;
        margin-bottom: 0.8rem;
      }

      .detail__save-btn {
        align-self: flex-start;
        background-color: #007bff;
        color: #fff;
        padding: 0.5rem 1.2rem;
        border: none;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        line-height: 15px;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
}


</style>
