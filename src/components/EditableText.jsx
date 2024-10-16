import { currentPageTextAtom } from '../lib/atoms.jsx';
import { useAtom } from 'jotai';
import IndividualPanel from '../components/IndividualPanel.jsx';
import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

function EditableText({ textProps, elementKey }) {
	const [text, setText] = useAtom(currentPageTextAtom);

	const [showPanel, setShowPanel] = useState(true);

	const handleTextChange = e => {
		setShowPanel(true);

		setText({ ...text, [elementKey]: e.target.innerText.trim() });

		e.target.innerText = e.target.innerText.trim();
	};

	return (
		<Flex pos='relative' rounded='10px' bgColor='transparent' w='100%'>
			<Text
				transition='all 100ms'
				rounded='10px'
				outline={text[elementKey].trim() === '' ? '3px solid rgba(0,0,0,0.25)' : 'none'}
				_hover={{
					outline: '3px dotted rgba(0,0,0,0.25)',
				}}
				filter='drop-shadow(0 5px 20px rgba(0,0,0,0.25))'
				p={5}
				flexGrow={1}
				_focus={{ outline: '3px solid rgba(0,0,0,0.15)' }}
				contentEditable
				onKeyDown={e => {
					if (e.key === 'Escape') e.target.blur();
				}}
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
				onFocus={() => setShowPanel(false)}
				{...textProps}
				whiteSpace='pre-line'
				wordBreak='break-word'
			>
				{text[elementKey]}
			</Text>
			{showPanel && <IndividualPanel textToSend={text[elementKey]} elementKey={elementKey} />}
		</Flex>
	);
}
export default EditableText;
