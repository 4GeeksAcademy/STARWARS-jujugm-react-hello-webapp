const getState = ({ getStore, getActions, setStore }) => {
	return {
			store: {
				peoples: [], // Cambiado de cards.peoples a directamente peoples
				planets: [],
				starships: [],
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
					setStore({planets: result.results})
					console.log(result)
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
					setStore({starships: result.results})
					console.log(result)
				  } catch (error) {
					console.error(error);
				  }
				}
			
	
		}
	};
};

export default getState;
