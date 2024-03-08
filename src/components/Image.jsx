import { useRef } from 'react';
import { PhotoIcon } from '@heroicons/react/16/solid';
import { pageReducer } from '../lib/pageReducer';
import { pagesAtom, displayedPageIndexAtom } from '../lib/atoms';
import { useAtom, useAtomValue } from 'jotai';

function Image({ width, height, elementKey }) {
	const fileInputRef = useRef(null);

	const [pages, setPages] = useAtom(pagesAtom);
	const displayedPageIndex = useAtomValue(displayedPageIndexAtom);

	const currentPage = pages[displayedPageIndex];

	const setImage = file => {
		pageReducer(pages, setPages, 'SET_IMAGE', {
			pageIndex: displayedPageIndex,
			elementKey: elementKey,
			image: URL.createObjectURL(file),
		});
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		setImage(file);
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDrop = e => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setImage(file);
	};

	const handleClick = e => {
		e.stopPropagation();
		fileInputRef.current.click();
	};

	return (
		<label
			className={`flex h-${height} w-${width} cursor-pointer justify-center ${
				currentPage.images[elementKey]
					? ''
					: 'border-4 border-dashed border-white/50'
			}`}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onClick={handleClick}
		>
			<input
				ref={fileInputRef}
				className='hidden'
				type='file'
				onChange={handleImageChange}
			/>
			{currentPage.images[elementKey] ? (
				<img
					className='size-full object-cover'
					src={currentPage.images[elementKey]}
					alt='Preview'
					width='200'
				/>
			) : (
				<PhotoIcon className='w-64 text-neutral-400 ' />
			)}
		</label>
	);
}

export default Image;
