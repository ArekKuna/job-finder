import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "views/Router";

import "@fontsource/sen/800.css";
import "@fontsource/geologica/400.css";
import "./main.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />;
    </QueryClientProvider>
  );
}

export default App;
