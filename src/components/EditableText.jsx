import IndividualPanel from './IndividualPanel';
import { useGlobalContext } from '../contexts/GlobalContext';

function EditableText({ textStyles, index }) {
	const { state, dispatch } = useGlobalContext();

	const handleTextChange = e => {
		dispatch({
			type: 'SET_TEXT',
			payload: {
				index: index,
				text: e.target.textContent,
			},
		});
	};
	return (
		<div className='relative h-auto w-full max-w-full rounded bg-white/5'>
			<p
				className={`h-full w-full max-w-full p-10 leading-normal  text-white focus:outline-dashed focus:outline-4 ${textStyles}`}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
			>
				{state.text[index]}
			</p>
			<IndividualPanel textToSend={state.text[index]} index={index} />
		</div>
	);
}
export default EditableText;
