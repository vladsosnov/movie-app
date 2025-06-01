import { shallowMount } from '@vue/test-utils'
import AppSort from '../../components/Shared/AppSort.vue'

describe('AppSort.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(AppSort)
  })

  it('emits "sort-type-choosen" with correct name when sorting type clicked', async () => {
    const firstSortItem = wrapper.findAll('.list__item').at(0)
    await firstSortItem.trigger('click')
    expect(wrapper.emitted('sort-type-choosen')).toBeTruthy()
    expect(wrapper.emitted('sort-type-choosen')[0]).toEqual(['popularity'])
  })

  it('toggles isSideChange and emits "change-side" on side button click', async () => {
    const sideBtn = wrapper.find('.list__sort-side')
    expect(wrapper.vm.isSideChange).toBe(false)

    await sideBtn.trigger('click')
    expect(wrapper.vm.isSideChange).toBe(true)
    expect(wrapper.emitted('change-side')).toBeTruthy()
    expect(wrapper.emitted('change-side').length).toBe(1)

    await sideBtn.trigger('click')
    expect(wrapper.vm.isSideChange).toBe(false)
    expect(wrapper.emitted('change-side').length).toBe(2)
  })

  it('applies "list__sort-side--change" class when isSideChange is true', async () => {
    expect(wrapper.find('.list__sort-side').classes()).not.toContain('list__sort-side--change')
    wrapper.vm.isSideChange = true
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.list__sort-side').classes()).toContain('list__sort-side--change')
  })
})
