import { useRef } from 'react';
import { PhotoIcon } from '@heroicons/react/16/solid';
import { currentPageImagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';

function Image({ width, height, elementKey }) {
	const fileInputRef = useRef(null);

	const [images, setImages] = useAtom(currentPageImagesAtom);

	const handleImageChange = e => {
		const file = e.target.files[0];
		const imageURL = URL.createObjectURL(file);
		setImages({ ...images, [elementKey]: imageURL });
	};

	const handleDragOver = e => {
		e.preventDefault();
	};

	const handleDrop = e => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		const imageURL = URL.createObjectURL(file);
		setImages({ ...images, [elementKey]: imageURL });
	};

	return (
		<label
			className={`flex w-${width} h-${height} cursor-pointer justify-center border-4 border-white/50 ${
				images[elementKey] ? `` : `border-4 border-dashed`
			}`}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<input
				ref={fileInputRef}
				className='hidden'
				type='file'
				onChange={handleImageChange}
			/>
			{images[elementKey] ? (
				<img
					className='object-cover'
					src={images[elementKey]}
					alt='Preview'
				/>
			) : (
				<PhotoIcon className='w-full text-neutral-400 ' />
			)}
		</label>
	);
}

export default Image;
