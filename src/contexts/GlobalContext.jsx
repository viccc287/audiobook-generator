// GlobalContext.js
import React, { createContext, useContext, useReducer } from 'react';

const GlobalContext = createContext();

const initialState = {
  pages: [
    {
      images: {},
      text: {
        0: 'Tito el jaguar',
        1: 'Tito es un jaguar aventurero y amigable que ama explorar y descubrir cosas nuevas. Con su ayuda, podrás aprender habilidades importantes para ser un aventurero valiente y seguro de ti mismo. Te invita a unirte a él en sus emocionantes aventuras llenas de juegos y actividades divertidas. ¡Tito es el compañero perfecto para Tribunales Amigables!'
      },
      audios: {},
      isLoading: {},
    }
  ]
};

function globalReducer(state, action) {
  const { pageIndex, elementIndex, payload } = action;
  const updatedPage = { ...state.pages[pageIndex] };

  switch (action.type) {
    case 'SET_IMAGE':
      updatedPage.images[elementIndex] = payload.image;
      return {
        ...state,
        pages: state.pages.map((page, i) => (i === pageIndex ? updatedPage : page))
      };
    case 'SET_TEXT':
      updatedPage.text[elementIndex] = payload.text;
      return {
        ...state,
        pages: state.pages.map((page, i) => (i === pageIndex ? updatedPage : page))
      };
    case 'SET_AUDIO':
      updatedPage.audios[elementIndex] = payload.audio;
      return {
        ...state,
        pages: state.pages.map((page, i) => (i === pageIndex ? updatedPage : page))
      };
    case 'SET_LOADING':
      updatedPage.isLoading[elementIndex] = payload.isLoading;
      return {
        ...state,
        pages: state.pages.map((page, i) => (i === pageIndex ? updatedPage : page))
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
