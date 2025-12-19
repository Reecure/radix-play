import type { Preview, StoryFn, StoryContext } from '@storybook/react'
import '../src/app/styles/index.scss'
import { useEffect } from 'react'

const withTheme = (Story: StoryFn, context: StoryContext) => {
  const { theme, brand } = context.globals

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.brand = brand

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, brand])

  return <Story />
}

const preview: Preview = {
  decorators: [withTheme],

  globalTypes: {
    theme: {
      description: 'Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
    brand: {
      description: 'Brand',
      defaultValue: 'twitch',
      toolbar: {
        title: 'Brand',
        icon: 'paintbrush',
        items: [
          { value: 'twitch', title: 'twitch' },
          { value: 'kick', title: 'kick' },
        ],
      },
    },
  },
}

export default preview