import React, { useContext } from "react"; // Asegurarme de tener estas líneas
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context); 

	return (
		
		<nav className="navbar navbar-light bg-light-white mx-5 mb-3">
			 <>
			<Link to="/">
			<img src="https://th.bing.com/th/id/R.11a50c4f4202437bb34e0eb9cb1292ae?rik=vEypti0%2bI9m8qg&riu=http%3a%2f%2fwww.phantomshockey.com%2fwp-content%2fuploads%2f2015%2f12%2fStarWars_logo_Theatrical_RGB.png&ehk=vDRmGIY1S5%2fM0oYQ78s4RPXiTvp9JzoK%2bYZkuTrUBto%3d&risl=&pid=ImgRaw&r=0" alt="..." className="img-thumbnail"></img>
			</Link>
              </>
{/* Mapear taskList para que se generen nuevos li uno debajo de otro */}

					
			<div class="btn-group">
  <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown"  aria-expanded="false">
    Your Favorites  ({store.favorites.length})
	</button>
  <ul className="dropdown-menu">
        {store.favorites.length > 0 ? (
            store.favorites.map((fav, index) => (
                <li className="dropdown-item" key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {fav.name}
                    <span
                        className="delete-click ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => actions.removeFavorite(fav.uid)} // Acción de eliminar favorito
                    >
                        ❌
                    </span>
                </li>
            ))
        ) : (
            <li className="dropdown-item">No favorites yet.</li>
        )}
    </ul>
</div>

      <Link to="/demo">
        <button className="btn btn-light mx-auto">Menu</button>
      </Link>
    </nav>
  );
};

export default Navbar;
