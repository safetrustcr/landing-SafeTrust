"use client";

import NextTopLoader from "nextjs-toploader";

export function RouteProgressBar() {
  return (
    <NextTopLoader
      color="#336AD9"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px #336AD9,0 0 5px #336AD9"
      zIndex={1600}
      showAtBottom={false}
    />
  );
}
