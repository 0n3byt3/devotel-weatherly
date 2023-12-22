import '@/styles/globals.scss'
//external dependencies
import { Nunito_Sans } from "next/font/google";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
//external types dependencies
import type { AppProps } from 'next/app'
//internal dependencies
import { store } from '@client/store';
//internal types dependencies

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito_sans",
  weight: ["200", "400", "500", "700", "900"],
  display: "swap",
  adjustFontFallback: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${nunitoSans.variable} font-sans`} id="mainApp">
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
