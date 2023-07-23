import { UnknownPageProps } from "$fresh/server.ts";
import { Wrapper } from "../components/Wrapper.tsx";

export default function NotFoundPage(props: UnknownPageProps) {
  return (
    <Wrapper
      head={
        <>
          <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=Montserrat:wght@900&display=swap" rel="stylesheet" />
          <style>
            {`
            .not-found-text {
              font-family: cabin,sans-serif;
              color: #d0ccc6;
              text-transform: uppercase;
              text-align: center;
              font-size: 1.25rem;
            }

            .not-found-numbers {
              font-weight: 900;
              letter-spacing: -1rem;
              font-family: montserrat,sans-serif;
              color: #d0ccc6;
              text-shadow: #191c23 -8px 0px 0px;
            }
          `}
          </style>
        </>
      }
    >
      <div className="flex flex-1 lg:w-screen max-w-screen-lg h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-md">
          <h3 className="not-found-text text-lg sm:text-xl">Oops! Page not found!</h3>
          <h1 className="not-found-numbers text-[10rem] -my-[2.5rem] sm:text-[14rem] sm:-my-[3.5rem]">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
          <h2 className="not-found-text text-lg sm:text-xl">
            Sorry! Seems that the page you're trying to access doesn't exist
          </h2>
        </div>
      </div>
    </Wrapper>
  );
}