import { currentPageTextAtom } from '../lib/atoms.jsx';
import { useAtom } from 'jotai';
import IndividualPanel from '../components/IndividualPanel.jsx';
import { Flex, Text } from '@chakra-ui/react';

function EditableText({ textProps, elementKey }) {
	const [text, setText] = useAtom(currentPageTextAtom);

	const handleTextChange = e => {
		setText({ ...text, [elementKey]: e.target.innerText });
	};


	return (
		<Flex pos='relative' rounded='10px' bgColor='transparent' w='100%'>
			<Text
				transition='all 100ms'
				rounded='10px'
				outline='none'
				_hover={{
					outline: '3px solid rgba(0,0,0,0.25)',
				}}
				filter='drop-shadow(0 5px 20px rgba(0,0,0,0.25))'
				p={5}
				flexGrow={1}
				_focus={{ outline: '3px solid rgba(0,0,0,0.25)' }}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
				{...textProps}
				whiteSpace='pre-line'
			>
				{text[elementKey]}
			</Text>
			<IndividualPanel textToSend={text[elementKey]} elementKey={elementKey} />
		</Flex>
	);
}
export default EditableText;
