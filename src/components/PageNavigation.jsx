import { pagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import { displayedPageIndexAtom } from '../lib/atoms';

import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/16/solid';

export default function PageNavigation() {
	const [displayedPageIndex, setDisplayedPageIndex] = useAtom(
		displayedPageIndexAtom,
	);
	const [pages, setPages] = useAtom(pagesAtom);

	const handleAddPage = () => {
		setPages([
			...pages,
			{
				template: 'titleSubtitle',
				images: {},
				text: {
					title: 'Editar título',
					subtitle: 'Editar subtítulo',
				},
				audios: {},
				loading: {},
			},
		]);
	};

	const handleDeletePage = (e, indexToDelete) => {
		e.stopPropagation();

		const deletePage = () =>
			setPages(pages.filter((_, index) => index !== indexToDelete));

		if (pages.length === 1) {
			alert('No se puede borrar la única página del libro');
		} else if (indexToDelete === displayedPageIndex) {
			setDisplayedPageIndex(
				indexToDelete === 0 ? indexToDelete : indexToDelete - 1,
			);
			deletePage();
		} else if (indexToDelete < displayedPageIndex) {
			setDisplayedPageIndex(displayedPageIndex - 1);
			deletePage();
		} else {
			deletePage();
		}
	};

	const currentPages = pages.map((_, index) => {
		let classString =
			'hover:ring flex items-center transition duration-150 justify-center overflow-clip rounded-lg bg-white font-inter font-bold text-black hover:ring-white';

		index === displayedPageIndex
			? (classString = classString.replace(
					'bg-white',
					'bg-slate-700 text-white ring ring-black ',
				))
			: '';

		return (
			<div key={index} className={classString}>
				<button
					key={index}
					onClick={() => {
						setDisplayedPageIndex(index);
					}}
					className='text-nowrap p-6  hover:cursor-default'
				>
					Página {index + 1}
				</button>
				<button
					className='transtion group flex h-full items-center justify-center bg-red-500 px-2 duration-100 hover:scale-125 hover:cursor-pointer group-hover:ring group-hover:ring-cyan-500'
					onClick={e => {
						handleDeletePage(e, index);
					}}
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
			<span className='w-full text-center font-inter text-2xl font-bold'>
				{displayedPageIndex + 1} / {pages.length}
			</span>
		</>
	);
}
