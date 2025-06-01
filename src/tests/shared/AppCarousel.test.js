import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Toasted from 'vue-toasted';
import AppCarousel from '../../components/Shared/AppCarousel.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Toasted);

describe('AppCarousel.vue', () => {
  let store;
  let actions;
  let state;
  let wrapper;

  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      image: '/path1.jpg',
      vote: 8.2,
      overview: 'Overview 1',
      release: '2025-01-01'
    },
    {
      id: 2,
      title: 'Movie 2',
      image: '/path2.jpg',
      vote: 7.5,
      overview: 'Overview 2',
      release: '2025-02-01'
    }
  ];

  beforeEach(() => {
    actions = {
      addMovieToSaved: jest.fn()
    };
    state = {
      savedMovies: []
    };
    store = new Vuex.Store({ actions, state });
    wrapper = shallowMount(AppCarousel, {
      propsData: { newMovies: mockMovies },
      store,
      localVue,
      mocks: {
        $toasted: {
          show: jest.fn()
        }
      },
      stubs: ['carousel', 'slide'] // stub out external components
    });
  });

  it('renders a slide for each movie', () => {
    const slides = wrapper.findAll('.app-carousel__slide');
    expect(slides.length).toBe(mockMovies.length);
  });

  it('displays movie data correctly', () => {
    const firstSlide = wrapper.find('.app-carousel__slide');
    expect(firstSlide.text()).toContain('Movie 1');
    expect(firstSlide.text()).toContain('Overview 1');
    expect(firstSlide.text()).toContain('Release: 2025-01-01');
  });

  it('dispatches action and shows toast when movie is saved', async () => {
    await wrapper.vm.onAddMovieToSavedClick(mockMovies[0]);

    expect(actions.addMovieToSaved).toHaveBeenCalledWith(expect.anything(), {
      id: 1,
      title: 'Movie 1',
      poster_path: '/path1.jpg',
      overview: 'Overview 1'
    });
    expect(wrapper.vm.$toasted.show).toHaveBeenCalledWith('"Movie 1" added to saved!', expect.objectContaining({
      type: 'success'
    }));
  });

  it('does not dispatch if movie is already saved', async () => {
    store.state.savedMovies = [{ id: 1 }];
    await wrapper.vm.onAddMovieToSavedClick(mockMovies[0]);

    expect(actions.addMovieToSaved).not.toHaveBeenCalled();
    expect(wrapper.vm.$toasted.show).toHaveBeenCalledWith('"Movie 1" is already saved.', expect.objectContaining({
      type: 'info'
    }));
  });
});
