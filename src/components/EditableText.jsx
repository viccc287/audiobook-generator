import { currentPageTextAtom } from '../lib/atoms.jsx';
import { useAtom } from 'jotai';
import IndividualPanel from '../components/IndividualPanel.jsx';
import { Flex, Text } from '@chakra-ui/react';

function EditableText({ textProps, elementKey }) {
	const [text, setText] = useAtom(currentPageTextAtom);

	const handleTextChange = e => {
		setText({ ...text, [elementKey]: e.target.textContent });
	};
	return (
		<Flex pos='relative' rounded='10px' bgColor='transparent' w='100%'>
			<Text
				p={5}
				flexGrow={1}
				_focus={{ outline: '5px solid rgba(0,0,0,0.25)', borderRadius: '10px' }}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
				{...textProps}
			>
				{text[elementKey]}
			</Text>
			{<IndividualPanel textToSend={text[elementKey]} elementKey={elementKey} />}
		</Flex>
	);
}
export default EditableText;
