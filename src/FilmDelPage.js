import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';

export function FilmDelPage(props) {
    const params = useParams();
    const id = params.filmId;
    const navigate = useNavigate();
    const[film,setFilm] = useState([]);
    const[isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
        const res= await fetch(`https://localhost:7017/Film/${id}`)
            const film = await res.json();
            setFilm(film);
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setPending(false);
        }
    })
    ();
 }, [id,film]);
 return (
    <div className="p-5 m-auto text-center content bg-lavender">
        {isPending || !film.id ? (
            <div className="spinner-border"></div>
        ) : (
                        <div className="card p-3">
                            <div className="card-body">
                            <h5 className="card-title">Törlendő elem: {film.nev}</h5>
                            <div className="lead">Kiadás éve: {film.kiadasEve}</div>
                            <div className="lead">Értékelés: {film.ertekeles}</div>
                                <img alt={film.nev}
                                className="img-fluid rounded"
                                style={{maxHeight: "500px"}}
                                src={film.kepneve ? film.kepneve : 
                                "https://via.placeholder.com/400x800"} 
                                />
                              </div>
                              <form onSubmit={(event) => {                
            event.persist();
            event.preventDefault();
            fetch(`https://localhost:7017/Film/${id}`, {
                method: "DELETE",                                
            })            
            .then(() =>
            {
                navigate("/");
            })
            .catch(console.log);
            }}>
                              <div>
<NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
&nbsp;&nbsp;
<button className="bi bi-trash3">&nbsp;Törlés</button></div></form>   
                        </div>
                    
                )}
            </div>
        );
}
    export default FilmDelPage;
