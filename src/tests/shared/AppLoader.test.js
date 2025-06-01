import { shallowMount } from '@vue/test-utils';
import AppLoader from '../../components/Shared/AppLoader.vue';

describe('AppLoader.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppLoader);
  });

  it('renders the loader section with correct class', () => {
    expect(wrapper.classes()).toContain('app-loader');
  });

  it('contains a pulse-dot for animation', () => {
    const dot = wrapper.find('.pulse-dot');
    expect(dot.exists()).toBe(true);
  });

  it('displays loading text', () => {
    const text = wrapper.find('.loading-text');
    expect(text.exists()).toBe(true);
    expect(text.text()).toBe('Loading...');
  });
});
