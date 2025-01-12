import { createRoot } from "react-dom/client";
import "./input.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./features/ErrorPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    FallbackComponent={ErrorPage}
    onError={(error, errorInfo) =>
      console.log("An error occurred in the app", error, errorInfo)
    }
  >
    <QueryClientProvider client={queryClient}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </QueryClientProvider>
  </ErrorBoundary>
);
