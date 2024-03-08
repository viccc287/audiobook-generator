import IndividualPanel from './IndividualPanel';
import { useGlobalContext } from '../contexts/GlobalContext';

function EditableText({ textStyles, elementIndex, pageIndex }) {
	const { state, dispatch } = useGlobalContext();
	
	const currentPage = state.pages[pageIndex]

	const handleTextChange = e => {
		dispatch({
			type: 'SET_TEXT',
			payload: {
				pageIndex: pageIndex,
				elementIndex: elementIndex,
				text: e.target.textContent,
			},
		});
	};
	return (
		<div className='relative w-full max-w-full rounded bg-white/5'>
			<p
				className={`w-full p-10 leading-normal  text-white focus:outline-dashed focus:outline-4 ${textStyles}`}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
			>
				{currentPage.text[elementIndex]}
			</p>
			<IndividualPanel textToSend={currentPage.text[elementIndex]}pageIndex={pageIndex} elementIndex={elementIndex} />
		</div>
	);
}
export default EditableText;
