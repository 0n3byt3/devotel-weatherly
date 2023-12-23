import "react-toastify/dist/ReactToastify.min.css";
import '@public/fontawesome/css/fontawesome.min.css'
import '@public/fontawesome/css/duotone.min.css'
import '@client/styles/globals.scss'
//external dependencies
import { Nunito } from "next/font/google";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
//external types dependencies
import type { AppProps } from 'next/app'
//internal dependencies
import { store } from '@client/store';
//internal types dependencies

const nunito = Nunito({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  weight: ["200", "400", "500", "700", "900"],
  display: "swap",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${nunito.variable} font-sans`} id="mainApp">
        <Component {...pageProps} />
        <ToastContainer
          toastClassName="app-toast"
          position="bottom-left"
          limit={3}
          newestOnTop
        />
      </main>
    </Provider>
  );
}
