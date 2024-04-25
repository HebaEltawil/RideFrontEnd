import AuthProvider from "./Services/AuthProvider/AuthProvider";
import Routes from "./router";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;