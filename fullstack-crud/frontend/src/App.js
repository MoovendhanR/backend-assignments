import { Routes,Route } from "react-router-dom";
import AllNotes from "./components/AllNotes";
import CreateNote from "./components/createNote";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  return (
    <div className="App">
     <h1>page is active</h1>
     <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/createnote" element={<CreateNote/>} />
      <Route path="/allnotes" element={<AllNotes/>} />
     </Routes>
    </div>
  );
}

export default App;
