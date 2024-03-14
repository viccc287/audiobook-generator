import {
	Button,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	RadioGroup,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaGear, FaUpload } from 'react-icons/fa6';
import CustomAudioPlayer from './CustomAudioPlayer';

import { useAtom } from 'jotai';
import { currentPageAudiosAtom, currentPageLoadingAtom } from '../lib/atoms';
import VoiceRadioItem from './VoiceRadioItem';

function IndividualPanel({ textToSend, elementKey }) {
	const [panelStates, setPanelStates] = useState({
		error: false,
		displayText: '',
	});


	const voicesJSON = [
		{ name: 'Bill', id: 'pqHfZKP75CvOlQylNhV4', gender: 'male' },
		{ name: 'Liam', id: 'jsCqWAovK2LkecY7zXl4', gender: 'male' },
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
		const voiceId = voicesJSON.find(voice => voice.name === selectedVoiceName).id
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
				text: textToSend ,
				voice_settings: {
					similarity_boost: 0.5,
					stability: 0.5,
				},
			}),
		};

		fetch(
			`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
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
						<PopoverBody>
							<RadioGroup
								value={selectedVoiceName}
								onChange={setSelectedVoiceName}
							>
								{voicesJSON.map((voice, index) => (
									<VoiceRadioItem key={index} name={voice.name} gender={voice.gender} />
								))}
							</RadioGroup>
							<Button
								onClick={handleFetch}
								isLoading={loading[elementKey]}
								loadingText='Generando'
							>
								Generar con voz de {selectedVoiceName}
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
