import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <YourRoutesOrComponents />
    </AuthProvider>
  );
}

export default App;
