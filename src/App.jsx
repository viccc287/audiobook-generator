import React, { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import JotaiVisualizer from './components/JotaiVisualizer';
import { GlobalProvider } from './contexts/GlobalContext';
import PageNavigation from './components/PageNavigation';
import { atom } from 'jotai';
import JotaiPageNavigation from './components/JotaiPageNavigation';



function App() {
	const [displayedPageIndex, setDisplayedPageIndex] = useState(0);
	const [template, setTemplate] = useState('titleSubtitle');



	return (
	
			<div className='flex min-h-screen bg-violet-950'>
				<div className='flex flex-col items-start space-y-4 bg-black/50 px-5 py-8 text-white'>
					{/* <PageNavigation currentDisplayedPageIndex={displayedPageIndex} changeDisplayedPageFunction={setDisplayedPageIndex} /> */}
					<JotaiPageNavigation/>
				</div>
				/* <div className='flex flex-auto p-8'>
					<TemplateSelector changeTemplateFunction={setTemplate} />
					<div className='flex w-2/3 flex-col items-center justify-start gap-5 '>
						<JotaiVisualizer
						/>
					</div>
				</div> */
			</div>

	);
}

export default App;
