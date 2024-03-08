import { useRef } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

import {
	PlusCircleIcon,
	TrashIcon,
	XCircleIcon,
	XMarkIcon,
} from '@heroicons/react/16/solid';

export default function PageNavigation({
	currentDisplayedPageIndex,
	changeDisplayedPageFunction,
}) {
	const { state, dispatch } = useGlobalContext();

	const handleAddPage = () => {
		dispatch({
			type: 'ADD_PAGE',
		});
	};

	const handleDeletePage = (e, indexToDelete) => {
		e.stopPropagation();
		const deletePage = () =>
			dispatch({
				type: 'DELETE_PAGE',
				payload: {
					pageIndex: indexToDelete,
				},
			});

		if (state.pages.length === 1) {
			alert('No se puede borrar la única página del libro');
		} else if (indexToDelete === currentDisplayedPageIndex) {
			changeDisplayedPageFunction(
				indexToDelete === 0 ? indexToDelete : indexToDelete - 1,
			);
			deletePage();
		} else if (indexToDelete < currentDisplayedPageIndex) {
			changeDisplayedPageFunction(currentDisplayedPageIndex - 1);
			deletePage();
		} else {
			deletePage();
		}
	};

	const currentPages = state.pages.map((_, index) => {
		return (
			<div
				className={`hover:ring flex items-center transition duration-150 justify-center overflow-clip rounded-lg bg-white font-jakarta font-bold text-black hover:ring-white ${index === currentDisplayedPageIndex ? ' bg-indigo-700 text-white ring ring-black' : ''}`}
			>
				<button
					key={index}
					onClick={() => {
						changeDisplayedPageFunction(index);
					}}
					className='text-nowrap p-6  hover:cursor-default'
				>
					Página {index + 1}
				</button>
				<button
					className='transtion flex h-full items-center justify-center bg-red-500 hover:scale-125 px-2 duration-100 hover:cursor-pointer group group-hover:ring group-hover:ring-cyan-500'
					onClick={e => handleDeletePage(e, index)}
				>
					<XMarkIcon className='h-8 text-white group-hover:scale-125' />
				</button>
			</div>
		);
	});

	return (
		<>
			{currentPages}
			<PlusCircleIcon
				onClick={() => {
					handleAddPage();
				}}
				className='aspect-video rounded-lg bg-white/20 p-2 text-sm text-white/40 transition duration-200 hover:ring hover:ring-white/50'
            />
            <span className='w-full text-center font-jamarta text-2xl font-bold'>
                {currentDisplayedPageIndex+1} / {state.pages.length}
            </span>
		</>
	);
}
