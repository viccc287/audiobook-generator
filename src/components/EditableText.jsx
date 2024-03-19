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
		<Flex pos='relative' rounded='10px' bgColor='blackAlpha.300' w='100%'>
			<Text
				fontFamily='inter'
				flexGrow={1}
				p={10}
				color='black'
				_mediaDark={{ color: 'white' }}
				_focus={{ outline: '5px solid rgba(0,0,0,0.25)', borderRadius: '10px' }}
				{...textProps}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
			>
				{text[elementKey]}
			</Text>
			{<IndividualPanel textToSend={text[elementKey]} elementKey={elementKey} />}
		</Flex>
	);
}
export default EditableText;
