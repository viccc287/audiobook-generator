import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import PageNavigation from './components/PageNavigation';
import { Flex } from '@chakra-ui/react';

function App() {
	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-gray-900'>
			<div className='flex flex-auto p-8 gap-8'>
				<Flex w='33%'>

				<TemplateSelector />
				</Flex>
				<div className='flex max-h-screen w-2/3 flex-col items-center justify-start gap-5'>
					<Visualizer />
				</div>
			</div>
			<PageNavigation />
		</div>
	);
}

export default App;
