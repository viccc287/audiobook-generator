import { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import { GlobalProvider } from './contexts/GlobalContext';
function App() {
	const [template, setTemplate] = useState('titleSubtitle');

	const handleTemplateSelect = selectedTemplate => {
		setTemplate(selectedTemplate);
	};

	return (
		<div className='flex h-fit min-h-screen w-screen flex-col bg-violet-950'>
			<div className='flex h-20 w-screen items-center gap-5 bg-black/50 px-10 font-jakarta font-bold text-white'>
				{/* <img src='/logo.jpg' className='h-full' /> */}
				<p className='bg-black/50 p-3 text-sm'>AUDIOCUENTOS</p>
			</div>
			<div className='flex size-full p-8'>
				<TemplateSelector
					className='flex size-fit h-full w-1/3 flex-wrap items-start gap-5 '
					changeTemplateFunction={handleTemplateSelect}
				/>
				<div className='align-center flex w-2/3 justify-center'>
					<GlobalProvider>
						<Visualizer withTemplate={template} />
					</GlobalProvider>
				</div>
			</div>
		</div>
	);
}

export default App;
