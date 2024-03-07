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
  const { type, payload } = action;
  switch (type) {
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
              }
            }
          }
          return page;
        })
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
              }
            }
          }
          return page;
        })
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
              }
            }
          }
          return page;
        })
      };
    case 'SET_LOADING':
      return console.log(payload.isLoading),{
        ...state,
        pages: state.pages.map((page, i) => {
          if (i === payload.pageIndex) {
            return {
              ...page,
              isLoading: {
                ...page.isLoading,
                [payload.elementIndex]: payload.isLoading,
              }
            }
          }
          return page;
        })
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
