import { atom, useAtom } from 'jotai'

export const pagesAtom = atom([
    {
        template: 'titleSubtitle',
        images: {},
        text: {
          title: 'Tito el jaguar',
          subtitle: 'Tito es un jaguar aventurero y amigable que ama explorar y descubrir cosas nuevas. Con su ayuda, podrás aprender habilidades importantes para ser un aventurero valiente y seguro de ti mismo. Te invita a unirte a él en sus emocionantes aventuras llenas de juegos y actividades divertidas. ¡Tito es el compañero perfecto para Tribunales Amigables!',
        },
        audios: {},
        loading: {},
    },
    {
        template: 'textOnly',
        images: {},
        text: {
          title: 'Pag 2',
          subtitle: 'Michael',
        },
        audios: {},
        loading: {},
      }
    
])


export const displayedPageIndexAtom = atom(0)