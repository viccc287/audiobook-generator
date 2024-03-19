import { useRef } from 'react';
import { currentPageImagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import { FaImage } from 'react-icons/fa6';
import { Flex, Icon, Image } from '@chakra-ui/react';

function CustomImage({ width, height, elementKey }) {
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
		<Flex
			as='label'
			h='full'
			w='full'
			cursor='pointer'
			align='center'
			justify='center'
			border={images[elementKey] ? '' : '3px dashed rgba(255,255,255,0.5)'}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			rounded='10px'
		>
			<input ref={fileInputRef} className='hidden' type='file' onChange={handleImageChange} />

			<Image
				src={images[elementKey]}
				h='full'
				alt='Preview'
				fit='contain'
				fallback={<Icon as={FaImage} color='whiteAlpha.500' boxSize={{ base: 16, md: 32, xl: 48 }} />}
			/>
		</Flex>
	);
}

export default CustomImage;
