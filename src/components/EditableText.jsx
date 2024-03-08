import IndividualPanel from './IndividualPanel';
import { displayedPageIndexAtom, pagesAtom } from '../lib/atoms.jsx';
import { useAtom, useAtomValue } from 'jotai';
import { pageReducer } from '../lib/pageReducer.jsx';

function EditableText({ textStyles, elementKey }) {
	const displayedPageIndex = useAtomValue(displayedPageIndexAtom);
	const [pages, setPages] = useAtom(pagesAtom);

	const currentPage = pages[displayedPageIndex];

	const handleTextChange = e => {
		pageReducer(pages, setPages, 'SET_TEXT', {
			pageIndex: displayedPageIndex,
			elementKey: elementKey,
			text: e.target.textContent
		} )
	};
	return (
		<div className='relative w-full max-w-full rounded bg-white/5'>
			<p
				className={`w-full p-10 leading-normal  text-white focus:outline-dashed focus:outline-4 ${textStyles}`}
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={handleTextChange}
			>
				{currentPage.text[elementKey]}
			</p>
			 <IndividualPanel
				textToSend={currentPage.text[elementKey]}
				pages={pages}
				setPageContent={setPages}
				displayedPageIndex={displayedPageIndex}
				elementKey={elementKey}
			/> 
		</div>
	);
}
export default EditableText;
