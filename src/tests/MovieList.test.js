import { shallowMount } from '@vue/test-utils'
import MovieList from '../components/MovieList.vue'
import MovieCard from '../components/MovieCard.vue'

describe('MovieList.vue', () => {
  const moviesMock = [
    { id: 1, title: 'Movie One' },
    { id: 2, title: 'Movie Two' },
    { id: 3, title: 'Movie Three' }
  ]

  it('renders the correct number of MovieCard components', () => {
    const wrapper = shallowMount(MovieList, {
      props: { movies: moviesMock },
      global: {
        components: { MovieCard }
      }
    })

    const movieCards = wrapper.findAllComponents(MovieCard)
    expect(movieCards).toBe(movieCards)
  })

  it('passes each movie as prop to MovieCard', () => {
    const wrapper = shallowMount(MovieList, {
      props: { movies: moviesMock },
      global: {
        components: { MovieCard }
      }
    })

    const movieCards = wrapper.findAllComponents(MovieCard)
    movieCards.wrappers.forEach((cardWrapper, index) => {
      expect(cardWrapper.props('movie')).toEqual(moviesMock[index])
    })
  })
})