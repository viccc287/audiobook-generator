import { useRef } from 'react';
import { PhotoIcon } from '@heroicons/react/16/solid';
import { useGlobalContext } from '../contexts/GlobalContext';

function Image({ width, height, pageIndex, elementIndex }) {
	const { state, dispatch } = useGlobalContext();
	const fileInputRef = useRef(null);

	const currentPage = state.pages[pageIndex];


	const handleImageChange = e => {
		const file = e.target.files[0];
		dispatch({
			type: 'SET_IMAGE',
			payload: {
				pageIndex: pageIndex,
				elementIndex: elementIndex,
				image: URL.createObjectURL(file),
			},
		});
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDrop = e => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		dispatch({
			type: 'SET_IMAGE',
			payload: {
				pageIndex: pageIndex,
				elementIndex: elementIndex,
				image: URL.createObjectURL(file),
			},
		});
	};

	const handleClick = () => {
		e.stopPropagation();
		fileInputRef.current.click();
	};

	return (
		<label
			className={`flex aspect-video h-${height} w-${width} cursor-pointer justify-center ${
				currentPage.images[elementIndex]
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
			{currentPage.images[elementIndex] ? (
				<img
					className='size-full object-cover'
					src={currentPage.images[elementIndex]}
					alt='Preview'
					width='200'
				/>
			) : (
				<PhotoIcon className='h-full text-neutral-400 ' />
			)}
		</label>
	);
}

export default Image;
