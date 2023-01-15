import { Routes,Route } from "react-router-dom";
import Register from "./components/register";

function App() {
  return (
    <div className="App">
     <h1>page is active</h1>
     <Routes>
      <Route path="/register" element={<Register/>} />
     </Routes>
    </div>
  );
}

export default App;
