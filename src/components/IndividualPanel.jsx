import {
	SpeakerWaveIcon,
	ArrowPathIcon,
	ExclamationCircleIcon,
	ArrowUpTrayIcon,
} from '@heroicons/react/16/solid';
import CustomAudioPlayer from './CustomAudioPlayer';
import { useState, useRef } from 'react';
import {
	FaGear,
	FaUpload,
	FaChevronDown,
	FaPlus,
	FaMinus,
} from 'react-icons/fa6';
import {
	Icon,
	IconButton,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverFooter,
	PopoverArrow,
	PopoverCloseButton,
	PopoverAnchor,
	Flex,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
	Text,
	VStack,
	Select,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
} from '@chakra-ui/react';

import { currentPageAudiosAtom, currentPageLoadingAtom } from '../lib/atoms';
import { useAtom } from 'jotai';
import VoicePreviewPlayer from './VoicePreviewPlayer';

function IndividualPanel({ textToSend, elementKey }) {
	const [panelStates, setPanelStates] = useState({
		error: false,
		displayText: '',
	});

	const [selectedVoiceName, setSelectedVoiceName] = useState('Seleccionar voz a generar');

	const [audios, setAudios] = useAtom(currentPageAudiosAtom);
	const [loading, setLoading] = useAtom(currentPageLoadingAtom);

	const fileInputRef = useRef(null);

	const handleFileUpload = e => {
		e.preventDefault();
		if (fileInputRef.current.files.length > 0) {
			const url = URL.createObjectURL(fileInputRef.current.files[0]);
			setAudios({
				...audios,
				[elementKey]: <CustomAudioPlayer audioUrl={url} />,
			});
			setPanelStates({
				...panelStates,
				displayText: fileInputRef.current.files[0].name,
			});
		}
	};

	const handleFetch = e => {
		e.preventDefault();
		setLoading({ ...loading, [elementKey]: true });

		const options = {
			method: 'POST',
			headers: {
				'xi-api-key': 'a9b66f7a96e4a716848db53e77ac3b9f',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model_id: 'eleven_multilingual_v2',
				text: textToSend,
				voice_settings: {
					similarity_boost: 1,
					stability: 1,
				},
			}),
		};

		fetch(
			'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM',
			options,
		)
			.then(response => {
				if (!response.ok) {
					if (response.status === 401) {
						console.error(
							'No autorizado, verificar API KEY o caracteres usados',
						);
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
				const url = window.URL.createObjectURL(blob);

				setAudios({
					...audios,
					[elementKey]: <CustomAudioPlayer audioUrl={url} />,
				});
				setLoading({ ...loading, [elementKey]: false });
				setPanelStates({
					...panelStates,
					error: false,
					displayText: 'Generado',
				});
			})
			.catch(err => {
				setPanelStates({
					...panelStates,
					error: true,
					displayText: 'Error con la API',
				});
				const oldDisplayText = panelStates.displayText;
				setLoading({ ...loading, [elementKey]: false });
				console.error(err);

				setTimeout(() => {
					setPanelStates({
						...panelStates,
						error: true,
						displayText: oldDisplayText,
					});
				}, 4000);
			});
	};

	return (
		<div className='pointer-events-none absolute left-0 top-0 flex size-full items-end justify-end'>
			<div className='pointer-events-auto flex size-fit h-10 items-center justify-center gap-1 overflow-clip bg-white'>
				<Popover isLazy>
					<PopoverTrigger>
						<IconButton bgColor='transparent' icon={<FaGear />}>
							Trigger
						</IconButton>
					</PopoverTrigger>
					<PopoverContent fontFamily='inter' fontSize='sm'>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader fontWeight='bold'>
							Opciones de texto a voz
						</PopoverHeader>
						<PopoverBody as={Flex} direction='column' alignItems='stretch'>
							<Accordion allowToggle>
								<AccordionItem border='0px'>
									{({ isExpanded }) => (
										<>
											<AccordionButton fontSize='sm'>
												<Flex as='span' flex='1' textAlign='left'>
													{selectedVoiceName}
												</Flex>
												{isExpanded ? <FaMinus /> : <FaPlus />}
											</AccordionButton>
											<AccordionPanel>
												<Flex direction='column'>
													<VoicePreviewPlayer
														audioSrc='freya.mp3'
														voiceName='Freya'
														gender='female'
														onMouseEnter={() => setSelectedVoiceName('Freya')}
													/>
													<VoicePreviewPlayer
														audioSrc='sarah.mp3'
														voiceName='Sarah'
														gender='female'
													/>
													<VoicePreviewPlayer
														audioSrc='alice.mp3'
														voiceName='Alice'
														gender='female'
													/>
													<VoicePreviewPlayer
														audioSrc='grace.mp3'
														voiceName='Grace'
														gender='female'
													/>
													<VoicePreviewPlayer
														audioSrc='bill.mp3'
														voiceName='Bill'
													/>
													<VoicePreviewPlayer
														audioSrc='liam.mp3'
														voiceName='Liam'
													/>
													<VoicePreviewPlayer
														audioSrc='patrick.mp3'
														voiceName='Patrick'
													/>
												</Flex>
											</AccordionPanel>
										</>
									)}
								</AccordionItem>
							</Accordion>
							<Button
								onClick={handleFetch}
								isLoading={loading[elementKey]}
								loadingText='Generando'
							>
								Generar
							</Button>
						</PopoverBody>
					</PopoverContent>
				</Popover>
				<IconButton
					bgColor='transparent'
					icon={<FaUpload />}
					onClick={() => fileInputRef.current.click()}
				/>
				<input
					ref={fileInputRef}
					type='file'
					accept='audio/*'
					className='hidden'
					onChange={handleFileUpload}
				/>
				{audios[elementKey]}
				<p className='text-xs'>{panelStates.displayText}</p>
			</div>
		</div>
	);
}

export default IndividualPanel;
