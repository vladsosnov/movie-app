import { shallowMount } from '@vue/test-utils'
import AppPagination from '../../components/Shared/AppPagination.vue'

describe('AppPagination.vue', () => {
  const factory = (propsData) => {
    return shallowMount(AppPagination, {
      propsData: {
        currentPage: 3,
        totalPages: 10,
        ...propsData
      }
    })
  }

  it('renders Prev and Next buttons', () => {
    const wrapper = factory()
    const buttons = wrapper.findAll('.app-pagination__button')
    expect(buttons).toHaveLength(2)
    expect(buttons.at(0).text()).toBe('Prev')
    expect(buttons.at(1).text()).toBe('Next')
  })

  it('disables Prev button on first page', () => {
    const wrapper = factory({ currentPage: 1 })
    const prevBtn = wrapper.findAll('.app-pagination__button').at(0)
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('disables Next button on last page', () => {
    const wrapper = factory({ currentPage: 10 })
    const nextBtn = wrapper.findAll('.app-pagination__button').at(1)
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('renders correct number of visible pages (max 5)', () => {
    const wrapper = factory({ currentPage: 5, totalPages: 20 })
    const pageButtons = wrapper.findAll('.app-pagination__number')
    expect(pageButtons.length).toBeLessThanOrEqual(5)
  })

  it('highlights the current page', () => {
    const wrapper = factory({ currentPage: 4 })
    const active = wrapper.find('.app-pagination__number.active')
    expect(active.exists()).toBe(true)
    expect(active.text()).toBe('4')
  })

  it('emits "prev-button" when Prev is clicked', async () => {
    const wrapper = factory({ currentPage: 2 })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('prev-button')).toBeTruthy()
  })

  it('emits "next-button" when Next is clicked', async () => {
    const wrapper = factory({ currentPage: 2 })
    const nextBtn = wrapper.findAll('.app-pagination__button').at(1)
    await nextBtn.trigger('click')
    expect(wrapper.emitted('next-button')).toBeTruthy()
  })

  it('emits "page-click" with correct page number', async () => {
    const wrapper = factory({ currentPage: 2 })
    const pageButtons = wrapper.findAll('.app-pagination__number')
    await pageButtons.at(1).trigger('click')
    const emitted = wrapper.emitted('page-click')
    expect(emitted).toBeTruthy()
    expect(typeof emitted[0][0]).toBe('number')
  })
})
