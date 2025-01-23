import React, {useEffect,useContext} from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Card } from "../component/card";
import { Context } from "../store/appContext";

export const Home = () => {
	const {store, actions} = useContext (Context)
	
	useEffect(() => {
		console.log('Ejecutando getInfoPeople');
		actions.getInfoPeople();
	}, []);
	
	
	console.log(store.peoples); 

	return (
        <div className="container">
            <div className="row">
                <h2>Characters</h2>
				{store.peoples.length > 0 ? (
                    store.peoples.map((person, index) => (
                        <Card
                            key={index}
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
        </div>
    );
};
