import { Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import { FaDownload, FaPause, FaPlay, FaXmark } from 'react-icons/fa6';
import { currentPageAudiosAtom } from '../lib/atoms';
import { useAtom } from 'jotai';

function CustomAudioPlayer({ audio, elementKey }) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [audios, setAudios] = useAtom(currentPageAudiosAtom);


	const togglePlayPause = () => {
		const audio = audioRef.current;
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		const audio = audioRef.current;
		const endedHandler = () => {
			setIsPlaying(false);
		};

		audio.addEventListener('ended', endedHandler);

		return () => {
			audio.removeEventListener('ended', endedHandler);
		};
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		const endedHandler = () => {
			setIsPlaying(false);
		};
		audio.addEventListener('ended', endedHandler);
		return () => {
			audio.removeEventListener('ended', endedHandler);
		};
	}, []);

	useEffect(() => {
		return () => {
			const audio = audioRef.current;
			if (audio) {
				audio.pause();
				setIsPlaying(false);
			}
		};
	}, []);

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = audio.url;
		link.download = 'audio.mp3';
		link.click();
	};

	const handleDelete = () => {
		const audio = audioRef.current;

		if (audio) {
			audio.pause();
			audio.src = '';
		}

		const updatedAudios = { ...audios };
		delete updatedAudios[elementKey];
		setAudios(updatedAudios);
		

	}

	return (
		<Flex align='center' justify='center'>
			<Flex as='audio' ref={audioRef} src={audio.url} display='none'></Flex>
			<Tooltip label='Descargar audio' hasArrow openDelay={400}>
				<IconButton
					bgColor='transparent'
					icon={<FaDownload />}
					onClick={handleDownload}
					borderEnd='1px solid rgba(0,0,0,0.10)'
				/>
			</Tooltip>
			<Text
				mx={2}
				fontSize='sm'
				fontFamily='inter'
				overflow='clip'
				textOverflow='ellipsis'
				whiteSpace='nowrap'
				maxW='20ch'
			>
				{audio.name}
			</Text>
			{isPlaying ? (
				<Tooltip label='Pausar' hasArrow openDelay={400}>
					<IconButton bgColor='transparent' icon={<FaPause />} onClick={togglePlayPause} color='red.600' />
				</Tooltip>
			) : (
				<Tooltip label='Reproducir' hasArrow openDelay={400}>
					<IconButton bgColor='transparent' icon={<FaPlay />} onClick={togglePlayPause} color='green.600' />
				</Tooltip>
			)}
			<Tooltip label='Eliminar audio' hasArrow openDelay={400}>
				<IconButton
					pointerEvents='auto'
					icon={<FaXmark color='red' />}
					onClick={handleDelete}
					bg='transparent'
				/>
			</Tooltip>
		</Flex>
	);
}

export default CustomAudioPlayer;
