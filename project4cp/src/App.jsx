import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, role, setRole }}
      >
        <div>
          <h2>GA SEI</h2>
        </div>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
