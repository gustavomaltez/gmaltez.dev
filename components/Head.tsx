import { Head as FreshHead } from "fresh/runtime";
import { ComponentChildren } from "preact";

type Props = Readonly<{
  title?: string
  children?: ComponentChildren
  meta?: {
    url?: string
    image?: string
    description?: string
    keywords?: string[]
  }
}>

export function Head({ title: titleProp, children, meta }: Props) {
  const title = titleProp ? `${titleProp} | GMALTEZ.DEV` : "GMALTEZ.DEV";

  return (
    <FreshHead>
      <title>{title}</title>
      <meta
        name="author"
        content="Gustavo Maltez"
      />
      <meta
        name="description"
        content={meta?.description ?? DEFAULT_META.description}
      />
      <meta
        name="keywords"
        content={meta?.keywords?.join(", ") ?? DEFAULT_META.keywords.join(", ")}
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:locale"
        content="en_US"
      />
      <meta
        property="og:url"
        content={meta?.url ?? DEFAULT_META.url}
      />
      <meta
        property="og:image"
        content={meta?.image ?? DEFAULT_META.image}
      />
      <meta
        property="og:description"
        content={meta?.description ?? DEFAULT_META.description}
      />
      {children ?? null}
    </FreshHead>
  );
}

const DEFAULT_META = {
  image: "https://gmaltez.dev/logo.svg",
  url: "https://gmaltez.dev",
  description: "Gustavo Maltez's personal website",
  keywords: [
    "Gustavo Maltez",
    "GMaltez",
    "GMALTEZ.DEV",
    "GMALTEZ.DEV blog",
    "GMALTEZ.DEV posts",
  ],
};
