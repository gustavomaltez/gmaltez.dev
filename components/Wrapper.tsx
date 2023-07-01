import { Head } from "https://deno.land/x/fresh@1.1.6/runtime.ts";
import { ComponentChildren } from "preact";
import { Header } from "./Header.tsx";
import { Footer } from "./Footer.tsx";
import ProgressBar from "../islands/ProgressBar.tsx";

type WrapperProps = {
  title?: string;
  children: ComponentChildren;
  head?: ComponentChildren;
};

export function Wrapper(props: WrapperProps) {
  const title = props.title ? `${props.title} | GMaltez.dev` : "GMaltez.dev";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Gustavo Maltez" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.svg" />
        <style>
          {`
            body {
              scroll-behavior: smooth;
            }
            
            * {
              scrollbar-width: auto;
              scrollbar-color: #333333 #1e2022;
            }
          
            *::-webkit-scrollbar {
              width: 16px;
            }
          
            *::-webkit-scrollbar-track {
              background: #1e2022;
            }
          
            *::-webkit-scrollbar-thumb {
              background-color: #333333;
              border-radius: 10px;
              border: 3px solid #1e2022;
            }
          `}
        </style>
        {props.head ?? null}
      </Head>
      <ProgressBar />
      <div className="bg-background text-text min-h-screen flex flex-col min-w-[350px]">
        <Header />
        <main className="m-4 max-w-screen-lg flex gap-6 flex-col h-full flex-1 lg:mx-auto">
          {props.children}
        </main>
        <Footer />
      </div>
    </>
  );
}