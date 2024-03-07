// GlobalContext.js
import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const initialState = {
  images: {},
  text: {
    0: 'Tito el jaguar',
    1: 'Tito es un jaguar aventurero y amigable que ama explorar y descubrir cosas nuevas. Con su ayuda, podrás aprender habilidades importantes para ser un aventurero valiente y seguro de ti mismo. Te invita a unirte a él en sus emocionantes aventuras llenas de juegos y actividades divertidas. ¡Tito es el compañero perfecto para Tribunales Amigables!'
  },
  audios: {},
  isLoading: {},
};

function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        images: {
          ...state.images,
          [action.payload.index]: action.payload.image,
        },
      };
    case 'SET_TEXT':
      console.log(state)
        return {
          ...state,
          text: {
            ...state.text,
            [action.payload.index]: action.payload.text,
          },
        };
    case 'SET_AUDIO':
      return {
        ...state,
        audios: {
          ...state.audios,
          [action.payload.index]: action.payload.audio,
        },
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.payload.index]: action.payload.isLoading,
        },
      };
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
