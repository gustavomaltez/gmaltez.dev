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
    description: string;
    keywords: string[];
  };
};

const meta = {
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <style>
          {`
            body {
              scroll-behavior: smooth;
            }
            
            * {
              scrollbar-width: auto;
              scrollbar-color: #4d4e52 #191c23;
            }
          
            *::-webkit-scrollbar {
              width: 12px;
            }
          
            *::-webkit-scrollbar-track {
              background: #191c23;
            }
          
            *::-webkit-scrollbar-thumb {
              background-color: #4d4e52;
              border-radius: 10px;
              border: 3px solid #191c23;
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