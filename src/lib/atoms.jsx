import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const currentAudioInstanceAtom = atom(null);

export const pagesAtom = atom([
	{
		name: 'Portada',
		template: 'cover',
		color: '#2F1834',
		images: {},
		text: {
			title: 'Título',
			subtitle: '',
		},
		audios: {},
		loading: {},
	},
]);

export const displayedPageIndexAtom = atom(0);

export const textApiKeyAtom = atomWithStorage('textKey', 'Ok2iyhqrvNzN11NgThRDTia94cH4jA96Mwhbom5J');
export const audioApiKeyAtom = atomWithStorage('audioKey', 'sk_c5d9f056607e5b43bac904445842f0105160e72c47357a6b');
export const imageApiKeyAtom = atomWithStorage('imageKey', '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');

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
