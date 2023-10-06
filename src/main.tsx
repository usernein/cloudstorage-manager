import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./components/App/App.tsx";
import { AppContextProvider } from "./context/AppContextProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppContextProvider>,
);
