import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import PageNavigation from './components/PageNavigation';

function App() {
	return (
		<div className='flex min-h-screen flex-col bg-violet-950'>
			<div className='flex flex-auto p-8'>
				<TemplateSelector />
				<div className='flex max-h-screen w-2/3 flex-col items-center justify-start gap-5'>
					<Visualizer />
				</div>
			</div>
				<PageNavigation />
		</div>
	);
}

export default App;
