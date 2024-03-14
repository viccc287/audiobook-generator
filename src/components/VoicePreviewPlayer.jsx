import { Flex, IconButton, Icon, Spacer, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa6';
import { FaMale, FaFemale } from 'react-icons/fa';

export default function VoicePreviewPlayer({ audioSrc, gender }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef(null);

	const voiceName = audioSrc.replace('.mp3','').charAt(0).toUpperCase()

	const togglePlayPause = () => {
		const audio = audioRef.current;
		if (audio.paused) {
			audio.play();
		} else {
			audio.currentTime = 0;
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

	return (
		<>
			<Flex alignItems='center' gap={2}>
				<audio ref={audioRef} src={audioSrc} className='hidden'></audio>
                {gender === 'female' ?
                    <Icon as={FaFemale} color='pink.500' boxSize={4}/>
                : <Icon as={FaMale} color='blue.500' boxSize={4}/> }
				<Text>{voiceName}</Text>
				<Spacer />
				{!isPlaying ? (
					<IconButton
						color='green.600'
						icon={<FaPlay />}
						onClick={togglePlayPause}
					/>
				) : (
					<IconButton
						color='red.600'
						icon={<FaStop />}
						onClick={togglePlayPause}
					/>
				)}
			</Flex>
		</>
	);
}
