<template>
  <section class="movie-page" v-if="movie">
    <button class="back-button" @click="goBack">← Go Back</button>
    <div class="movie-page__header">
      <img
        class="movie-page__poster"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
      />
      <div class="movie-page__info">
        <h1>{{ movie.title }}</h1>
        <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
        <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <p class="movie-page__overview">{{ movie.overview }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MoviePage',
  data () {
    return {
      movie: null
    }
  },
  async created () {
    const { id } = this.$route.params
    try {
      const res = await axios.get(`${process.env.VUE_APP_API_URL}/movie/${id}?api_key=${process.env.VUE_APP_API_KEY}`)
      console.log('res = ', res);
      this.movie = res.data
    } catch (error) {
      console.error('Error fetching movie:', error)
    }
  },
  methods: {
    goBack () {
      if (document.referrer.includes('search')) {
        this.$router.push('/search')
      } else if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-page {
  max-width: 960px;
  margin: 2rem auto;
  padding: 1rem;

  &__header {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__poster {
    width: 300px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  &__info {
    flex: 1;
  }

  &__overview {
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .back-button {
    display: inline-block;
    margin: 1rem 0;
    font-size: 0.95rem;
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease;
    border: none;
    cursor: pointer;

    &:hover {
        color: #0056b3;
        text-decoration: underline;
    }
  }
}
</style>
