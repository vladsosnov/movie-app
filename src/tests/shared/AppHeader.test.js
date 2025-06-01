import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppHeader from '../../components/Shared/AppHeader.vue';
import AppSearchInput from '../../components/Shared/AppSearchInput.vue';

describe('AppHeader.vue', () => {
  let wrapper;

  const mockProps = {
    autoCompleteMoviesTitle: ['Inception', 'Interstellar']
  };

  beforeEach(() => {
    wrapper = shallowMount(AppHeader, {
      propsData: mockProps,
      stubs: {
        RouterLink: RouterLinkStub,
        AppSearchInput
      }
    });
  });

  it('renders header with correct class', () => {
    expect(wrapper.classes()).toContain('app-header');
  });

  it('renders logo image with alt text', () => {
    const logoImg = wrapper.find('img.app-header__logo');
    expect(logoImg.exists()).toBe(true);
    expect(logoImg.attributes('alt')).toBe('Logo');
    expect(logoImg.attributes('src')).toContain('movie-logo.svg');
  });

  it('contains a link to Main page', () => {
    const routerLinks = wrapper.findAllComponents(RouterLinkStub);
    const mainLink = routerLinks.at(0);
    expect(mainLink.props().to).toEqual({ name: 'Main' });
  });

  it('contains a link to SavedMovies page', () => {
    const savedLink = wrapper.findAllComponents(RouterLinkStub).at(1);
    expect(savedLink.text()).toContain('Saved movies');
    expect(savedLink.props().to).toEqual({ name: 'SavedMovies' });
  });

  it('renders AppSearchInput component', () => {
    const search = wrapper.findComponent(AppSearchInput);
    expect(search.exists()).toBe(true);
    expect(search.props('autoCompleteMoviesTitle')).toEqual(mockProps.autoCompleteMoviesTitle);
  });

  it('emits setSearchQuery event when AppSearchInput emits it', async () => {
    const searchInput = wrapper.findComponent(AppSearchInput);
    const query = 'Inception';
    await searchInput.vm.$emit('setSearchQuery', query);
  });
});
