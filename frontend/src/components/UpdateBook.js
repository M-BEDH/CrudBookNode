import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBook() {
    const [title, setTitle] = useState("")
    const [autor, setAutor] = useState("")
    const [parution, setParution] = useState("")

    const { id } = useParams();
    const navigate = useNavigate();

 useEffect(() => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/book/${id}`);
            const data = res.data;

            setTitle(data.title);
            setAutor(data.autor);

        
            if (data.parution) {
                const formattedDate = new Date(data.parution).toISOString().split("T")[0];
                setParution(formattedDate);
            } else {
                setParution("");
            }
        } catch (error) {
            navigate("/");
        }};

    fetchData();
}, [id, navigate]);


    function handleSubmit(event) {
        event.preventDefault();

        const updateBook = { title, autor, parution };

        axios.put(`http://localhost:8081/update/${id}`, updateBook)
            .then((res) => {
                console.log("Livre modifié:", res);
                navigate("/")
            })
            .catch((error) => {
                console.error("Erreur:", error);
            });
    }


    return (
        <div className="d-flex bg-primary justify-content-center align-items-center vh-100">
            <div className="bg-white rounded w-50 p-4 m-2">
                <form onSubmit={handleSubmit}>
                    <h2>Modifier le livre</h2>
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
                        Modifier
                    </button>
                </form>
            </div>
        </div>
    );
}


export default UpdateBook;