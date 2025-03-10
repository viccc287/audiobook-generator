import { Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { currentPageColorAtom } from '../lib/atoms';
import { useRef } from 'react';
import { FaPaintRoller } from 'react-icons/fa6';

export default function CustomColorSelector() {
	const [color, setColor] = useAtom(currentPageColorAtom);
	const colorInputRef = useRef(null);

	function debounce(func, delay) {
		let timeoutId;
		return function (...args) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
			}, delay);
		};
	}

	const handleColorChange = e => {
		handleColorChangeDebounced(e.target.value);
	};

	const handleColorChangeDebounced = debounce(value => {
		setColor(value);
	}, 300);

	return (
		<Flex pointerEvents='none' pos='absolute' left={0} top={0} boxSize='full' align='end' justify='end' zIndex={1}>
			<Flex
				as='input'
				type='color'
				value={color}
				ref={colorInputRef}
				onChange={e => handleColorChange(e)}
				visibility='hidden'
				pointerEvents='auto'
			></Flex>
			<Tooltip label='Cambiar color de página' hasArrow openDelay={400}>
			<IconButton
				pointerEvents='auto'
				icon={<FaPaintRoller />}
				onClick={() => colorInputRef.current.click()}
				bgColor='white'
				_dark={{ bgColor: 'gray.800' }}
				boxShadow='0 5px 20px rgba(0,0,0,0.25)'
				/>
			</Tooltip>
			
		</Flex>
	);
}
