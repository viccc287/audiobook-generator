
import {
	currentPageTextAtom,
} from '../lib/atoms.jsx';
import { useAtom } from 'jotai';
import IndividualPanel from '../components/IndividualPanel.jsx'


function EditableText({ textStyles, elementKey }) {

	const [text, setText] = useAtom(currentPageTextAtom);

	const handleTextChange = e => {
		setText({...text, [elementKey]:e.target.textContent})
	};
	return (
		<div className='relative w-full max-w-full rounded bg-white/5'>
			<p
				className={`w-full p-10 leading-normal  text-white focus:outline-dashed focus:outline-4 ${textStyles}`}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
			>
				{text[elementKey]}
			</p>
		{<IndividualPanel
				textToSend={text[elementKey]}
				elementKey={elementKey}
			/> }
		</div>
	);
}
export default EditableText;
