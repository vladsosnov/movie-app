import { shallowMount } from '@vue/test-utils';
import MovieCard from '../components/MovieCard.vue';

describe('MovieCard.vue', () => {
  const createWrapper = (overview) => {
    return shallowMount(MovieCard, {
      propsData: {
        movie: {
          id: 1,
          title: 'Test Movie',
          poster_path: '/poster.jpg',
          vote_average: 8.5,
          overview,
        },
      },
    });
  };

  it('returns truncated overview if longer than 150 chars', () => {
    const longOverview = 'A'.repeat(200);
    const wrapper = createWrapper(longOverview);
    const result = wrapper.vm.truncatedOverview();
    expect(result.length).toBeLessThanOrEqual(153);
    expect(result.endsWith('...')).toBe(false);
  });

  it('returns full overview if shorter than 150 chars', () => {
    const shortOverview = 'No overview available';
    const wrapper = createWrapper(shortOverview);
    expect(wrapper.vm.truncatedOverview()).toBe(shortOverview);
  });

  it('returns default message if overview is empty', () => {
    const wrapper = createWrapper('');
    expect(wrapper.vm.truncatedOverview()).toBe('No overview available');
  });
});
