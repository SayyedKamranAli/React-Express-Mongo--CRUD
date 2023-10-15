import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./component/Crud";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
