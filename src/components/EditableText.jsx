import { Flex, IconButton, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import tinycolor from 'tinycolor2';
import IndividualPanel from '../components/IndividualPanel.jsx';
import { currentPageTextAtom } from '../lib/atoms.jsx';

function EditableText({ textProps, elementKey, color }) {
	const [text, setText] = useAtom(currentPageTextAtom);
	const [showPanel, setShowPanel] = useState(true);
	const [showCloseEditMode, setShowCloseEditMode] = useState(false);
	const textContainerRef = useRef(null);
	const buttonRef = useRef(null);

	let dimmedColor = tinycolor(color);
	dimmedColor.setAlpha(0.4);
	dimmedColor = dimmedColor.toRgbString();

	const handleTextChange = e => {
		setShowPanel(true);
		setShowCloseEditMode(false);
		setText({ ...text, [elementKey]: e.target.innerText.trim() });
		e.target.innerText = e.target.innerText.trim();
	};

	const handleBlur = e => {
		if (e.relatedTarget !== buttonRef.current) {
			handleTextChange(e);
		}
	};

	const handleButtonClick = e => {
		e.preventDefault();
		e.stopPropagation();
		textContainerRef.current.blur();
		setShowCloseEditMode(false);
		setShowPanel(true);
	};

	return (
		<Flex pos='relative' rounded='10px' bgColor='transparent' w='100%'>
			<Flex
				ref={textContainerRef}
				display='block'
				transition='all 100ms'
				h='full'
				w='full'
				rounded='10px'
				_hover={{
					outline: `3px dotted ${dimmedColor}`,
				}}
				filter='drop-shadow(0 5px 20px rgba(0,0,0,0.25))'
				flexGrow={1}
				_focus={{ outline: `3px solid ${dimmedColor}` }}
				outline={text[elementKey].trim() === '' ? `3px dotted ${dimmedColor}` : ''}
				onKeyDown={e => {
					if (e.key === 'Escape') e.target.blur();
				}}
				onBlur={handleBlur}
				onFocus={() => {
					setShowPanel(false);
					setShowCloseEditMode(true);
				}}
				{...textProps}
				whiteSpace='pre-line'
				wordBreak='break-word'
			>
				<Text outline='none' p={[2, 3, 4]} contentEditable='true' suppressContentEditableWarning>
					{text[elementKey]}
				</Text>
			</Flex>
			{showPanel && <IndividualPanel textToSend={text[elementKey]} elementKey={elementKey} />}
			{showCloseEditMode && (
				<IconButton
					ref={buttonRef}
					onClick={handleButtonClick}
					pos='absolute'
					colorScheme='green'
					right={0}
					bottom={0}
					icon={<FaCheck />}
					boxShadow='0 5px 20px rgba(0,0,0,0.25)'
				/>
			)}
		</Flex>
	);
}

export default EditableText;
