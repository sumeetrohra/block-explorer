import Router from "./Router";
import JSONRPCProvider from "./JSONRPCProvider";

const App = () => {
  return (
    <JSONRPCProvider>
      <Router />
    </JSONRPCProvider>
  );
};

export default App;
