import { Flex, Radio, IconButton, Icon, Spacer, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa6';
import { FaMale, FaFemale } from 'react-icons/fa';

export default function VoiceRadioItem({ name, gender }) {
	return (
		<Flex gap={4}>
			<Radio value={name} _checked={{ bgColor: 'blue.400' }} />
			<VoicePreviewPlayer audioSrc={name + '.mp3'} gender={gender} />
		</Flex>
	);

	function VoicePreviewPlayer({ audioSrc, gender }) {
		const [isPlaying, setIsPlaying] = useState(false);
		const audioRef = useRef(null);

		const voiceName = audioSrc.replace('.mp3', '');

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
				<Flex alignItems='center' gap={2} flex='1'>
					<audio ref={audioRef} src={audioSrc} className='hidden'></audio>
					{gender === 'female' ? (
						<Icon as={FaFemale} color='pink.500' boxSize={4} />
					) : (
						<Icon as={FaMale} color='blue.500' boxSize={4} />
					)}
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
}
