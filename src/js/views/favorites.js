import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Favorites = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="jumbotron">
			<h1 className="display-4">❤️: </h1>

			<hr className="my-4" />
      {/* Mostrar favoritos */}
      <div>
        <h4>Your Favorites:</h4>
        <ul>
          {store.favorites.length > 0 ? (
            store.favorites.map((fav, index) => (
              <li key={index}>
                {fav.name}
                <span
                  className="delete-click ml-3"
                  onClick={() => actions.removeFavorite(fav.uid)}
                >
                  X
                </span>
              </li>
            ))
          ) : (
            <li>No favorites added yet.</li>
          )}
        </ul>
      </div>
			<Link to="/">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

Favorites.propTypes = {
	match: PropTypes.object
};



