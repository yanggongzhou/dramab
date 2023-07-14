import NProgress from "nprogress";
import "nprogress/nprogress.css";
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { debounce } from "throttle-debounce";
import { useEffect } from "react";
import HeadNormal from "@/components/layout/HeadNormal";
import store from '@/store'
import DLayout from "@/components/layout";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps, router }: AppProps) {
  const nprogressEve = debounce(300, () => {
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, { atBegin: true })
  useEffect(() => {
    nprogressEve();
  }, []); // eslint-disable-line

  return <Provider store={store}>
    <DLayout pageProps={pageProps}>
      <>
        <HeadNormal pageProps={pageProps}/>
        <Component {...pageProps} />
      </>
    </DLayout>
  </Provider>
}

export default appWithTranslation(App)
