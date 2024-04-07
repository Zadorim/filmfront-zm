import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

export function FilmSinglePage(props) {

    const params = useParams();
    const id = params.filmId;
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
 }, [id]); 
    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !film.id ? (
                <div className="spinner-border"></div>
            ) : (
                            <div className="card p-3">
                                <div className="card-body">
                                <h5 className="card-title">Film neve: {film.nev}</h5>
                                <div className="lead">Kiadás éve: {film.kiadasEve}</div>
                                <div className="lead">Értékelés: {film.ertekeles}</div>
                                    <img alt={film.nev}
                                    className="img-fluid rounded"
                                    style={{maxHeight: "500px"}}
                                    src={film.kepneve ? film.kepneve : 
                                    "https://via.placeholder.com/400x800"} 
                                    />
                                  </div>
                                  <div><NavLink to="/"><i class="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
<NavLink key="y" to={"/mod-film/" + film.id}><i class="bi bi-pencil"></i></NavLink></div>   
                            </div>
                        
                    )}
                </div>
            );
}
export default FilmSinglePage;
