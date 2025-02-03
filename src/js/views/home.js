import React, {useEffect,useContext} from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/card";
import { Context } from "../store/appContext";
import { PlanetsCard} from "../component/planetscard"
import { StarshipsCard } from "../component/starshipscards";

export const Home = () => {
	const {store, actions} = useContext (Context)
	
	useEffect(() => {
		actions.getInfoPeople();
        actions.getInfoPlanets();
        actions.getInfoStarships();
	}, []);
	
	
	console.log(store.peoples); 

	return (
        <div className="container">

                
                <h2><i className="fa-solid fa-users"></i>  Characters</h2>     
                     <div className="row">
				{store.peoples.length > 0 ? (
                    store.peoples.map((person, index) => (
                        <Card
                            key={index}
                            uid={index}
                            name={person.name}
                            gender={person.gender}
                            hair_color={person.hair_color}
                            eye_color={person.eye_color}
                        />
                    ))
                ) : (
                    <p>Loading...</p> // Mensaje mientras se cargan los datos
                )}
            </div>
            
               
            <h2><i className="fa-solid fa-globe"></i>  Planets</h2>     
                     <div className="row">
				{store.planets.length > 0 ? (
                    store.planets.map((planet, index) => (
                        <PlanetsCard
                            key={index}
                            uid={planet.name}
                            name={planet.name}
                            population={planet.population}
                            terrain={planet.terrain}
                            climate={planet.climate}
                        />
                    ))
                ) : (
                    <p>Loading...</p> // Mensaje mientras se cargan los datos
                )}
            </div>

            <h2><i className="fa-brands fa-space-awesome"></i>  Starships</h2>     
                     <div className="row">
				{store.starships.length > 0 ? (
                    store.starships.map((starship, index) => (
                        
                        <StarshipsCard
                            key={index}
                            uid={starship.name}
                            name={starship.name}
                            passengers={starship.passengers}
                            model={starship.model}
                            cargo_capacity={starship.cargo_capacity}
                            
                        />
                    ))
                ) : (
                    <p>Loading...</p> // Mensaje mientras se cargan los datos
                )}
            </div>
            
            </div>
    );
};
