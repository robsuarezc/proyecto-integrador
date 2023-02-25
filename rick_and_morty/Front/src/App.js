import "./App.css";
import Nav from "./components/nav/Nav.jsx";
import Cards from "./components/cards/Cards.jsx";
import About from "./components/about/About.jsx";
import Detail from "./components/detail/Detail.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Error from "./components/error/Error.jsx";

function App() {
  const [characters, setCharacters] = useState([]);

  const onSearch = (character) => {
    fetch(`http://localhost:3001/rickandmorty${character}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      });
  };

  const onClose = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  return (
    <div className="App" style={{ padding: "25px" }}>
      <div>
        <Nav onSearch={onSearch} />
      </div>

      <Routes>
        <Route
          path="/home"
          element={<Cards characters={characters} onClose={onClose} />}
        />

        <Route path="/about" element={<About />} />
        <Route path="/detail/:detailId" element={<Detail />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
