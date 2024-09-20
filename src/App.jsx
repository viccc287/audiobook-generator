import { Flex} from '@chakra-ui/react';
import ExportButton from './components/ExportButton';
import PageNavigation from './components/PageNavigation';
import ResetButton from './components/ResetButton';
import TemplateSelector from './components/TemplateSelector';
import Visualizer from './components/Visualizer';

function App() {
	return (
		<Flex minH='100svh' direction='column' _mediaDark={{ backgroundColor: '#552F7E' }}>
			<Flex
				flex='auto'
				p={{ base: 4, md: 6, lg: 8 }}
				gap={{ base: 4, md: 6, lg: 8 }}
				direction={{ base: 'column', md: 'row' }}
			>
				<Flex w={{ base: '100%', md: '33.33%' }} direction='column' justify='space-between' gap={5}>
					<TemplateSelector />
					<Flex  justify='center' align='center' gap={[1,2,2,2,10]}  direction={['row', 'row', 'column', 'row']} p={[0,0,0,0,4]}>
						<ResetButton />
						<ExportButton />
					</Flex>
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
