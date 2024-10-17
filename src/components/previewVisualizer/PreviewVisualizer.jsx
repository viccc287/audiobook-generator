import { Button, Flex, Icon } from '@chakra-ui/react';
import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaArrowRotateRight, FaBackwardFast, FaForwardFast } from 'react-icons/fa6';
import HTMLFlipBook from 'react-pageflip';
import Cover from './Cover';
import Page from './Page';
import PushButton from './PushButton';

export default function PreviewVisualizer({ book }) {
	const currentBook = JSON.parse(JSON.stringify(book));
	const trimmedBook = currentBook.slice(1);

	const bookRef = useRef();


	function flipNext() {
		bookRef.current.pageFlip().flipNext();
	}
	function flipPrev() {
		bookRef.current.pageFlip().flipPrev();
	}

	function restartBook() {
		bookRef.current.pageFlip().flip(0);
	}
	function endBook() {
		bookRef.current.pageFlip().flip(bookRef.current.pageFlip().getPageCount() - 1);
	}

	const cover = currentBook[0];
	const coverTitle = cover.text.title;
	const coverAudios = cover.audios;
	const coverSubtitle = cover.text.subtitle;
	const coverImage = cover.images.first;
	const coverColor = cover.color;

	return (
		<Flex w='full' h='full' overflow='clip' direction='column' align='center' justify='center' bgColor='#552F7E'>
			 
				<>
					<Flex w='full' h='full' justify='center' align='center' sx={{containerType: 'inline-size'}}>
						<HTMLFlipBook
							size='stretch'
							flippingTime={750}
							ref={bookRef}
							width={700}
							height={700}
							minWidth={315}
							maxWidth={3840}
							minHeight={600}
							maxHeight={900}
							maxShadowOpacity={0.5}
							showCover={true}
                mobileScrollSupport={true}
						>
							<Cover
								title={coverTitle}
								subtitle={coverSubtitle}
								bgColor={coverColor}
								image={coverImage}
								audios={coverAudios}
							></Cover>
							{trimmedBook.map((page, index) => (
								<Page
									key={index}
									template={page.template}
									title={page.text.title}
									subtitle={page.text.subtitle}
									bgColor={page.color}
									images={page.images}
									audios={page.audios}
								></Page>
							))}
							<Cover title='¡Has terminado!' subtitle='¡Ve por otro libro!' bgColor={coverColor}>
								<Flex direction='column' gap={4} w='300px'>
									<Button
										h='fit'
										py={4}
										bg='orange.500'
										color='white'
										fontFamily='playpen'
										leftIcon={<FaArrowRotateRight />}
										onClick={restartBook}
										_hover={{ transform: 'scale(1.10)' }}
										_active={{ transform: 'scale(1.05)' }}
									>
										VOLVER A LEER
									</Button>
								</Flex>
							</Cover>
						</HTMLFlipBook>
					</Flex>
					<Flex
						overflow='visible'
						rounded='20px'
						p={8}
						pos='absolute'
						bottom={0}
						w='fit'
						align='center'
						justify='center'
						gap={[2, 3, 4, 4, 6, 8]}
					>
						<PushButton
							nColor='#C05621'
							size={50}
							icon={<Icon as={FaBackwardFast} boxSize='40%' />}
							onClick={restartBook}
						/>
						<PushButton
							nColor='green'
							size={60}
							icon={<Icon as={FaArrowLeft} boxSize='50%' />}
							onClick={flipPrev}
							bindedKey='ArrowLeft'
						/>
						<PushButton
							nColor='green'
							size={60}
							icon={<Icon as={FaArrowRight} boxSize='50%' />}
							onClick={flipNext}
							bindedKey='ArrowRight'
						/>
						<PushButton nColor='#C05621' size={50} icon={<Icon as={FaForwardFast} boxSize='40%' />} onClick={endBook} />
					</Flex>
				</>
			
		</Flex>
	);
}
