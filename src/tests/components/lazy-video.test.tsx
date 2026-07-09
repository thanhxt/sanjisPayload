// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, act } from '@testing-library/react'
import { LazyVideo } from '@/components/gallery/gallery-content'

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void

let observerCallback: ObserverCallback

class MockIntersectionObserver {
  constructor(callback: ObserverCallback) {
    observerCallback = callback
  }
  observe = vi.fn()
  disconnect = vi.fn()
}

describe('LazyVideo', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    // jsdom does not implement media playback
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
  })

  it('does not load the video before it scrolls into view', () => {
    const { container } = render(<LazyVideo src="/gallery1.mp4" />)
    const video = container.querySelector('video')

    expect(video?.getAttribute('src')).toBeNull()
    expect(video?.getAttribute('preload')).toBe('none')
  })

  it('loads and plays the video once it intersects the viewport', async () => {
    const { container } = render(<LazyVideo src="/gallery1.mp4" />)

    await act(async () => {
      observerCallback([{ isIntersecting: true }])
    })

    const video = container.querySelector('video')
    expect(video?.getAttribute('src')).toBe('/gallery1.mp4')
  })

  it('stays unloaded when the entry does not intersect', async () => {
    const { container } = render(<LazyVideo src="/gallery2.mp4" />)

    await act(async () => {
      observerCallback([{ isIntersecting: false }])
    })

    expect(container.querySelector('video')?.getAttribute('src')).toBeNull()
  })
})
