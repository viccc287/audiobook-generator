export function pageReducer(pages, setPages, type, payload) {
    switch (type) {
        case 'ADD_PAGE':
            const newPage = [
                ...pages,
                {
                    template: payload.template,
                    images: {},
                    text: {
                        title: 'Editar',
                        subtitle: 'Editar',
                    },
                    audios: {},
                    loading: {},
                },
            ];
            return setPages(newPage);

        case 'DELETE_PAGE':
            return setPages(
                pages.filter((_, index) => index !== payload.indexToDelete),
            );
        case 'SET_IMAGE':
            return setPages(
                pages.map((page, i) => {
                    if (i === payload.pageIndex) {
                        return {
                            ...page,
                            images: {
                                ...page.images,
                                [payload.elementKey]: payload.image,
                            },
                        };
                    } else return page;
                }),
            );
        case 'SET_TEXT':
            return setPages(
                pages.map((page, i) => {
                    if (i === payload.pageIndex) {
                        return {
                            ...page,
                            text: {
                                ...page.text,
                                [payload.elementKey]: payload.text,
                            },
                        };
                    } else return page;
                }),
            );
        case 'SET_AUDIO':
            console.log('--- PAYLOAD EN REDUCER: ', payload)
			return setPages(
				pages.map((page, i) => {
					if (i === payload.pageIndex) {
						return {
							...page,
							audios: {
								...page.audios,
								[payload.elementKey]: payload.audio,
							},
						};
					} else return page;
				}),
			);
		case 'SET_LOADING':
			return setPages(
				pages.map((page, i) => {
					if (i === payload.pageIndex) {
						return {
							...page,
							loading: {
								...page.loading,
								[payload.elementKey]: payload.loading,
							},
						};
					} else return page;
				}),
			);

		default:
			return pages;
	}
}
