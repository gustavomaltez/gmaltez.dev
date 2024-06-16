import { Head as FreshHead } from '$fresh/runtime.ts';
import { ComponentChildren } from 'preact';

export function Head(props: {
  title?: string;
  children?: ComponentChildren;
  meta?: {
    url?: string;
    image?: string;
    description?: string;
    keywords?: string[];
  };
}) {
  const title = props.title ? `${props.title} | GMALTEZ.DEV` : 'GMALTEZ.DEV';

  return (
    <FreshHead>
      <title>{title}</title>
      <meta
        name='author'
        content='Gustavo Maltez'
      />
      <meta
        name='description'
        content={props.meta?.description ?? DEFAULT_META.description}
      />
      <meta
        name='keywords'
        content={
          props.meta?.keywords?.join(', ') ?? DEFAULT_META.keywords.join(', ')
        }
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:locale'
        content='en_US'
      />
      <meta
        property='og:url'
        content={props.meta?.url ?? DEFAULT_META.url}
      />
      <meta
        property='og:image'
        content={props.meta?.image ?? DEFAULT_META.image}
      />
      <meta
        property='og:description'
        content={props.meta?.description ?? DEFAULT_META.description}
      />
      {props.children ?? null}
    </FreshHead>
  );
}

const DEFAULT_META = {
  image: 'https://gmaltez.dev/logo.svg',
  url: 'https://gmaltez.dev',
  description: "Gustavo Maltez's personal website",
  keywords: [
    'Gustavo Maltez',
    'GMaltez',
    'GMALTEZ.DEV',
    'GMALTEZ.DEV blog',
    'GMALTEZ.DEV posts',
  ],
};
