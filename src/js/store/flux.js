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

			async getInfoPeople() {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				  };
				  
				  try {
					// fetch inicial para lista de personajes
					const response = await fetch("https://www.swapi.tech/api/people", requestOptions);
					const result = await response.json();
	
					const detailedPeople = await Promise.all 
					(
						result.results.map (async (personAllInfo) => {
						const detailResponse = await fetch (`https://www.swapi.tech/api/people/${personAllInfo.uid}`, requestOptions); // person.uid proviene del objeto person en el bucle .map (es decir, del array de personajes). Es un identificador único para cada personaje.
						const detailResult = await detailResponse.json();
						return detailResult.result.properties;
				  })
					);
					setStore({peoples: detailedPeople});
					console.log(detailedPeople)
				  } catch (error) {
					console.error("error al objetener la informacion de personajes");
				  }
				  },

			async getInfoPlanets() {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				  };
				  
				  try {
					const response = await fetch("https://www.swapi.tech/api/planets", requestOptions);
					const result = await response.json();
// la info detallada de planetas
					const detailedPlanets = await Promise.all(
						result.results.map(async (planetAllInfo) => {
						
							const detailResponse = await fetch (`https://www.swapi.tech/api/planets/${planetAllInfo.uid}`, requestOptions);
							const detailResult = await detailResponse.json();
					return  detailResult.result.properties;
					})
					)

					setStore({planets: detailedPlanets})
					console.log("Planets Data:",detailedPlanets)
				  } catch (error) {
					console.error(error);
				  }
				},
	
				async getInfoStarships() {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				  };
				  
				  try {
					const response = await fetch("https://www.swapi.tech/api/starships", requestOptions);
					const result = await response.json();
					// info detallada de naves
					const detailedStarships = await Promise.all (
						result.results.map(async (starship) =>{
							const detailResponse= await fetch (`https://www.swapi.tech/api/starships/${starship.uid}`, requestOptions);
							const detailResult = await detailResponse.json();
							return detailResult.result.properties;
						})
					)
					setStore({starships: detailedStarships})
					console.log(detailedStarships)
				  } catch (error) {
					console.error(error);
				  }
				}
			
	
		}
	};
};

export default getState;
