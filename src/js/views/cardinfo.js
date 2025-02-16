import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const CardInfo = () => {
 //extraigo los params de la url: tipos:people, planets, starships y uid
const {type, uid} = useParams();


//extraigo store del context
const {store, actions} = useContext(Context);

useEffect(() => {
  if (store.peoples.length === 0 && type === "people") {
    actions.getInfoPeople();
  } else if (store.planets.length === 0 && type === "planets") {
  actions.getInfoPlanets(); 
} else if (store.starships.length === 0 && type === "starships") {
  actions.getInfoStarships();
}
}, [type]);

console.log("Datos actuales en el store:", store); // Verifica si los datos están cargando


//estado para guardar card seleccionada
const [cardSelect, setCardSelect] = useState (null);
useEffect(() => {
// comprobar si los datos existen en el store y podría hacer una llamada a getInfo
let selectedCard;
if (type === "people" && store.peoples.length > 0) {
  selectedCard = store.peoples.find((item) => {
    return String(item.uid) === String(uid);
  });
}    else if (type === "planets" && store.planets.length > 0) {
  selectedCard = store.planets.find((item) => String (item.uid) === String(uid));
} else if (type === "starships" && store.starships.length > 0){
  selectedCard = store.starships.find((item) => String(item.uid) === String(uid));
}
setCardSelect(selectedCard || null);
 }, [store,type,uid]);


return (

<>
  {!cardSelect ? (
    <div className="container">
      <p>Cargando datos...</p>
    </div>
  ) : (
    <div className="jumbotron container">
      <div>
        <h1 className="title">{cardSelect.name}</h1>

        {type === "people" && (
          <div className=" d-flex align-items-center gap-3">
         
            <img src="https://i.pinimg.com/originals/19/e8/2e/19e82e29511dc9738bbdbe0968b79448.gif" className="card-img-top w-50 h-50" alt="people_img" />
            <div className="container">
            <p><strong>Height:</strong> {cardSelect.height || "Unknown"}</p>
            <p><strong>Hair Color:</strong> {cardSelect.hair_color || "Unknown"}</p>
            <p><strong>Eye Color:</strong> {cardSelect.eye_color || "Unknown"}</p>
            <p><strong>Gender:</strong> {cardSelect.gender || "Unknown"}</p>
            <p><strong>Height:</strong> {cardSelect.height || "Unknown"}</p>
            <p><strong>Birth Year:</strong> {cardSelect.birth_year || "Unknown"}</p>
 </div>

          </div>
        )}
        {type === "planets" && (
          <div className=" d-flex align-items-center gap-3">
           
            <img src="https://i.redd.it/908duc8ac0861.gif" className="card-img-top w-50 h-50" alt="planets_img" />
            <div className="container">
            <p><strong>Climate:</strong> {cardSelect.climate || "Unknown"}</p>
            <p><strong>Diameter:</strong> {cardSelect.diameter || "Unknown"}</p>
            <p><strong>Rotation Period:</strong> {cardSelect.rotation_period || "Unknown"}</p>
            <p><strong>Gravity:</strong> {cardSelect.gravity || "Unknown"}</p>
            <p><strong>Terrain:</strong> {cardSelect.terrain || "Unknown"}</p>
            <p><strong>Population:</strong> {cardSelect.population || "Unknown"}</p>
          </div></div>
        )}
        {type === "starships" && (
          <div className=" d-flex align-items-center gap-3">
           
            <img src="https://i.pinimg.com/originals/fd/ed/96/fded96dfbc8ad0e6cfd965372fa0e683.gif" className="card-img-top w-50 h-50" alt="starships_img" />

             <div className="container">
            <p><strong>Model:</strong> {cardSelect.model || "Unknown"}</p>
            <p><strong>Passengers:</strong> {cardSelect.passengers || "Unknown"}</p>
            <p><strong>Cargo Capacity:</strong> {cardSelect.cargo_capacity || "Unknown"}</p>
            <p><strong>crew:</strong> {cardSelect.crew || "Unknown"}</p>
            <p><strong>Manufacturer:</strong> {cardSelect.manufacturer || "Unknown"}</p>
            <p><strong>Cost in Credits:</strong> {cardSelect.cost_in_credits || "Unknown"}</p>
          </div> </div>
        )}
      </div>
      <p className="lead">
        <Link to="/">
          <button className="btn btn-secondary mt-5">Back home</button>
        </Link>
      </p>
    </div>
  )}
</>

)};
