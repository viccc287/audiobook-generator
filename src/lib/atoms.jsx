import { atom } from 'jotai';

export const pagesAtom = atom([
	{
		name: 'Prefacio',
		template: 'titleSubtitle',
		color: '#FFFFFF',
		images: {},
		text: {
			title: 'Tito el jaguar',
			subtitle:
				'Tito es un jaguar aventurero y amigable que ama explorar y descubrir cosas nuevas. Con su ayuda, podrás aprender habilidades importantes para ser un aventurero valiente y seguro de ti mismo. Te invita a unirte a él en sus emocionantes aventuras llenas de juegos y actividades divertidas. ¡Tito es el compañero perfecto para Tribunales Amigables!',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 1',
		template: 'titleSubtitle',
		color: '#FFFFFF',
		images: {},
		text: {
			title: 'Capítulo 1: ¡Comienza la aventura!',
			subtitle:
				'Un día soleado, Tito se despertó con una gran sonrisa en su rostro. Hoy era el día perfecto para una nueva aventura.',
		},
		audios: {},
		loading: {},
	},
	{
		name: 'Cap 2',
		template: 'textImage',
		color: '#FFFFFF',
		images: {},
		text: {
			title: 'Capítulo 2: En busca del tesoro',
			subtitle:
				'Michael el mono se unió a Tito en su búsqueda del tesoro escondido en la selva. Juntos, se enfrentaron a muchos desafíos emocionantes.',
		},
		audios: {},
		loading: {},
	},
]);

export const displayedPageIndexAtom = atom(0);

export const currentPageTextAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].text,
	(get, set, newText) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].text = newText;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageTemplateAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].template,
	(get, set, newTemplate) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].template = newTemplate;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageNameAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].name,
	(get, set, newName) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].name = newName;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageColorAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].color,
	(get, set, newColor) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].color = newColor;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageImagesAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].images,
	(get, set, newImages) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].images = newImages;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageAudiosAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].audios,
	(get, set, newAudios) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].audios = newAudios;
		set(pagesAtom, [...pages]);
	},
);

export const currentPageLoadingAtom = atom(
	get => get(pagesAtom)[get(displayedPageIndexAtom)].loading,
	(get, set, newLoading) => {
		const pageIndex = get(displayedPageIndexAtom);
		const pages = get(pagesAtom);
		pages[pageIndex].loading = newLoading;
		set(pagesAtom, [...pages]);
	},
);
