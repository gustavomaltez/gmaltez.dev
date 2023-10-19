import Changelog from '@islands/Changelog.tsx';
import { Disclaimer, Wrapper } from '@components';

const data = [
  {
    version: '0.7.0',
    date: '2023-07-25',
    changes: [
      'Added lorem ipsum',
      'New dolor sit amet',
      'Fixed consectetur adipiscing elit',
      'Changed sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      'Removed ut enim ad minim veniam',
      'Security ut aliquip ex ea commodo consequat',
      'Performance duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      'Accessibility excepteur sint occaecat cupidatat non proident',
    ],
    description: 'Hooray! This last update is just a test. And we do test in production LOL.',
  },
  {
    version: '0.6.0',
    date: '2023-07-24',
    changes: [
      'Fixed dolor sit amet',
      'Changed consectetur adipiscing elit',
      'Removed sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      'Security ut enim ad minim veniam',
      'Performance quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
      'Accessibility duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
      'New lorem ipsum feature',
    ],
    description: 'Check out this new version it\'s pretty cool :)',
  },
  {
    version: '0.5.1',
    date: '2023-07-23',
    changes: [
      'Fixed a bug related to user authentication',
      'Improved error handling for smoother usage',
      'Changed the color scheme to be more vibrant',
      'Removed unused assets to reduce app size',
      'Performance optimization for faster loading times',
      'Security enhancements to protect user data',
      'Accessibility improvements for screen reader compatibility'
    ],
    description: 'We\'re back with a quick update to address some important issues. Enjoy the enhanced experience!'
  },
  {
    version: '0.5.0',
    date: '2023-07-22',
    changes: [
      'Added some awesome new feature',
      'Fixed a critical issue',
      'Changed the user interface layout',
      'Improved performance for large datasets',
      'Removed deprecated functionality',
      'Security updates for secure communication',
      'Accessibility enhancements for better user experience'
    ],
    description: 'Welcome to the latest update! This release brings exciting changes and improvements.'
  },
  {
    version: '0.4.0',
    date: '2023-07-21',
    changes: [
      'Added a cool new feature',
      'Fixed a critical bug causing crashes',
      'Changed the way data is stored for better efficiency',
      'Improved rendering speed for smoother animations',
      'Removed unused code to declutter the codebase',
      'Security updates for secure data transmission',
      'Accessibility enhancements for better usability'
    ],
    description: 'We\'ve got another awesome update for you! Don\'t miss out on the latest goodies.'
  },
  {
    version: '0.3.0',
    date: '2023-07-20',
    changes: [
      'Added a brand new feature',
      'Fixed a critical bug',
      'Changed the layout of the homepage',
      'Removed deprecated functions',
      'Security enhancements',
      'Performance optimizations',
      'Accessibility improvements',
    ],
    description: 'Exciting changes in this update! Make sure to check them out!',
  },
  {
    version: '0.2.0',
    date: '2023-07-19',
    changes: [
      'Fixed a minor issue in the login process',
      'Changed the color scheme of the app',
      'Removed an unused library',
      'Security updates for user authentication',
      'Performance improvements for faster loading times',
      'Accessibility adjustments for better user experience',
    ],
    description: 'A small but important update to enhance your experience.',
  },
  {
    version: '0.1.0',
    date: '2023-07-12',
    changes: [
      'Added a new section for user settings',
      'Fixed a display issue on mobile devices',
      'Changed the font throughout the app',
      'Security fixes for protecting user data',
      'Performance optimizations for smoother navigation',
      'Accessibility updates to comply with accessibility standards',
    ],
    description: 'This is the first release :).',
  }
];

export default function _Changelog() {
  return (
    <Wrapper
      title='Changelog'
      head={
        <style>
          {` 
          .pulse {
            animation: dot-pulse 1s;
          }

          .swipe {
            animation: swipe-left-to-right-with-opacity 1s;
          }

          @keyframes swipe-left-to-right-with-opacity {
            0% {
              transform: translateX(-20px);
              opacity: 0;
            }

            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes dot-pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.5);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
        </style>
      }
    >
      <section className='lg:w-screen max-w-screen-lg flex flex-col flex-1 gap-2'>
        <Disclaimer
          title='⚠️ Dummy Data Alert ⚠️'
          content={`Hey! Remember that this blog is still under development, this is
          just a dummy page to test the Changelog component. Thanks for accessing during
          this early stage :)`}
        />
        <h1 className='text-3xl font-bold'>Changelog</h1>
        <Changelog items={data} />
      </section>
    </Wrapper>
  );
}