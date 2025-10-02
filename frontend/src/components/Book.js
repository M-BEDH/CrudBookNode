import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs"

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



  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50 border bg-white p-4 rounded">
        <Link to="create" className="btn btn-outline-success mb-2">
          Ajouter un livre
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Parution</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {book.map((data) => (
              <tr key={data.index}>
                <td>{data.title}</td>
                <td>{data.autor}</td>
                <td>{dayjs(data.parution).format("MM-YYYY")} </td>
                <td>
                  <Link
                   to={`/update/${data.id}`}
                   className="btn btn-primary m-1"
                  >
                    Modifier
                  </Link>
                  <button
                     className="btn btn-danger m-1"
                    // onClick={() => handleDelete(data.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Books