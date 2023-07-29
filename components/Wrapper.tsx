import { Head } from "https://deno.land/x/fresh@1.1.6/runtime.ts";
import { ComponentChildren } from "preact";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import ProgressBar from "../islands/ProgressBar.tsx";

type WrapperProps = {
  title?: string;
  children: ComponentChildren;
  head?: ComponentChildren;
  meta?: {
    url?: string;
    image?: string;
    description?: string;
    keywords?: string[];
  };
};

const meta = {
  image: "https://gmaltez.dev/og.svg",
  url: "https://gmaltez.dev",
  description: "Gustavo Maltez's personal website",
  keywords: ["Gustavo Maltez", "GMaltez", "GMaltez.dev", "GMaltez.dev blog", "GMaltez.dev posts"],
};

export function Wrapper(props: WrapperProps) {
  const title = props.title ? `${props.title} | GMaltez.dev` : "GMaltez.dev";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Gustavo Maltez" />
        <meta name="description" content={props.meta?.description ?? meta.description} />
        <meta name="keywords" content={props.meta?.keywords?.join(", ") ?? meta.keywords.join(", ")} />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={props.meta?.url ?? meta.url} />
        <meta property="og:image" content={props.meta?.image ?? meta.image} />
        <meta property="og:description" content={props.meta?.description ?? meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <style>
          {`
            * {
              scrollbar-width: auto;
              scroll-behavior: smooth;
              scrollbar-color: #3d3c42 #1c212d;
            }
          
            *::-webkit-scrollbar {
              width: 12px;
            }
          
            *::-webkit-scrollbar-track {
              background: #1c212d;
            }
          
            *::-webkit-scrollbar-thumb {
              background-color: #3d3c42;
              border-radius: 10px;
              border: 3px solid #1c212d;
            }

            *::-webkit-scrollbar-corner {
              background-color: #1c212d;
            }
            
            input, button, input:focus, button:focus {
              outline: none;
            }
          }
          `}
        </style>
        {props.head ?? null}
      </Head>
      <ProgressBar />
      <div className="bg-background text-text-primary min-h-screen flex flex-col min-w-[350px]">
        <Header />
        <main className="m-4 max-w-screen-lg flex gap-6 flex-col h-full flex-1 lg:mx-auto">
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
}