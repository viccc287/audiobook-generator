import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import PageNavigation from './components/PageNavigation';

function App() {
	return (
	
			<div className='flex min-h-screen bg-violet-950'>
				<div className='flex flex-col items-start space-y-4 bg-black/50 px-5 py-8 text-white'>
					<PageNavigation />
				</div>
				<div className='flex flex-auto p-8'>
					<TemplateSelector />
					<div className='flex max-h-screen w-2/3 flex-col items-center justify-start gap-5'>
						<Visualizer />
					</div>
				</div>
			</div>
	);
}

export default App;
