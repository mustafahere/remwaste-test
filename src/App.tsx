import { QueryClient, QueryClientProvider } from "react-query";
import SkipSelector from "./components/SkipSelector";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <SkipSelector />
      </div>
    </QueryClientProvider>
  );
}

export default App;
