import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const CardInfo = () => {
  const { store } = useContext(Context);
  const { type, uid } = useParams(); // Obtenemos el tipo y el uid desde la URL
  const [cardSelect, setCardSelect] = useState(null); // Inicializamos el estado como null

  useEffect(() => {
    console.log("Store data:", store);
    if (store.peoples && store.planets && store.starships) {


      let selectedCard;
      if (type === "people") {
        selectedCard = store.peoples.find((item) => item.uid === uid);
      } else if (type === "planets") {
        selectedCard = store.planets.find((item) => item.uid === uid);
      } else if (type === "starships") {
        selectedCard = store.starships.find((item) => item.uid === uid);
      }
      console.log("Selected Card:", selectedCard);  // Verifica los datos de la tarjeta seleccionada
      setCardSelect(selectedCard || {}); // Si no se encuentra, asignamos un objeto vacío
    }
  }, [store, type, uid, actions]); // Agrega las dependencias

  if (!cardSelect) {
    return <p>Loading...</p>;
  }

  return (
    <div className="jumbotron container">
      <div>
        <h1>{cardSelect.name}</h1>
        {type === "people" && (
          <>
            <p>
              <strong>Height:</strong> {cardSelect.height}
            </p>
            <p>
              <strong>Hair Color:</strong> {cardSelect.hair_color}
            </p>
            <p>
              <strong>Eye Color:</strong> {cardSelect.eye_color}
            </p>
            <p>
              <strong>Gender:</strong> {cardSelect.gender}
            </p>
          </>
        )}
        {type === "planets" && (
          <>
            <p>
              <strong>Climate:</strong> {cardSelect.climate}
            </p>
            <p>
              <strong>Terrain:</strong> {cardSelect.terrain}
            </p>
            <p>
              <strong>Population:</strong> {cardSelect.population}
            </p>
          </>
        )}
        {type === "starships" && (
          <>
            <p>
              <strong>Model:</strong> {cardSelect.model}
            </p>
            <p>
              <strong>Manufacturer:</strong> {cardSelect.manufacturer}
            </p>
            <p>
              <strong>Cost in Credits:</strong> {cardSelect.cost_in_credits}
            </p>
          </>
        )}
      </div>
      <p className="lead">
        <Link to="/">
          <button className="btn btn-secondary">Back home</button>
        </Link>
      </p>
    </div>
  );
};
