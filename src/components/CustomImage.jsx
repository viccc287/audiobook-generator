import { useRef } from 'react';
import { currentPageImagesAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import { FaImage } from 'react-icons/fa6';
import { Flex, Icon, Image, Input } from '@chakra-ui/react';

function CustomImage({ elementKey, color }) {
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
			maxh='full'
			w='full'
			cursor='pointer'
			align='center'
			justify='center'
			border={images[elementKey] ? '' : `3px dashed ${color}`}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			rounded='10px'
		>
			<Input ref={fileInputRef} display='none' type='file' onChange={handleImageChange} />

			<Image
				src={images[elementKey]}
				transition='all 200ms'
				_hover={{
					transform: 'scale(1.03)'
				}}
				filter= 'drop-shadow(0 5px 20px rgba(0,0,0,0.3))'
				h='full'
				alt='Preview'
				fit='contain'
				objectPosition='end'
				borderRadius='10px'
				fallback={<Icon as={FaImage} color={color} boxSize={{ base: 16, md: 32, xl: 48 }} />}
			/>
		</Flex>
	);
}

export default CustomImage;
