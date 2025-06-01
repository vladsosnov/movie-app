import { shallowMount } from '@vue/test-utils';
import AppFooter from '../../components/Shared/AppFooter.vue';

describe('AppFooter.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(AppFooter);
  });

  it('renders footer element with correct class', () => {
    expect(wrapper.classes()).toContain('app-footer');
  });

  it('contains the correct author link', () => {
    const link = wrapper.find('a.app-footer__author-link');
    expect(link.exists()).toBe(true);
    expect(link.text()).toContain('Create by Vlad Sosnov');
    expect(link.attributes('href')).toBe('https://github.com/vladsosnov');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener nofollow');
  });

  it('displays the GitHub logo image', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toContain('github-logo.svg');
    expect(img.attributes('alt')).toBe('GitHub Logo');
  });
});