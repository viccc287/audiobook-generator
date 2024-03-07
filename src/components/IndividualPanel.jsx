import {
	SpeakerWaveIcon,
	ArrowPathIcon,
	ExclamationCircleIcon,
	ArrowUpTrayIcon,
} from '@heroicons/react/16/solid';
import CustomAudioPlayer from './CustomAudioPlayer';
import { useState, useRef } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

function IndividualPanel({ textToSend, index }) {
	const [panelStates, setPanelStates] = useState({ error: false, displayText: '' });
	const { state, dispatch } = useGlobalContext();

	const fileInputRef = useRef(null);

	const handleFileUpload = e => {
		e.preventDefault();
		if (fileInputRef.current.files.length > 0) {
			const fileUrl = URL.createObjectURL(fileInputRef.current.files[0]);
			dispatch({
				type: 'SET_AUDIO', // Utilizar el tipo correcto para establecer el audio en el contexto
				payload: {
					index: index,
					audio: <CustomAudioPlayer audioUrl={fileUrl} />,
				}, // Utilizar payload con el formato correcto
			});
			setPanelStates({
				...panelStates,
				displayText: fileInputRef.current.files[0].name,
			});
		}
	};

	const handleFetch = e => {
		e.preventDefault();
		dispatch({
			type: 'SET_LOADING',
			payload: { index: index, isLoading: true },
		});
		const options = {
			method: 'POST',
			headers: {
				'xi-api-key': '3d2b2175bdc519bcd217fd8508ea578b',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model_id: 'eleven_multilingual_v2',
				displayText: textToSend,
				voice_settings: {
					similarity_boost: 1,
					stability: 1,
				},
			}),
		};

		fetch(
			'https://api.elevenlabs.io/v1/displayText-to-speech/21m00Tcm4TlvDq8ikWAM',
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
				dispatch({
					type: 'SET_AUDIO',
					payload: {
						index: index,
						audio: <CustomAudioPlayer audioUrl={url} />,
					},
				});
				dispatch({
					type: 'SET_LOADING',
					payload: { index: index, isLoading: true },
				});
				setPanelStates({
					...panelStates,
					error: true,
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
				dispatch({
					type: 'SET_LOADING',
					payload: { index: index, isLoading: false },
				});
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
			<div className='pointer-events-auto flex size-fit h-10 items-center justify-center gap-1 bg-white p-2'>
				{state.isLoading[index] ? (
					<ArrowPathIcon className='h-full animate-spin text-black' />
				) : panelStates.error ? (
					<ExclamationCircleIcon className='h-full text-red-500 transition duration-200 hover:scale-110' />
				) : (
					<SpeakerWaveIcon
						onClick={handleFetch}
						className='h-full cursor-pointer text-black transition duration-200 hover:scale-110 '
					/>
				)}
				<ArrowUpTrayIcon
					onClick={() => fileInputRef.current.click()}
					className='h-full cursor-pointer text-black transition duration-200 hover:scale-110'
				/>
				<input
					ref={fileInputRef}
					type='file'
					accept='audio/*'
					className='hidden'
					onChange={handleFileUpload}
				/>
				{state.audios[index]}
				<p className='displayText-xs'>{panelStates.displayText}</p>
			</div>
		</div>
	);
}

export default IndividualPanel;
