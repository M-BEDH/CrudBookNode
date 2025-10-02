import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";


function Books () {
     const [book, setBook] = useState([]);


  useEffect(() => {
 
    axios
      .get("http://localhost:8081")
      .then((res) => setBook(res.data)) 
      .catch((error) => {
        
        console.error("Erreur axios:", error);
        setBook([]); 
      });
  }, []); 

  const handleDelete = async (id) => {
    try {
  
      await axios.delete(`http://localhost:8081/book/${id}`);
  
      window.location.reload();
    } catch (error) {
  
      console.error(error);
      alert("Erreur lors de la suppression de l'étudiant");
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-75 border bg-white pt-3 rounded">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Parution</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {book.map((data, index) => (
              <tr key={index}>
                <td>{data.title}</td>
                <td>{data.autor}</td>
                <td>{dayjs(data.parution).format("YYYY")} </td>
                <td>
                  <Link
                   to={`/update/${data.id}`}
                   className="btn btn-outline-primary m-1"
                  >
                    Modifier
                  </Link>
                  <button
                     className="btn btn-danger m-1"
                    onClick={() => handleDelete(data.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="create" className="btn btn-primary mb-2">
          Ajouter un livre
        </Link>
      </div>
    </div>
  );
}

export default Books