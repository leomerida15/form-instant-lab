import "./App.css";
import { Forms } from "./components/forms";
import { FormInstantInputsProvider } from "./components/providers";

function App() {
  return (
    <FormInstantInputsProvider>
      <Forms />
    </FormInstantInputsProvider>
  );
}

export default App;
