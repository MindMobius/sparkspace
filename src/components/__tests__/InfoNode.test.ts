import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import InfoNode from '../InfoNode.vue'

describe('InfoNode', () => {
  it('renders properly with title and content', () => {
    const wrapper = mount(InfoNode, {
      props: {
        title: '测试标题',
        content: '测试内容',
        isVisible: true
      }
    })

    expect(wrapper.text()).toContain('测试标题')
    expect(wrapper.text()).toContain('测试内容')
  })

  it('applies visible class when isVisible is true', () => {
    const wrapper = mount(InfoNode, {
      props: {
        title: '测试标题',
        content: '测试内容',
        isVisible: true
      }
    })

    expect(wrapper.classes()).toContain('visible')
  })

  it('does not apply visible class when isVisible is false', () => {
    const wrapper = mount(InfoNode, {
      props: {
        title: '测试标题',
        content: '测试内容',
        isVisible: false
      }
    })

    expect(wrapper.classes()).not.toContain('visible')
  })
})
