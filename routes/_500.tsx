import { PageProps } from '$fresh/server.ts';

import { logger } from '@logger';
import { Wrapper } from '@components';

export default function Error500Page({ error }: PageProps) {
  const message = (error as Error)?.message ?? 'Unknown error';
  logger.error(`500 Internal Server Error: '${message}'`, error);
  return (
    <Wrapper
      head={
        <>
          <link
            href='https://fonts.googleapis.com/css2?family=Cabin:wght@700&display=swap'
            rel='stylesheet'
          />
          <style>
            {`
        .title {
          color: #d0ccc6;
          text-align: center;
          font-size: 1.25rem;
          text-transform: uppercase;
          font-family: cabin,sans-serif;
        }

        .subtitle {
          color: #d0ccc6;
          text-align: center;
          font-family: cabin,sans-serif;
          font-family: montserrat,sans-serif;
        }
      `}
          </style>
        </>
      }
    >
      <div className='flex flex-1 lg:w-screen max-w-screen-lg h-full items-center justify-center'>
        <div className='flex flex-col items-center justify-center max-w-md gap-3'>
          <h3 className='title text-lg sm:text-xl'>Ops! Something went wrong :(</h3>
          <img
            className='w-full rounded-xl'
            src='/error-meme.jpg'
            alt='Image of a frog saying "Gentlemen, it is with great pleasure that I inform you I have broken production... again.'
          />
          <h2 className='text-lg sm:text-xl subtitle'>Don't worry, I'm working on it :)</h2>
        </div>
      </div>
    </Wrapper>
  );
}
