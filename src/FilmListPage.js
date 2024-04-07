import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function FilmListPage() {

    const[films,setFilms] = useState([]);
    const[isFetchPending, setFetchPending] = useState(false);
    
    useEffect(() => {
        setFetchPending(true);
        fetch("https://localhost:7017/Film")
            .then((res) => res.json())
            .then((filmek) => setFilms(filmek))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Filmek</h2>
                    {films.map((film) => (

                        <div className="card col-sm-3 d-inline-block m-1 p-2">
                            <p className="text-dark">Film neve: {film.nev}</p>
                            <p className="text-danger">Kiadás éve: {film.kiadasEve}</p>
                            <p className="text-danger">Értékelés: {film.ertekeles}</p>                            
                            <div className="card-body">
                                <NavLink key={film.id} to={"/film/" + film.id}>
                                    <img alt={film.nev}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={film.kepneve ? film.kepneve :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                <NavLink key="y" to={"/mod-film/" + film.id}>
                                    <i className="bi bi-pencil"></i></NavLink> &nbsp;&nbsp;
                                    <NavLink key="x" to={"/del-film/" + film.id}><i className="bi bi-trash3"></i></NavLink>
                            </div>
                        </div>


                    ))}
                </div>
            )}
        </div>
    );
}
export default FilmListPage;
