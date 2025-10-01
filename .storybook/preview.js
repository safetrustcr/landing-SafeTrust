import '../src/app/globals.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { 
      argTypesRegex: '^on[A-Z].*' 
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'safetrust-purple',
          value: '#8b5cf6',
        },
        {
          name: 'safetrust-gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
          type: 'desktop',
        },
        wide: {
          name: 'Wide Screen',
          styles: {
            width: '1920px',
            height: '1080px',
          },
          type: 'desktop',
        },
      },
      defaultViewport: 'desktop',
    },
    layout: 'centered',
  },
  
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light Mode' },
          { value: 'dark', icon: 'moon', title: 'Dark Mode' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      
      return (
        <div className={theme === 'dark' ? 'dark' : ''}>
          <div className={theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;