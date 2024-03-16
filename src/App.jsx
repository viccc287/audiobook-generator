import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import PageNavigation from './components/PageNavigation';
import { Flex } from '@chakra-ui/react';

function App() {
	return (
		<div className='flex min-h-dvh  flex-col bg-white dark:bg-gray-800'>
			<Flex
				flex='auto'
				p={{ base: 4, md: 6, lg: 8 }}
				gap={{ base: 4, md: 6, lg: 8 }}
				direction={{ base: 'column', md: 'row' }}
			>
				<Flex w={{ base: '100%', md: '33.33%' }}>
					<TemplateSelector />
				</Flex>
				<Flex w={{ base: '100%', md: '66.66%' }} >
					<Visualizer />
				</Flex>
			</Flex>
			<PageNavigation />
		</div>
	);
}

export default App;
