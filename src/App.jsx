import React, { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import { GlobalProvider } from './contexts/GlobalContext';
import PageNavigation from './components/PageNavigation';

function App() {
	const [displayedPageIndex, setDisplayedPageIndex] = useState(0);
	const [template, setTemplate] = useState('titleSubtitle');

	return (
		<GlobalProvider>
			<div className='flex min-h-screen bg-violet-950'>
				<div className='flex flex-col items-start space-y-4 bg-black/50 px-5 py-8 text-white'>
					<PageNavigation currentDisplayedPageIndex={displayedPageIndex} changeDisplayedPageFunction={setDisplayedPageIndex} />
				</div>
				<div className='flex flex-auto p-8'>
					<TemplateSelector changeTemplateFunction={setTemplate} />
					<div className='flex w-2/3 flex-col items-center justify-start gap-5 '>
						<Visualizer
							pageIndex={displayedPageIndex}
							withTemplate={template}
						/>
					</div>
				</div>
			</div>
		</GlobalProvider>
	);
}

export default App;
