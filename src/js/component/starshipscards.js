import React , {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const StarshipsCard = ({ name, uid, model, passengers, cargo_capacity }) => {
  const { store, actions } = useContext(Context);
  console.log("Props en Card:", { name, uid });
  // Estado local para controlar si el elemento está marcado como favorito
  const [like, setLike] = useState(false);

  // Sincronizar estado local con el global
  useEffect(() => {
      // Verificar si el personaje está en favoritos en el store
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

    <>
      <div className="col-md-4 mb-4">

        <div className="card" style={{ width: '18rem' }}>
          <img src="https://i.pinimg.com/originals/fd/ed/96/fded96dfbc8ad0e6cfd965372fa0e683.gif" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="card-text">
              <ul>
                <li><strong>Passengers:</strong>{passengers}</li>
                <li><strong>Model:</strong>{model}</li>
                <li><strong>Cargo Capacity:</strong>{cargo_capacity}</li>
              </ul>
            </div>
            <Link className="btn btn-primary" to={`/cardinfo/starships/${uid}`}>
            Learn More!
          </Link>
          <button className="btn btn-light" onClick={handleFavoriteClick}>
            {like ? "Remove from Favorites ❤️" : "Add to Favorites 🤍"}
          </button>          </div>
        </div>
      </div> </>


  )
};
