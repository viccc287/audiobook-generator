import {
	Button,
	IconButton,
	Popover,
	Flex,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	RadioGroup,
	Text,
	Input,
	useDisclosure,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Heading,
	useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaGear, FaUpload } from 'react-icons/fa6';
import CustomAudioPlayer from './CustomAudioPlayer';

import { useAtom, useAtomValue } from 'jotai';
import { currentPageAudiosAtom, currentPageLoadingAtom, apiKeyAtom } from '../lib/atoms';
import VoiceRadioItem from './VoiceRadioItem';

function IndividualPanel({ textToSend, elementKey }) {
	const voicesJSON = [
		{ name: 'Bill', id: 'pqHfZKP75CvOlQylNhV4', gender: 'male' },
		{ name: 'Liam', id: 'TX3LPaxmHKxFdv7VOQHJ', gender: 'male' },
		{ name: 'Patrick', id: 'ODq5zmih8GrVes37Dizd', gender: 'male' },
		{ name: 'Harry', id: 'SOYHLrjzK2X1ezoPC6cr', gender: 'male' },
		{ name: 'Sarah', id: 'EXAVITQu4vr4xnSDxMaL', gender: 'female' },
		{ name: 'Alice', id: 'Xb7hH8MSUJpSbSDYk0k2', gender: 'female' },
		{ name: 'Freya', id: 'jsCqWAovK2LkecY7zXl4', gender: 'female' },
		{ name: 'Grace', id: 'oWAxZDx7w5VEj9dCyTzz', gender: 'female' },
	];

	const [selectedVoiceName, setSelectedVoiceName] = useState(voicesJSON[0].name);

	const [audios, setAudios] = useAtom(currentPageAudiosAtom);
	const [loading, setLoading] = useAtom(currentPageLoadingAtom);
	const apiKey = useAtomValue(apiKeyAtom)

	const toast = useToast();

	const fileInputRef = useRef(null);

	const { isOpen: isTTSAlertOpen, onOpen: openTTSAlert, onClose: closeTTSAlert } = useDisclosure();

	const cancelRef = useRef();

	const validateText = () => {
		if (!textToSend) toast({
			title: 'Oops!',
			description: `Parece que no hay texto por aquí... ¡Escribe algo y vuelve a intentar!`,
			status: 'warning',
			duration: 4000,
			isClosable: true,
		})
		else openTTSAlert();
	}

	const handleFileUpload = e => {
		e.preventDefault();
		if (fileInputRef.current.files.length > 0) {
			setAudios({
				...audios,
				[elementKey]: {
					file: fileInputRef.current.files[0],
					url: URL.createObjectURL(fileInputRef.current.files[0]),
					name: fileInputRef.current.files[0].name,
				},
			});
		}
	};

	const handleFetch = e => {
		const voiceId = voicesJSON.find(voice => voice.name === selectedVoiceName).id;
		e.preventDefault();
		setLoading({ ...loading, [elementKey]: true });
		closeTTSAlert();

		const options = {
			method: 'POST',
			headers: {
				'xi-api-key': apiKey,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model_id: 'eleven_multilingual_v2',
				text: textToSend,
				voice_settings: {
					similarity_boost: 1,
					stability: 0.9,
				},
				seed: 1,
			}),
		};

		fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, options)
			.then(response => {
				if (!response.ok) {
					if (response.status === 401) {
						toast({
							title: 'Error generando el audio',
							description: `Contactar a un administrador. La cuota mensual pudo haberse agotado`,
							status: 'error',
							duration: 4000,
							isClosable: true,
						  })
					} else if (response.status === 500) {
						console.error('Error interno del servidor');
					} else {
						console.error('Error desconocido');
					}
					throw new Error('Error en la respuesta del servidor');
				}
				return response.blob();
			})
			.then(blob => {
				setAudios({
					...audios,
					[elementKey]: {
						file: blob,
						url: window.URL.createObjectURL(blob),
						name: selectedVoiceName,
					},
				});
				setLoading({ ...loading, [elementKey]: false });
				toast({
					title: 'Audio generado',
					description: `Audio con voz de ${selectedVoiceName} generado`,
					status: 'success',
					duration: 3000,
					isClosable: true,
				  })
			})
			.catch(err => {
				setLoading({ ...loading, [elementKey]: false });
				console.error(err);
			});
	};

	return (
		<>
			<Flex pointerEvents='none' pos='absolute' left={0} top={0} boxSize='full' align='end' justify='end'>
				<Flex
					pointerEvents='auto'
					boxSize='fit-content'
					align='center'
					justify='center'
					overflow='clip'
					bgColor='white'
					rounded='10px'
					boxShadow='0 5px 20px rgba(0,0,0,0.25)'
				>
					<Popover isLazy>
						<PopoverTrigger>
							<IconButton bgColor='transparent' icon={<FaGear />} isLoading={loading[elementKey]}>
								Trigger
							</IconButton>
						</PopoverTrigger>
						<PopoverContent fontFamily='inter' fontSize='sm'>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader fontWeight='bold'>Opciones de texto a voz</PopoverHeader>
							<PopoverBody as={Flex} justifyContent='center' direction='column' gap={3} px={5}>
								<RadioGroup value={selectedVoiceName} onChange={setSelectedVoiceName}>
									{voicesJSON.map((voice, index) => (
										<VoiceRadioItem key={index} name={voice.name} gender={voice.gender} />
									))}
								</RadioGroup>
								<Button onClick={validateText} isLoading={loading[elementKey]} loadingText='Generando' fontSize='sm'>
									Generar con voz de {selectedVoiceName}
								</Button>
							</PopoverBody>
						</PopoverContent>
					</Popover>
					<IconButton bgColor='transparent' icon={<FaUpload />} onClick={() => fileInputRef.current.click()} />
					<Input ref={fileInputRef} type='file' accept='audio/*' display='none' onChange={handleFileUpload} />
					<Flex borderStart='1px solid rgba(0,0,0,0.10)' align='center'>
						{audios[elementKey] && (
							<Text
								mx={2}
								fontSize='sm'
								fontFamily='inter'
								overflow='clip'
								textOverflow='ellipsis'
								whiteSpace='nowrap'
								maxW='20ch'
							>
								{audios[elementKey].name}
							</Text>
						)}
						{audios[elementKey] && <CustomAudioPlayer audioUrl={audios[elementKey].url} />}
					</Flex>
				</Flex>
			</Flex>
			<AlertDialog isCentered isOpen={isTTSAlertOpen} leastDestructiveRef={cancelRef} onClose={closeTTSAlert}>
				<AlertDialogOverlay>
					<AlertDialogContent fontFamily='inter'>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Generar texto a voz
						</AlertDialogHeader>

						<AlertDialogBody as={Flex} direction='column' gap={3}>
							<Text>
 							Generar este texto consumirá <Text as='b' fontSize='1.2em'>{textToSend && textToSend.trim().length}</Text> caracteres de la cuota mensual.
 						</Text>
							<Text>
								¡Hazlo solo si has terminado de escribir todo el cuento y estás totalmente seguro de que es el texto que deseas!
							</Text>
							<Text as ='b' textColor='red'>
								Si recargas la página o cierras el navegador, el audio generado se perderá.
							</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={closeTTSAlert}>
								Cancelar
							</Button>
							<Button colorScheme='green' onClick={handleFetch} ml={3}>
								Entiendo
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default IndividualPanel;
