import { UnknownPageProps } from "$fresh/server.ts";
import { Wrapper } from "../components/Wrapper.tsx";

export default function NotFoundPage(props: UnknownPageProps) {
  return (
    <Wrapper>
      <div className="flex flex-1 lg:w-screen max-w-screen-lg h-full items-center justify-center">
        <img src="/404.svg" className="p-5 w-full h-full max-h-[70vh]"/>
      </div>
    </Wrapper>
  );
}