import { shallowMount } from '@vue/test-utils'
import AppSearchInput from '../../components/Shared/AppSearchInput.vue'

const AutoCompleteStub = {
  name: 'ejs-autocomplete',
  props: ['value', 'dataSource', 'fields', 'showClearButton', 'highlight', 'placeholder'],
  template: '<input :value="value" @input="$emit(\'input\', $event.target.value)" />'
}

describe('AppSearchInput.vue', () => {
  const factory = (props = {}) => {
    return shallowMount(AppSearchInput, {
      propsData: {
        autoCompleteMoviesTitle: {
          1: { title: 'The Matrix' },
          2: { title: 'Inception' }
        },
        ...props
      },
      global: {
        components: {
          'ejs-autocomplete': AutoCompleteStub
        },
        mocks: {
          $store: {
            commit: jest.fn()
          }
        }
      }
    })
  }

  it('renders the form with button and autocomplete', () => {
    const wrapper = factory()
    expect(wrapper.find('form.app-search-input').exists()).toBe(true)
    expect(wrapper.find('button.app-search-input__button').exists()).toBe(true)
  })

  it('computes autocompleteMovie from props', () => {
    const wrapper = factory()
    expect(wrapper.vm.autocompleteMovie).toEqual([
      { title: 'The Matrix' },
      { title: 'Inception' }
    ])
  })

  it('updates fullPathName when searchMovieName changes', async () => {
    const wrapper = factory()
    wrapper.vm.searchMovieName = 'Batman'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.fullPathName).toContain('query=Batman')
  })
})
