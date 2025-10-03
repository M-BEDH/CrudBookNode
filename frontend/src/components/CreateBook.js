import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [cover, setCover] = useState("")
  const [title, setTitle] = useState("")
  const [autor, setAutor] = useState("")
  const [parution, setParution] = useState("")

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    axios.post("http://localhost:8081/create", { title, autor, parution, cover })
      .then((res) => {
        alert("Livre enregistré:", res);
        navigate("/")
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }



  return (
    <div className="d-flex bg-primary justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-50 ">
        <form onSubmit={handleSubmit}>
          <h2>Ajouter un livre</h2>
          <div className="mb-2">
            <label htmlFor="cover">Couverture</label>
            <input
              type="text"
              placeholder="Choisir une image"
              className="form-control"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              placeholder="Entrer le titre"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="autor">Auteur</label>
            <input
              type="text"
              placeholder="Entrer l'auteur"
              className="form-control"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="parution">Parution</label>
            <input
              type="date"
              className="form-control"
              value={parution}
              onChange={(e) => setParution(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-10">
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBook