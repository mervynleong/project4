import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
import Display from "./components/Display";
// remember to import login and register
const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  // const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, role, setRole }}
      >
        {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
        {!accessToken && !showLogin && <Register setShowLogin={setShowLogin} />}
        {accessToken && <Display />}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
