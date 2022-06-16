import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContextProvider } from '../context/user.context'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
export default MyApp
