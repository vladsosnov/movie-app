<template>
  <main class="main-view">
    <h2 class="main-view__title">Popular movies</h2>
    <app-carousel :newMovies="newMovies" />
    <app-sort
      @sort-type-choosen="onSortTypeBtnClick"
      @change-side="onChangeSideBtnClick"
     />
    <div
      v-if="loaderStatus"
      class="main-view__content"
    >
      <movie-list :movies="movies" />
      <soon-movie-sidebar :soonMovies="soonMovies" />
    </div>
    <app-loader
      v-else
    />
    <app-pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @prev-button="onPrevBtnClick"
      @next-button="onNextBtnClick"
      @page-click="onPageClick"
    />
  </main>
</template>

<script>
import axios from 'axios'

import AppCarousel from '../components/Shared/AppCarousel'
import AppSort from '../components/Shared/AppSort'
import AppLoader from '../components/Shared/AppLoader'
import MovieList from '../components/MovieList'
import SoonMovieSidebar from '../components/SoonMovieSidebar'
import AppPagination from '../components/Shared/AppPagination'

export default {
  name: 'MainView',
  components: {
    AppCarousel,
    AppSort,
    AppLoader,
    MovieList,
    SoonMovieSidebar,
    AppPagination
  },
  data () {
    return {
      movies: {},
      newMovies: [
        {
          id: '1',
          title: 'Blade Runner 2049',
          vote: '7.4',
          image: 'https://image.tmdb.org/t/p/w1280/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
          overview: `
            Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried
            secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest
            to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.
          `,
          release: '2017-10-04'
        },
        {
          id: '2',
          title: 'Weathering with You',
          vote: '8.1',
          image: 'https://image.tmdb.org/t/p/w1280/qgrk7r1fV4IjuoeiGS5HOhXNdLJ.jpg',
          overview: `
            Tokyo is currently experiencing rain showers that seem to disrupt the usual pace of everyone living there to no end.
            Amidst this seemingly eternal downpour arrives the runaway high school student Hodaka Morishima, who struggles to
            financially support himself—ending up with a job at a small-time publisher. At the same time, the orphaned Hina Amano
            also strives to find work to sustain herself and her younger brother. Both fates intertwine when Hodaka attempts to
            rescue Hina from shady men.

          `,
          release: '2019-07-19'
        },
        {
          id: '3',
          title: 'Inside Out',
          vote: '7.9',
          image: 'https://image.tmdb.org/t/p/w1280/lRHE0vzf3oYJrhbsHXjIkF4Tl5A.jpg',
          overview: `
            Growing up can be a bumpy road, and it's no exception for Riley, who is uprooted from her Midwest life when her father starts
            a new job in San Francisco. Riley's guiding emotions— Joy, Fear, Anger, Disgust and Sadness—live in Headquarters, the control
            centre inside Riley's mind, where they help advise her through everyday life and tries to keep things positive, but the emotions
            conflict on how best to navigate a new city, house and school.
          `,
          release: '2015-06-09'
        }
      ],
      soonMovies: [
        {
          id: '337401',
          title: 'Mulan',
          image: 'https://image.tmdb.org/t/p/w1280/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
        },
        {
          id: '724717',
          title: 'The 2nd',
          image: 'https://image.tmdb.org/t/p/w1280/o1WvNhoackad1QiAGRgjJCQ1Trj.jpg'
        },
        {
          id: '605116',
          title: 'Project Power',
          image: 'https://image.tmdb.org/t/p/w1280/TnOeov4w0sTtV2gqICqIxVi74V.jpg'
        }
      ],
      currentPage: 1,
      totalPages: 1,
      sortType: 'popularity',
      sortSide: 'desc',
      loaderStatus: false
    }
  },
  async mounted () {
    await this.fetchMovies()
  },
  methods: {
    async fetchMovies () {
      this.loaderStatus = false

      try {
        const fetchData = await axios.get(`
          ${process.env.VUE_APP_API_URL}/discover/movie?sort_by=${this.sortType}.${this.sortSide}&api_key=${process.env.VUE_APP_API_KEY}&page=${this.currentPage}
        `)

        this.movies = {...fetchData.data.results}
        this.totalPages = fetchData.data.total_pages
        setTimeout(() => this.loaderStatus = true, 1000)
      }
      catch (error) {
        console.log(error)
      }
    },
    async onSortTypeBtnClick (sortingType) {
      this.sortType = sortingType
      await this.fetchMovies()
    },
    async onChangeSideBtnClick () {
      this.sortSide === 'desc' ? this.sortSide = 'asc' : this.sortSide = 'desc'
      await this.fetchMovies()
    },
    async onPageClick(page) {
      this.currentPage = page
      await this.fetchMovies()
    },
    async onPrevBtnClick () {
      if (this.currentPage !== 1) {
        this.currentPage--
        await this.fetchMovies()
      }  
    },
    async onNextBtnClick () {
      this.currentPage++
      await this.fetchMovies()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-view {
  max-width: 80rem;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__title {
    font-weight: 700;
    color: #222;
    margin-bottom: 1.5rem;
    letter-spacing: 0.05em;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;

    @media (max-width: 992px) {
      flex-direction: column;
      align-items: center;
    }
  }
}

.movie-list {
  min-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  background: #fff;
}

.soon-movie-sidebar {
  flex: 0 1 35%;
  min-width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  border-radius: 0.5rem;
  padding: 1rem;
  background: #f9f9f9;

  @media (max-width: 992px) {
    width: 100%;
    margin-top: 1.5rem;
  }
}
</style>
