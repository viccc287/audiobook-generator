import {
	Box,
	Button,
	Flex,
	Icon,
	IconButton,
	Image,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Radio,
	RadioGroup,
	SimpleGrid,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
	Tooltip,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { textToImage } from '@huggingface/inference';
import { useAtom, useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import { FaImage, FaWandMagicSparkles, FaXmark } from 'react-icons/fa6';
import { imageApiKeyAtom, currentPageImagesAtom } from '../lib/atoms';
import tinycolor from 'tinycolor2';

function CustomImage({ elementKey, color }) {
	const fileInputRef = useRef(null);
	const abortController = useRef(null);

	const toast = useToast();

	let dimmedColor = tinycolor(color);
	dimmedColor.setAlpha(0.4);
	dimmedColor = dimmedColor.toRgbString();

	const { isOpen: isPopoverOpen, onOpen: openPopover, onClose: closePopover } = useDisclosure();

	const [images, setImages] = useAtom(currentPageImagesAtom);
	const imageApiKey = useAtomValue(imageApiKeyAtom);
	const [imageLoading, setImageLoading] = useState(false);
	const [textPrompt, setTextPrompt] = useState('');
	const [proptImageStyle, setPromptImageStyle] = useState('default');
	const [widthValue, setWidthValue] = useState(512);
	const [heightValue, setHeightValue] = useState(512);
	const [isTextPromptInvalid, setIsTextPromptInvalid] = useState(false);

	const handleImageChange = e => {
		const file = e.target.files[0];
		e.target.value = null;
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

	const handleDelete = e => {
		e.preventDefault();
		e.stopPropagation();

		const updatedImages = { ...images };
		delete updatedImages[elementKey];
		setImages(updatedImages);
	};

	const handleTextPromptInput = e => {
		setTextPrompt(e.target.value);
	};

	const abortGeneration = e => {
		e.preventDefault();
		e.stopPropagation();
		abortController.current.abort();
	};

	const handleGenerateImage = async e => {
		e.preventDefault();
		e.stopPropagation();

		if (!textPrompt || textPrompt.trim() === '') {
			toast({
				title: 'Texto vacío',
				description: `Ingresa una descripción para la imagen`,
				status: 'warning',
				duration: 3000,
				isClosable: true,
			});
			setIsTextPromptInvalid(true);
			return;
		}

		setIsTextPromptInvalid(false);

		setImageLoading(true);
		abortController.current = new AbortController();

		const promptStyles = {
			default: '',
			drawing: 'hand drawn, doodle for kids, colorized',
			'3d': 'render 3D, 3D model',
			realistic: 'photography, 4k, photorealistic',
			painting: 'oil painting, impressionism',
			anime: 'cartoon anime style, japanese',
		};

		try {
			let finalStylizedPrompt;

			if (proptImageStyle === 'default') {
				finalStylizedPrompt = textPrompt;
			} else {
				finalStylizedPrompt = `${textPrompt}. ${promptStyles[proptImageStyle]}`;
			}

			const imageBlob = await textToImage(
				{
					accessToken: imageApiKey,
					model: 'black-forest-labs/FLUX.1-schnell',
					inputs: finalStylizedPrompt,
					parameters: {
						num_inference_steps: 8,
						height: heightValue,
						width: widthValue,
					},
				},
				{
					use_cache: false,
					signal: abortController.current.signal,
				},
			);

			const imageURL = URL.createObjectURL(imageBlob);
			setImages({ ...images, [elementKey]: imageURL });
			toast({
				title: 'Imagen generada',
				description: `Imagen '${textPrompt}' generada`,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			closePopover();
		} catch (e) {
			if (e instanceof DOMException && e.name === 'AbortError') {
				toast({
					title: 'Generación de imagen cancelada',
					description: `La generación de la imagen fue cancelada.`,
					status: 'info',
					duration: 4000,
					isClosable: true,
				});
			} else {
				console.error(e);
				toast({
					title: 'Error generando la imagen',
					description: `Intenta de nuevo en unos segundos. Si el problema persiste contacta a un administrador.`,
					status: 'error',
					duration: 4000,
					isClosable: true,
				});
			}
		} finally {
			setImageLoading(false);
		}
	};

	return (
		<Tooltip label='Cargar nueva imagen' hasArrow openDelay={400} onFocus={e=>e.preventDefault()}>
			<Flex
				h={['50svw', 'auto']}
				w={['50svw', '75%', '100%']}
				grow={1}
				align='center'
				justify='center'
				outline={images[elementKey] ? '3px dotted transparent' : `3px dotted ${dimmedColor}`}
				_hover={{ outline: `3px dotted ${dimmedColor}` }}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				rounded='10px'
				position='relative'
				direction='column'
				transition='all 100ms'
				onClick={() => fileInputRef.current.click()}
				cursor='pointer'
			>
				<Input ref={fileInputRef} display='none' type='file' onChange={handleImageChange} />

				<Flex pos='relative' h='fit' align='center' justify='center'>
					<Image
						src={images[elementKey]}
						transition='all 100ms'
						filter='drop-shadow(0 5px 20px rgba(0,0,0,0.3))'
						alt='Preview'
						fit='contain'
						objectPosition='end'
						borderRadius='10px'
						fallback={<Icon as={FaImage} color={dimmedColor} boxSize={{ base: 16, md: 32, xl: 48 }} />}
					/>

					{/* Popover */}
					<Flex onClick={e=>e.stopPropagation()} pointerEvents='none' pos='absolute' left={0} top={0} boxSize='full' align='start' justify='end'>
						<Flex
							pointerEvents='auto'
							boxSize='fit-content'
							align='center'
							justify='center'
							overflow='clip'
							bgColor='white'
							_dark={{ bgColor: 'gray.800' }}
							rounded='10px'
							boxShadow='0 5px 20px rgba(0,0,0,0.25)'
							zIndex={1}
						>
							<Popover  strategy='fixed' isLazy onClose={closePopover} isOpen={isPopoverOpen} onOpen={openPopover}>
								<PopoverTrigger>
									<Box display='inline-block'>
										<Tooltip label='Generar imagen desde texto' hasArrow openDelay={400}>
											<IconButton bg='transparent' icon={<FaWandMagicSparkles /> }></IconButton>
										</Tooltip>
									</Box>
								</PopoverTrigger>
								<PopoverContent
									cursor='default'
									fontFamily='inter'
									fontSize='sm'
									onClick={e => {
										e.preventDefault();
										e.stopPropagation();
									}}
								>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverHeader fontWeight='bold'>Generar imagen</PopoverHeader>
									<PopoverBody as={Flex} justifyContent='center' direction='column' gap={3} px={5}>
										<Text fontWeight='bold'>Ingresa la descripción de la imagen</Text>
										<Input
											_invalid={{ border: '2px dotted red' }}
											isInvalid={isTextPromptInvalid}
											value={textPrompt}
											placeholder='Una niña leyendo un libro...'
											fontSize='small'
											onChange={handleTextPromptInput}
										></Input>

										<Text fontWeight='bold'>Selecciona el estilo (opcional)</Text>

										<RadioGroup
											colorScheme='brand'
											onChange={setPromptImageStyle}
											value={proptImageStyle}
											size='sm'
											onClick={e => {
												e.stopPropagation();
											}}
										>
											<SimpleGrid columns={2} align='center'>
												<Radio value='default'>Por defecto</Radio>
												<Radio value='drawing'>Dibujo</Radio>
												<Radio value='3d'>3D</Radio>
												<Radio value='realistic'>Realista</Radio>
												<Radio value='painting'>Pintura</Radio>
												<Radio value='anime'>Anime</Radio>
											</SimpleGrid>
										</RadioGroup>

										<Text fontWeight='bold'>Selecciona el tamaño de la imagen</Text>

										<Flex w='100%' gap={10} justifyContent='center' fontSize='smaller'>
											<Slider
												w='70%'
												value={widthValue}
												min={128}
												max={1024}
												step={64}
												onChange={val => setWidthValue(val)}
											>
												<SliderTrack>
													<SliderFilledTrack bg='brand.400' />
												</SliderTrack>
												<SliderThumb bg='brand.400' />
											</Slider>
											<Text w='30%'>Ancho: {widthValue}</Text>
										</Flex>
										<Flex w='100%' gap={10} justifyContent='center' fontSize='smaller'>
											<Slider
												w='70%'
												value={heightValue}
												min={128}
												max={1024}
												step={128}
												onChange={val => setHeightValue(val)}
											>
												<SliderTrack>
													<SliderFilledTrack bg='brand.400' />
												</SliderTrack>
												<SliderThumb bg='brand.400' />
											</Slider>
											<Text w='30%'>Alto: {heightValue}</Text>
										</Flex>

										{(widthValue >= 768 || heightValue >= 768) && (
											<Text
												fontWeight='semibold'
												fontSize='xs'
												color='blackAlpha.600'
												_dark={{ color: 'whiteAlpha.600' }}
											>
												*Una imagen grande tardará un poco más en generarse
											</Text>
										)}

										<Button
											onClick={handleGenerateImage}
											isLoading={imageLoading}
											loadingText={`Generando imagen`}
											fontSize='normal'
											colorScheme='green'
											size='lg'
										>
											Generar imagen
										</Button>

										<Button isDisabled={!imageLoading} size='xs' colorScheme='red' onClick={abortGeneration}>
											Cancelar
										</Button>
									</PopoverBody>
								</PopoverContent>
							</Popover>

							{images[elementKey] && (
								<Tooltip label='Eliminar imagen' hasArrow openDelay={400}>
									<IconButton
										pointerEvents='auto'
										icon={<FaXmark color='red' />}
										onClick={handleDelete}
										bg='transparent'
										boxShadow='0 5px 20px rgba(0,0,0,0.25)'
									/>
								</Tooltip>
							)}
						</Flex>
					</Flex>
				</Flex>

				{!images[elementKey] && (
					<Text fontStyle='italic' fontWeight='bold' color={dimmedColor}>
						Haz clic o arrastra una imagen aquí
					</Text>
				)}
			</Flex>
		</Tooltip>
	);
}

export default CustomImage;
