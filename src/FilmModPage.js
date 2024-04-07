import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function FilmModPage(props) {
    const params = useParams();
    const id = params.filmId;
    const navigate = useNavigate();
    const [film,setFilm] = useState([]);
    const[modnev,setModnev] = useState('');
    const[modkiadasEve,setModkiadasEve] = useState('');
    const[modertekeles,setModertekeles] = useState('');
    const[modkepneve,setModkepneve] = useState('');

    useEffect(() => {
        (async () => {

            try {
                const res = await fetch(`https://localhost:7017/Film/${id}`)
                const film = await res.json();
                setFilm(film);
                setModnev(film.nev);
                console.log(modnev);
                setModkiadasEve(film.modkiadasEve);
                console.log(modkiadasEve);
                setModertekeles(film.modertekeles);
                console.log(modertekeles);
                setModkepneve(film.modkepneve);
                console.log(modkepneve);
            }
            catch(error) {
                console.log(error);
            }
        })
        (); 
    }, [id,modnev,modkiadasEve,modertekeles,modkepneve,film]);
   
    const modNev = event => {
        setModnev(event.target.value);
    }
    const modKiadasEve = event => {
        setModkiadasEve(event.target.value);
    }
    const modErtekeles = event => {
        setModertekeles(event.target.value);
    }
    const modKepneve = event => {
        setModkepneve(event.target.value);
    }

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Egy film módosítása</h2>
            <form
            onSubmit={(event) => {
                event.persist();
                event.preventDefault();
                fetch(`https://localhost:7017/Film/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: event.target.elements.id.value,
                        nev: event.target.elements.nev.value,
                        kiadasEve: event.target.elements.kiadaseve.value,
                        ertekeles: event.target.elements.ertekeles.value,
                        kepneve: event.target.elements.kepneve.value,
                    }),
                })
                .then(() => {
                    navigate("/");
                })
                .catch(console.log);
            }}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Film ID:</label>
                    <div className="col-sm-9">
                        <input type="number" name="id" className="form-control" value={film.id}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Film név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="nev" className="form-control" defaultValue={film.nev} onChange={modNev}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kiadás éve:</label>
                    <div className="col-sm-9">
                        <input type="number" name="kiadaseve" className="form-control" defaultValue={film.kiadasEve} onChange={modKiadasEve}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Értékelés:</label>
                    <div className="col-sm-9">
                        <input type="number" name="ertekeles" className="form-control" defaultValue={film.ertekeles} onChange={modErtekeles}/>
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="kepneve" className="form-control" defaultValue={film.kepneve} onChange={modKepneve}/>
                    <img src={process.env.PUBLIC_URL + '/' + film.kepneve} height="200px" alt={film.nev}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
    }
export default FilmModPage;
