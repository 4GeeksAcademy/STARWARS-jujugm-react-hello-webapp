import { addFavorite, removeFavorite } from "../views/favorites";

const getState = ({ getStore, getActions, setStore }) => {
	return {
			store: {
				peoples: [],
				planets: [],
				starships: [],
				favorites: [],
				demo: [
					{
						title: "MY FAVORITES",
						background: "white",
						initial: "white"
					},
					
				]
			},


					actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},



			addFavorite: (character) => {
				const { favorites } = getStore(); // Access favorites directly from getStore()
				const isAlreadyFavorite = favorites.some((fav) => fav.uid === character.uid);
			
				if (!isAlreadyFavorite) {
					setStore({ favorites: [...getStore().favorites, character] }); // Use getStore().favorites here
					console.log("Favoritos después de agregar:", getStore().favorites); // Check after adding
				} else {
					console.log("El personaje ya está en favoritos.");
				}
			},
			
			removeFavorite: (characterUid) => {
				const { favorites } = getStore(); // Access favorites directly from getStore()
				const updatedFavorites = favorites.filter((fav) => fav.uid !== characterUid);
			
				setStore({ favorites: updatedFavorites });
				console.log("Favoritos después de eliminar:", updatedFavorites);
			},
			// a partir de aqui contenido de la API

			getInfoPeople: async () => {
				try {
					const response = await fetch("https://www.swapi.tech/api/people/");
					const data = await response.json();
			
					// Obtener detalles de cada personaje
					const detailedPeople = await Promise.all(
						data.results.map(async (person) => {
							const res = await fetch(person.url);
							const details = await res.json();
							return {
								uid: person.uid,
								name: person.name,
								gender: details.result.properties.gender,
								hair_color: details.result.properties.hair_color,
								eye_color: details.result.properties.eye_color,
								height: details.result.properties.height,
								birth_year: details.result.properties.birth_year,
							};
						})
					);
				 
					setStore({ peoples: detailedPeople });
					console.log("✅ Datos completos guardados en store.peoples:", getStore().peoples);
				} catch (error) {
					console.error("❌ Error al obtener personajes:", error);
				}
			},
			getInfoPlanets: async () =>  {
				const requestOptions = {
					method: "GET",
				  };
				  
				  try {
					const response = await fetch("https://www.swapi.tech/api/planets", requestOptions);
					const data = await response.json();
					// detalles de planets
					const detailedPlanets = await Promise.all(
						data.results.map(async(planet) => {
							const response = await fetch (planet.url);
							const details =await response.json();
							return {
								uid: planet.uid,
								name: planet.name,
								population: details.result.properties.population,
								climate: details.result.properties.climate,
								terrain: details.result.properties.terrain,
								diameter:details.result.properties.diameter,
								rotation_period:details.result.properties.rotation_period,
								gravity:details.result.properties.gravity,
							};
						})
					);
					setStore({ planets: detailedPlanets });
				} catch (error) {
					console.error(error);
				  }
				},
	
				getInfoStarships: async () =>  {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				  };
				  
				  try {
					const response = await fetch("https://www.swapi.tech/api/starships", requestOptions);
					const data = await response.json();
				// detalles de starships
				const detailedStarships = await Promise.all (
					data.results.map(async(starship) => {
						const response = await fetch (starship.url);
						const details = await response.json();
						return {
							uid: starship.uid,
							name: starship.name,
							passengers: details.result.properties.passengers,
							model: details.result.properties.model,
							cargo_capacity: details.result.properties.cargo_capacity,
							manufacturer: details.result.properties.manufacturer,
							cost_in_credits: details.result.properties.cost_in_credits,
							crew: details.result.properties.crew,
						};
					})
				);



					setStore({starships: detailedStarships})
				
				  } catch (error) {
					console.error(error);
				  }
				},
			
	
		}
	};
};

export default getState;
