import { useRef, useState, useEffect } from 'react';
import {
	PlayIcon,
	PauseIcon,
	ArrowDownTrayIcon,
	XCircleIcon,
} from '@heroicons/react/16/solid';

function CustomAudioPlayer({ audioUrl}) {
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

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = audioUrl;
		link.download = 'audio.mp3';
		link.click();
	};

	return (
			<div className='flex items-center justify-center gap-1 h-full'>
			<audio ref={audioRef} src={audioUrl} className='hidden'></audio>
				{isPlaying ? (
					<PauseIcon
						className={`h-full cursor-pointer text-red-600 transition duration-200 hover:scale-110`}
						onClick={togglePlayPause}
					/>
				) : (
					<PlayIcon
						className={`h-full cursor-pointer text-lime-700 transition duration-200 hover:scale-110`}
						onClick={togglePlayPause}
					/>
				)}

				<ArrowDownTrayIcon
					className={`h-full cursor-pointer text-blue-800 transition duration-200 hover:scale-110`}
					onClick={handleDownload}
			/>
			</div>
	);
}

export default CustomAudioPlayer;
