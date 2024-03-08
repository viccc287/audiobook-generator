// GlobalContext.js
import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const initialState = {
  pages: [
    {
      images: {},
      text: {
        0: 'Tito el jaguar',
        1: 'Tito es un jaguar aventurero y amigable que ama explorar y descubrir cosas nuevas. Con su ayuda, podrás aprender habilidades importantes para ser un aventurero valiente y seguro de ti mismo. Te invita a unirte a él en sus emocionantes aventuras llenas de juegos y actividades divertidas. ¡Tito es el compañero perfecto para Tribunales Amigables!',
      },
      audios: {},
      isLoading: {},
    },
    {
      images: {},
      text: {
        0: 'La selva de Tito',
        1: 'Tito vive en una vasta selva llena de árboles altos, ríos brillantes y una gran variedad de animales. Aunque a veces la selva puede ser un lugar peligroso, Tito sabe cómo moverse con seguridad y respetar a los demás habitantes de la selva.',
      },
      audios: {},
      isLoading: {},
    },
    {
      images: {},
      text: {
        0: 'Amigos de Tito',
        1: 'En sus aventuras, Tito ha hecho muchos amigos. Desde el mono travieso hasta el perezoso lento, cada uno de ellos tiene algo especial que los hace únicos. Tito valora a todos sus amigos y siempre está dispuesto a ayudarlos cuando lo necesitan.',
      },
      audios: {},
      isLoading: {},
    },
    {
      images: {},
      text: {
        0: 'El desafío de Tito',
        1: 'Un día, Tito se enfrenta a un gran desafío. Un puente que los animales usan para cruzar un río rápido se ha roto. Tito debe encontrar una manera de ayudar a sus amigos a cruzar el río de manera segura.',
      },
      audios: {},
      isLoading: {},
    },
    {
      images: {},
      text: {
        0: 'El triunfo de Tito',
        1: 'Con ingenio y coraje, Tito logra construir un nuevo puente con la ayuda de sus amigos. Todos están agradecidos y celebran el éxito de Tito. Una vez más, Tito demuestra que con valentía y amistad, se pueden superar los desafíos más grandes.',
      },
      audios: {},
      isLoading: {},
    },
  ],
  
};

export default initialState;


function globalReducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case 'ADD_PAGE':
			return {
				...state,
				pages: [
					...state.pages,
					{
						images: {},
						text: {
							0: 'Haz click aqui para escribir',
							1: 'Haz click aqui para escribir',
						},
						audios: {},
						isLoading: {},
					},
				],
			};
		case 'DELETE_PAGE':
			
			const newState = {
				...state,
				pages: state.pages.filter((_, index) => index !== payload.pageIndex),
			};
			
			return newState;
		case 'SET_IMAGE':
			return {
				...state,
				pages: state.pages.map((page, i) => {
					if (i === payload.pageIndex) {
						return {
							...page,
							images: {
								...page.images,
								[payload.elementIndex]: payload.image,
							},
						};
					}
					return page;
				}),
			};
		case 'SET_TEXT':
			return {
				...state,
				pages: state.pages.map((page, i) => {
					if (i === payload.pageIndex) {
						return {
							...page,
							text: {
								...page.text,
								[payload.elementIndex]: payload.text,
							},
						};
					}
					return page;
				}),
			};
		case 'SET_AUDIO':
			return {
				...state,
				pages: state.pages.map((page, i) => {
					if (i === payload.pageIndex) {
						return {
							...page,
							audios: {
								...page.audios,
								[payload.elementIndex]: payload.audio,
							},
						};
					}
					return page;
				}),
			};
		case 'SET_LOADING':
			return (
				console.log(payload.isLoading),
				{
					...state,
					pages: state.pages.map((page, i) => {
						if (i === payload.pageIndex) {
							return {
								...page,
								isLoading: {
									...page.isLoading,
									[payload.elementIndex]: payload.isLoading,
								},
							};
						}
						return page;
					}),
				}
			);
		default:
			return state;
	}
}

export function GlobalProvider({ children }) {
	const [state, dispatch] = useReducer(globalReducer, initialState);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
}

export function useGlobalContext() {
	return useContext(GlobalContext);
}
