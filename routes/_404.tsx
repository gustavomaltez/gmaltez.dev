import { Head } from "@components";

export default function Error404() {
  return (
    <>
      <Head title="Page not found">
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=Montserrat:wght@900&display=swap"
          rel="stylesheet"
        />
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
              text-shadow: #15171c -8px 0px 0px;
            }
          `}
        </style>
      </Head>
      <div class="flex flex-1 lg:w-screen max-w-(--breakpoint-lg) h-full items-center justify-center">
        <div class="flex flex-col items-center justify-center max-w-md">
          <h3 class="not-found-text text-lg sm:text-xl">
            Oops! Page not found!
          </h3>
          <h1 class="not-found-numbers text-[10rem] -my-10 sm:text-[14rem] sm:-my-14">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
          <h2 class="not-found-text text-lg sm:text-xl">
            Sorry! Seems that the page you're trying to access doesn't exist
          </h2>
        </div>
      </div>
    </>
  );
}
