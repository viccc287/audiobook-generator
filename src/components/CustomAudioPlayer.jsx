import { Flex, IconButton } from '@chakra-ui/react';

import { useEffect, useRef, useState } from 'react';
import { FaDownload, FaPause, FaPlay } from 'react-icons/fa6';

function CustomAudioPlayer({ audioUrl }) {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

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
		link.href = audioUrl;
		link.download = 'audio.mp3';
		link.click();
	};

	return (
		<Flex align='center' justify='center'>
			<Flex as='audio' ref={audioRef} src={audioUrl} display='none'></Flex>
			{isPlaying ? (
				<IconButton
					bgColor='transparent'
					icon={<FaPause />}
					onClick={togglePlayPause}
					color='red.600'
				/>
			) : (
				<IconButton
					bgColor='transparent'
					icon={<FaPlay />}
					onClick={togglePlayPause}
					color='green.600'
				/>
			)}

			<IconButton bgColor='transparent' icon={<FaDownload />} onClick={handleDownload} />
		</Flex>
	);
}

export default CustomAudioPlayer;
