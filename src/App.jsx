import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';
import PageNavigation from './components/PageNavigation';
import { Flex } from '@chakra-ui/react';

function App() {
	return (
		<Flex minH='100svh' direction='column' _mediaDark={{ backgroundColor: 'purple.900' }}>
			<Flex
				flex='auto'
				p={{ base: 4, md: 6, lg: 8 }}
				gap={{ base: 4, md: 6, lg: 8 }}
				direction={{ base: 'column', md: 'row' }}
			>
				<Flex w={{ base: '100%', md: '33.33%' }}>
					<TemplateSelector />
				</Flex>
				<Flex w={{ base: '100%', md: '66.66%' }} flex='auto'>
					<Visualizer />
				</Flex>
			</Flex>
			<PageNavigation />
		</Flex>
	);
}

export default App;
