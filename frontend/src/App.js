import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from "./components/Book";
import CreateBook from "./components/CreateBook";
import UpdateBook from "./components/UpdateBook"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Book />} />
          <Route path="/create" element={<CreateBook />} />
          <Route path="/update/:id" element={<UpdateBook />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
