import React , {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = ({ name, uid, url, hair_color, eye_color, gender }) => {
    const { store, actions } = useContext(Context);
    console.log("Props en Card:", { name, uid });
    // Estado local para controlar si el elemento está marcado como favorito
    const [like, setLike] = useState(false);

    // Sincronizar estado local con el global
    useEffect(() => {
        // Verificar si el personaje está en favoritos en el store
       
          // Llamar a las acciones para obtener los datos de personas, planetas y naves
        
        const isFavorite = store.favorites.some((fav) => fav.uid === uid);
        setLike(isFavorite);
    }, [store.favorites, uid]);

    // Manejar clics en el botón de favorito
    const handleFavoriteClick = (store) => {
        if (like) {
            actions.removeFavorite(uid); // Eliminar de favoritos
        } else {
            actions.addFavorite({ uid, name }); // Agregar a favoritos
        }
        // Cambiar el estado local (se sincronizará en el próximo render)
        setLike(!like);
    };

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ width: "18rem" }}>
        <img src="https://i.pinimg.com/originals/19/e8/2e/19e82e29511dc9738bbdbe0968b79448.gif" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="card-text">
          <ul>
                            <li><strong>Gender:</strong> {gender || "Unknown"}</li>
                            <li><strong>Hair Color:</strong> {hair_color || "Unknown"}</li>
                            <li><strong>Eye Color:</strong> {eye_color || "Unknown"}</li>
                        </ul>
          </div>
          <Link className="btn btn-primary" to={`/cardinfo/people/${uid + 1}`}>
            Learn More!
          </Link>
          <button className="btn btn-light" onClick={handleFavoriteClick}>
            {like ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};